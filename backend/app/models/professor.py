from app.database.database import Base
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

class Professor(Base):
    __tablename__ = "professor"

    id_professor = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"), unique=True, nullable=False)
    escola = Column(String(255), nullable=True)

    # Relacionamentos
    usuario = relationship("Usuario", back_populates="professor_perfil")