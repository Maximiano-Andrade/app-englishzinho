from sqlalchemy.orm import Session
from app.models.usuario import Usuario
from app.models.aluno import Aluno
from app.models.professor import Professor
from app.schemas.schemas import UsuarioCreate

def criar_usuario_db(db: Session, usuario_in: UsuarioCreate):
    # 1. Instancia e adiciona o Usuário
    foto_final = usuario_in.foto_perfil
    if not foto_final or foto_final.strip() == "" or foto_final.lower() == "string":
        usuario_in.foto_perfil = "https://pixabay.com/pt/images/download/whitesession-woman-2112292_1920.jpg"


    novo_usuario = Usuario(
        nome=usuario_in.nome,
        email=usuario_in.email,
        senha=usuario_in.senha,  # Sem hash
        foto_perfil=usuario_in.foto_perfil,
        tipo_usuario=usuario_in.tipo_usuario.upper()
    )
    db.add(novo_usuario)
    db.flush()  # Obtém o id_usuario gerado

    tipo = usuario_in.tipo_usuario.upper()

    # 2. Insere na tabela correspondente
    if tipo == "ALUNO":
        novo_aluno = Aluno(
            id_usuario=novo_usuario.id_usuario,
            nivel_ingles=usuario_in.nivel_ingles
        )
        db.add(novo_aluno)

    elif tipo == "PROFESSOR":
        novo_professor = Professor(
            id_usuario=novo_usuario.id_usuario,
            escola=usuario_in.escola
        )
        db.add(novo_professor)

    # 3. Salva no banco de dados
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

def get_usuario_por_email(db: Session, email: str):
    return db.query(Usuario).filter(Usuario.email == email).first()

def get_login(db: Session, email: str):
    return db.query(Usuario).filter(Usuario.email == email).first()