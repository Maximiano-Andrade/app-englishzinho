from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud import usuarioCrud
from app.database.database import get_db
from app.models.aluno import Aluno
from app.models.professor import Professor
from app.schemas.schemas import Login, LoginResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=LoginResponse)
def login(login_in: Login, db: Session = Depends(get_db)):
    usuario = usuarioCrud.get_login(
        db,
        login_in.email,
        login_in.senha,
    )

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha inválidos",
        )

    id_aluno = None
    id_professor = None

    if usuario.tipo_usuario == "ALUNO":
        aluno = (
            db.query(Aluno)
            .filter(Aluno.id_usuario == usuario.id_usuario)
            .first()
        )

        if aluno:
            id_aluno = aluno.id_aluno

    elif usuario.tipo_usuario == "PROFESSOR":
        professor = (
            db.query(Professor)
            .filter(Professor.id_usuario == usuario.id_usuario)
            .first()
        )

        if professor:
            id_professor = professor.id_professor

    return {
        "id_usuario": usuario.id_usuario,
        "id_aluno": id_aluno,
        "id_professor": id_professor,
        "nome": usuario.nome,
        "email": usuario.email,
        "tipo_usuario": usuario.tipo_usuario,
        "foto_perfil": usuario.foto_perfil,
    }