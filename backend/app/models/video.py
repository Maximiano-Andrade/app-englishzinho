from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, func

from app.database.database import Base


class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    type = Column(String(50), nullable=False)
    nivel = Column(String(50), nullable=False)
    url = Column(String(500), nullable=False)

    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.now(),
    )