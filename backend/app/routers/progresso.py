from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import usuarioCrud
from app.database.database import get_db
from app.schemas.schemas import (
    ProgressoAtividadeCreate,
    ProgressoAtividadeResponse,
)

router = APIRouter(
    prefix="/progresso",
    tags=["Progresso de Atividades"],
)


@router.post("/concluir", response_model=ProgressoAtividadeResponse)
def concluir_atividade(
    progresso_in: ProgressoAtividadeCreate,
    db: Session = Depends(get_db),
):
    return usuarioCrud.concluir_progresso(
        db,
        progresso_in.aluno_id,
        progresso_in.atividade_id,
    )


@router.get(
    "/aluno/{aluno_id}",
    response_model=list[ProgressoAtividadeResponse],
)
def listar_progresso_do_aluno(
    aluno_id: int,
    db: Session = Depends(get_db),
):
    return usuarioCrud.get_progresso_atividade(db, aluno_id)