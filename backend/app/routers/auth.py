from app.crud import usuarioCrud
from app.database.database import get_db
from fastapi import Depends, HTTPException, status, APIRouter
from app.schemas.schemas import LoginResponse
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=LoginResponse)
def login(email: str, db: Session = Depends(get_db)):
    login_obj = usuarioCrud.get_login(db, email)
    if not login_obj:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Usuario nao autorizado")

    return login_obj