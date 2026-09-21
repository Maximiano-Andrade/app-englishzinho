from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class Professor(Base):
    __tablename__ = "professor"

    id_professor = Column(Integer, primary_key=True, autoincrement=True)

    id_usuario = Column(
        Integer,
        ForeignKey("usuario.id_usuario"),
        unique=True,
        nullable=False,
    )

    escola = Column(String(255), nullable=True)

    usuario = relationship(
        "Usuario",
        back_populates="professor_perfil",
    )

    atividades = relationship(
        "Atividade",
        back_populates="professor",
    )