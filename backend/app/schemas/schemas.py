from datetime import datetime
from typing import Literal
from pydantic import BaseModel, ConfigDict, EmailStr
from app.models.atividade import ActivityLevel, ActivityType


class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    foto_perfil: str | None = None
    tipo_usuario: Literal["ALUNO", "PROFESSOR", "ADMIN"] = "ALUNO"
    nivel_ingles: str | None = None
    escola: str | None = None

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
    nome: str
    email: str
    tipo_usuario: str
    foto_perfil: str | None = None

# Cria atividade
class AnswerCreate(BaseModel):
    text: str
    correct: bool = False

class QuestionCreate(BaseModel):
    text: str
    answers: list[AnswerCreate]

class AtividadeCreate(BaseModel):
    professor_id: int

    title: str
    description: str
    type: ActivityType
    level: ActivityLevel
    questions: list[QuestionCreate]

class AtividadeResponse(BaseModel):
    id: int
    professor_id: int
    title: str
    description: str
    type: str
    level: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Video para assistir
class VideoCreate(BaseModel):
    title: str
    description: str
    type: str
    nivel: str
    url: str

class VideoResponse(BaseModel):
    id: int
    title: str
    description: str
    type: str
    nivel: str
    url: str

    model_config = ConfigDict(from_attributes=True)

UsuarioCreate.model_rebuild()
UsuarioResponse.model_rebuild()