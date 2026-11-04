"""CLI script to create an admin user securely.

Usage:
    python -m app.create_admin

The script prompts for username, email, and password interactively.
Passwords are never hardcoded or logged.
"""
import getpass
import sys
from app.database import SessionLocal
from app.models.admin import AdminUser
from app.auth.jwt import hash_password


def create_admin():
    print("\n=== Nexus Admin User Creation ===\n")

    username = input("Username: ").strip()
    if not username or len(username) < 3:
        print("Error: Username must be at least 3 characters.")
        sys.exit(1)

    email = input("Email: ").strip()
    if not email or "@" not in email:
        print("Error: Please enter a valid email address.")
        sys.exit(1)

    password = getpass.getpass("Password (min 8 chars): ")
    if len(password) < 8:
        print("Error: Password must be at least 8 characters.")
        sys.exit(1)

    confirm = getpass.getpass("Confirm password: ")
    if password != confirm:
        print("Error: Passwords do not match.")
        sys.exit(1)

    db = SessionLocal()
    try:
        # Check for existing user
        existing = db.query(AdminUser).filter(
            (AdminUser.username == username) | (AdminUser.email == email)
        ).first()
        if existing:
            print("Error: An admin with this username or email already exists.")
            sys.exit(1)

        admin = AdminUser(
            username=username,
            email=email,
            hashed_password=hash_password(password),
        )
        db.add(admin)
        db.commit()
        print(f"\n✓ Admin user '{username}' created successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error creating admin: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    create_admin()

