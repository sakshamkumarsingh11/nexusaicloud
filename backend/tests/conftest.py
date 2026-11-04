import os
import pytest

# Ensure tests use in-memory SQLite without attempting remote PostgreSQL connection
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["SECRET_KEY"] = "test-secret-key-for-unit-testing-32-chars-long"

from app.config import get_settings
get_settings.cache_clear()

from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

import app.database as app_db
from app.database import Base, get_db
from app.main import app
from app.models.admin import AdminUser
from app.auth.jwt import hash_password

# Initialize test database engine to in-memory SQLite with StaticPool
app_db.engine = app_db.create_app_engine("sqlite:///:memory:")
app_db.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=app_db.engine)


@pytest.fixture(scope="function")
def db_session():
    Base.metadata.create_all(bind=app_db.engine)
    session = app_db.SessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=app_db.engine)


@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app, raise_server_exceptions=True) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def seeded_admin(db_session):
    admin = AdminUser(
        username="testadmin",
        email="admin@nexus.test",
        hashed_password=hash_password("SuperSecret123!"),
    )
    db_session.add(admin)
    db_session.commit()
    db_session.refresh(admin)
    return admin
