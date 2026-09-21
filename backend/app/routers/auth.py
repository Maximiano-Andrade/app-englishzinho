from app.crud import usuarioCrud
from app.database.database import get_db
from fastapi import Depends, HTTPException, status, APIRouter
from app.schemas.schemas import LoginResponse, Login
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=LoginResponse)
def login(login_in: Login, db: Session = Depends(get_db)):
    usuario = usuarioCrud.get_login(db, login_in.email, login_in.senha)
    if not usuario or usuario.senha != login_in.senha:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha inválidos",
        )

    return {
        "id_usuario": usuario.id_usuario,
        "nome": usuario.nome,
        "email": usuario.email,
        "tipo_usuario": usuario.tipo_usuario,
        "foto_perfil": usuario.foto_perfil,
    }