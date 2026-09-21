from sqlalchemy.orm import Session
from app.models.usuario import Usuario
from app.models.aluno import Aluno
from app.models.professor import Professor
from app.schemas.schemas import (UsuarioCreate, AtividadeCreate)
from app.models.video import Video

from app.models.atividade import Atividade
from app.models.questao import Question
from app.models.answer import Answer


def criar_usuario_db(db: Session, usuario_in: UsuarioCreate):
    foto_final = usuario_in.foto_perfil

    if (
            not foto_final
            or foto_final.strip() == ""
            or foto_final.lower() == "string"
    ):
        foto_final = (
            "https://pixabay.com/pt/images/download/"
            "whitesession-woman-2112292_1920.jpg"
        )

    tipo = usuario_in.tipo_usuario.upper()

    novo_usuario = Usuario(
        nome=usuario_in.nome,
        email=usuario_in.email,
        senha=usuario_in.senha,
        foto_perfil=foto_final,
        tipo_usuario=tipo,
    )

    db.add(novo_usuario)
    db.flush()

    if tipo == "ALUNO":
        db.add(
            Aluno(
                id_usuario=novo_usuario.id_usuario,
                nivel_ingles=usuario_in.nivel_ingles,
            )
        )

    elif tipo == "PROFESSOR":
        db.add(
            Professor(
                id_usuario=novo_usuario.id_usuario,
                escola=usuario_in.escola,
            )
        )

    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario


def get_usuario_por_email(db: Session, email: str):
    return db.query(Usuario).filter(Usuario.email == email).first()


def get_login(db: Session, email: str, senha: str):
    return (
        db.query(Usuario)
        .filter(
            Usuario.email == email,
            Usuario.senha == senha,
        )
        .first()
    )


# Cria atividade
def cria_atividade(db: Session, atividade_in: AtividadeCreate):
    professor = (
        db.query(Professor)
        .filter(Professor.id_professor == atividade_in.professor_id)
        .first()
    )

    if not professor:
        raise ValueError("Professor não encontrado.")

    nova_atividade = Atividade(
        professor_id=atividade_in.professor_id,
        title=atividade_in.title,
        description=atividade_in.description,
        type=atividade_in.type,
        level=atividade_in.level,
    )

    for question_in in atividade_in.questions:
        nova_questao = Question(
            text=question_in.text,
        )

        for answer_in in question_in.answers:
            nova_questao.answers.append(
                Answer(
                    text=answer_in.text,
                    correct=answer_in.correct,
                )
            )

        nova_atividade.questions.append(nova_questao)

    db.add(nova_atividade)
    db.commit()
    db.refresh(nova_atividade)

    return nova_atividade


def get_atividades(db: Session):
    return db.query(Atividade).order_by(Atividade.id.desc()).all()


def get_atividades_por_professor(
        db: Session,
        professor_id: int,
):
    return (
        db.query(Atividade)
        .filter(Atividade.professor_id == professor_id)
        .order_by(Atividade.id.desc())
        .all()
    )


# coloca video no banco de dados
def cria_video(video_in: VideoCreate, db: Session):
    novo_video = Video(
        title=video_in.title,
        description=video_in.description,
        type=video_in.type,
        nivel=video_in.nivel,
        url=str(video_in.url),
    )

    db.add(novo_video)
    db.commit()
    db.refresh(novo_video)

    return novo_video


def get_videos(db: Session):
    return db.query(Video).all()
