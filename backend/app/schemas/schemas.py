from datetime import datetime
from typing import Literal
from pydantic import BaseModel, ConfigDict, EmailStr
from app.models.atividade import ActivityLevel, ActivityType
from app.models.progressoAtividade import StatusAtividade

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
    id_aluno: int | None = None
    id_professor: int | None = None
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

# BUSCA ATIVIDADE PARA ALUNO
class AnswerResponse(BaseModel):
    id: int
    text: str
    correct: bool

    model_config = ConfigDict(from_attributes=True)
class QuestionResponse(BaseModel):
    id: int
    text: str
    answers: list[AnswerResponse]

    model_config = ConfigDict(from_attributes=True)
class AtividadeDetalheResponse(AtividadeResponse):
    questions: list[QuestionResponse]

# STATUS DA ATIVIDADE
class ProgressoAtividadeCreate(BaseModel):
    aluno_id: int
    atividade_id: int
class ProgressoAtividadeUpdate(BaseModel):
    status: StatusAtividade
class ProgressoAtividadeResponse(BaseModel):
    id: int
    aluno_id: int
    atividade_id: int
    status: StatusAtividade
    completed_at: datetime | None = None
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
ProgressoAtividadeCreate.model_rebuild()
ProgressoAtividadeResponse.model_rebuild()