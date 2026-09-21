from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.schemas import VideoCreate, VideoResponse
from app.database.database import get_db
from app.crud import usuarioCrud

router = APIRouter(
    prefix="/video",
    tags=["video"],
)

@router.post("/", response_model=VideoCreate, status_code=status.HTTP_201_CREATED)
async def create_video(videoCreate: VideoCreate, db: Session = Depends(get_db)):
    video = usuarioCrud.cria_video(videoCreate, db)
    return video

@router.get("/videos", response_model=list[VideoResponse])
def listar_videos(db: Session = Depends(get_db)):
    videos = usuarioCrud.get_videos(db)
    return videos