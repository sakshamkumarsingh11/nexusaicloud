from pydantic import BaseModel, Field


class AdminLogin(BaseModel):
    username: str = Field(..., min_length=3, max_length=100)
    password: str = Field(..., min_length=8)


class TokenResponse(BaseModel):
    message: str = "Login successful"

