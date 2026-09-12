from app.crud import usuarioCrud
from app.database.database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.schemas import UsuarioCreate, UsuarioResponse
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

@router.post("/", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def criar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    user = usuarioCrud.criar_usuario_db(db, usuario)
    return user

# Ajustado para buscar por e-mail via rota /usuarios/email/{email}
@router.get("/email/{email}", response_model=UsuarioResponse, status_code=status.HTTP_200_OK)
def buscar_usuario_por_email(email: str, db: Session = Depends(get_db)):
    user = usuarioCrud.get_usuario_por_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado."
        )
    return user