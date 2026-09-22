from datetime import datetime
from enum import Enum

from sqlalchemy import (
    Column,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    UniqueConstraint,
)

from app.database.database import Base
from sqlalchemy.orm import relationship


class StatusAtividade(str, Enum):
    PENDENTE = "Pendente"
    CONCLUIDA = "Concluída"


class ProgressoAtividade(Base):
    __tablename__ = "progresso_atividades"

    id = Column(Integer, primary_key=True, autoincrement=True)

    aluno_id = Column(
        Integer,
        ForeignKey("aluno.id_aluno"),
        nullable=False,
    )

    atividade_id = Column(
        Integer,
        ForeignKey("atividades.id"),
        nullable=False,
    )

    status = Column(
        SqlEnum(StatusAtividade),
        default=StatusAtividade.PENDENTE,
        nullable=False,
    )


    completed_at = Column(
        DateTime,
        nullable=True,
    )

    __table_args__ = (
        UniqueConstraint(
            "aluno_id",
            "atividade_id",
            name="uq_aluno_atividade",
        ),
    )

    aluno = relationship("Aluno", back_populates="progressos")

    atividade = relationship(
        "Atividade",
        back_populates="progressos",
    )
