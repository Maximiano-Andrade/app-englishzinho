from sqlalchemy import Column, ForeignKey, Integer, Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(Text, nullable=False)

    activity_id = Column(
        Integer,
        ForeignKey("atividades.id", ondelete="CASCADE"),
        nullable=False,
    )

    activity = relationship("Atividade", back_populates="questions")

    answers = relationship(
        "Answer",
        back_populates="question",
        cascade="all, delete-orphan",
    )