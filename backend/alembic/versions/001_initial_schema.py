"""Initial schema for enquiries and admin users

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-11-04
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create enquiries table
    op.create_table(
        'enquiries',
        sa.Column('id', sa.Uuid(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('company', sa.String(length=255), nullable=True),
        sa.Column('phone', sa.String(length=50), nullable=True),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('service', sa.String(length=100), nullable=True),
        sa.Column('budget', sa.String(length=100), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False, server_default='new'),
        sa.Column('source', sa.String(length=20), nullable=False, server_default='contact'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    )

    # Create admin_users table
    op.create_table(
        'admin_users',
        sa.Column('id', sa.Uuid(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('username', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index('ix_admin_users_username', 'admin_users', ['username'], unique=True)
    op.create_index('ix_admin_users_email', 'admin_users', ['email'], unique=True)


def downgrade() -> None:
    op.drop_index('ix_admin_users_email', table_name='admin_users')
    op.drop_index('ix_admin_users_username', table_name='admin_users')
    op.drop_table('admin_users')
    op.drop_table('enquiries')

