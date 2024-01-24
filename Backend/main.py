from fastapi import FastAPI, HTTPException
from model import User
from database import (
    fetch_one_user, create_user
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/api/user/{username}", response_model=User)
async def get_user(username):
    response = await fetch_one_user(username)
    if response:
        return response
    raise HTTPException(404, f"There is no user with username {username}")

@app.post("/api/user/", response_model=User)
async def create_new_user(user: User):
    response = await create_user(user.model_dump());
    if response:
        return response
    raise HTTPException(400, "Something went wrong")