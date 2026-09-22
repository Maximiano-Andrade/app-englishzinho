from app.database.database import Base
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

class Aluno(Base):
    __tablename__ = "aluno"

    id_aluno = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"), unique=True, nullable=False)
    nivel_ingles = Column(String(50), nullable=True)

    # Relacionamentos
    usuario = relationship("Usuario", back_populates="aluno_perfil")
    progressos = relationship(
        "ProgressoAtividade",
        back_populates="aluno",
    )