from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database
from app.models import Base
from contextlib import contextmanager
from dotenv import load_dotenv
import os

load_dotenv()

print("dATABASE uRL ::: ", os.getenv("DATABASE_URL"))
engine = create_engine(os.getenv("DATABASE_URL"), echo=True)

if not database_exists(engine.url):
    create_database(engine.url)
    print(f"Database created at {engine.url}")

Base.metadata.create_all(bind=engine)

sessions = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@contextmanager
def get_db_session():
    db = sessions()
    try:
        yield db
    finally:
        db.close()
