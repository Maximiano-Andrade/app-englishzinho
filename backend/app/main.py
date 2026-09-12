from fastapi import FastAPI
from app.database.database import Base, engine
from app.routers import usuarios
from app.routers import auth

# Cria as tabelas no arquivo english.db se elas ainda não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Englishzinho API")

# Registra os roteadores isolados
app.include_router(usuarios.router)
app.include_router(auth.router)
#app.include_router(atividades.router)

@app.get("/")
def root():
    return {"message": "API rodando com sucesso!"}