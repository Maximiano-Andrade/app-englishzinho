from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.routers import usuarios
from app.routers import auth
from app.routers import atividade
from app.routers import video

# Cria as tabelas no arquivo english.db se elas ainda não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Englishzinho API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registra os roteadores isolados
app.include_router(usuarios.router)
app.include_router(auth.router)
app.include_router(atividade.router)
app.include_router(video.router)
#app.include_router(atividades.router)

@app.get("/")
def root():
    return {"message": "API rodando com sucesso!"}