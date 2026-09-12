import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# 1. Obtém o diretório atual onde este arquivo (database.py) está instalado
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 2. Define o caminho para a subpasta 'db' (ex: backend/app/database/db)
PASTA_DB = os.path.join(BASE_DIR, "db")

# 3. Cria a pasta automaticamente caso ela não exista
if not os.path.exists(PASTA_DB):
    os.makedirs(PASTA_DB)

# 4. Define o caminho completo do arquivo .db
CAMINHO_BANCO = os.path.join(PASTA_DB, "english.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{CAMINHO_BANCO}"

# Conexão do SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    execution_options={"use_insertmanyvalues": False}  # Previne erros de compatibilidade no INSERT
)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos ORM
Base = declarative_base()

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()