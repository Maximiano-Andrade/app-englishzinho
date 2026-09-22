from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.crud import usuarioCrud
from app.database.database import get_db
from app.schemas.schemas import AtividadeCreate, AtividadeResponse, AtividadeDetalheResponse

router = APIRouter(
    prefix="/atividades",
    tags=["Atividades"],
)


@router.post(
    "/",
    response_model=AtividadeResponse,
    status_code=status.HTTP_201_CREATED,
)
def criar_atividade(
        atividade_in: AtividadeCreate,
        db: Session = Depends(get_db),
):
    return usuarioCrud.cria_atividade(db, atividade_in)


@router.get("/professor/{professor_id}", response_model=list[AtividadeResponse], )
def listar_atividades_professor(professor_id: int, db: Session = Depends(get_db), ):
    return usuarioCrud.get_atividades_por_professor(
        db,
        professor_id,
    )


@router.get("/", response_model=list[AtividadeResponse])
def listar_todas_atividades(db: Session = Depends(get_db)):
    return usuarioCrud.get_atividades(db)


@router.get("/{atividade_id}",response_model=AtividadeDetalheResponse,)
def buscar_atividade(atividade_id: int, db: Session = Depends(get_db)):
    atividade = usuarioCrud.get_atividade(db, atividade_id)
    if not atividade:
        raise HTTPException(
            status_code=404,
            detail="Atividade não encontrada.",
        )

    return atividade