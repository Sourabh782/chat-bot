from fastapi import FastAPI, HTTPException
from model import User , Item, Update
from database import (
    fetch_one_user, create_user, fetch_one_user_pass
)
from database_msg import (
    create_messages, fetch_one_message, append_string
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

@app.get("/api/user/{username}/{password}", response_model=User)
async def get_user(username, password):
    response = await fetch_one_user_pass(username, password)
    if response:
        return response
    raise HTTPException(404, f"check credentials")

@app.post("/api/user/", response_model=User)
async def create_new_user(user: User):
    response = await create_user(user.model_dump());
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.get("/api/message/{username}", response_model=Item)
async def get_message(username):
    response = await fetch_one_message(username)
    if response:
        return response
    raise HTTPException(404, f"There is no user with username {username}")

@app.post("/api/message/", response_model=Item)
async def create_new_message(msg: Item):
    response = await create_messages(msg.model_dump());
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/api/message/append/{username}", response_model=Item)
async def append(username, data:Update):
    response = await append_string(username, data)
    if response:
        return response
    raise HTTPException(404, f"there is no user with username")