from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.config import get_settings

settings = get_settings()

def create_app_engine(url: str | None = None):
    db_url = url or get_settings().database_url
    engine_kwargs = {"pool_pre_ping": True}
    if db_url.startswith("sqlite"):
        engine_kwargs.update({
            "connect_args": {"check_same_thread": False},
        })
        if ":memory:" in db_url:
            from sqlalchemy.pool import StaticPool
            engine_kwargs["poolclass"] = StaticPool
    else:
        engine_kwargs.update({
            "pool_size": 10,
            "max_overflow": 20,
            "connect_args": {"connect_timeout": 3},
        })
    return create_engine(db_url, **engine_kwargs)


engine = create_app_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

