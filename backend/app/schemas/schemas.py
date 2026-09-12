from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr

class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    foto_perfil: Optional[str] = None
    tipo_usuario: str = "ALUNO"  # "ALUNO", "PROFESSOR" ou "ADMIN"

    # Campos específicos
    nivel_ingles: Optional[str] = None  # Para Aluno
    escola: Optional[str] = None  # Para Professor

class UsuarioResponse(BaseModel):
    id_usuario: int
    nome: str
    email: EmailStr
    tipo_usuario: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# lOGIN DE USUARIO
class Login(BaseModel):
    email: EmailStr
    senha: str

class LoginResponse(BaseModel):
    id_usuario: int
    tipo_usuario: str