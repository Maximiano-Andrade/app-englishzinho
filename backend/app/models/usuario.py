from app.database.database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, func
from sqlalchemy.orm import relationship

class Usuario(Base):
    __tablename__ = "usuario"

    id_usuario = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), default="Usuario",)
    email = Column(String(255), unique=True, nullable=False)
    senha = Column(String(255), nullable=False)
    foto_perfil = Column(String(500), nullable=False,)  # Salva a URL/caminho da imagem
    tipo_usuario = Column(String(50), nullable=False, default="ALUNO")  # Ex: 'ALUNO', 'PROFESSOR', 'ADMIN'

    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.now()
    )

    # Relacionamentos 1:1
    aluno_perfil = relationship("Aluno", back_populates="usuario", uselist=False)
    professor_perfil = relationship("Professor", back_populates="usuario", uselist=False)