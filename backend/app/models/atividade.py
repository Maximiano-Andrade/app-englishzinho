from enum import Enum

from sqlalchemy import (
    Column,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    String,
    TIMESTAMP,
    Text,
    func,
)
from sqlalchemy.orm import relationship

from app.database.database import Base


class ActivityLevel(str, Enum):
    INICIANTE = "Iniciante"
    INTERMEDIARIO = "Intermediário"
    AVANCADO = "Avançado"

class ActivityType(str, Enum):
    QUIZ = "Quiz"
    ESCUTA = "Escuta"
    FALA = "Fala"

class Atividade(Base):
    __tablename__ = "atividades"

    id = Column(Integer, primary_key=True, autoincrement=True)

    professor_id = Column(
        Integer,
        ForeignKey("professores.id_usuario"),
        nullable=False,
    )

    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    type = Column(SqlEnum(ActivityType), nullable=False)
    level = Column(SqlEnum(ActivityLevel), nullable=False)

    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    professor = relationship(
        "Professor",
        back_populates="atividades",
    )

    questions = relationship(
        "Question",
        back_populates="activity",
        cascade="all, delete-orphan",
    )