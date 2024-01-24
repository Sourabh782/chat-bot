import motor.motor_asyncio

from model import User

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.UserList
collection = database.user

async def fetch_one_user(username):
    document = await collection.find_one({"username": username})
    return document

# async def fetch_all_todos():
#     todos = []
#     cursor = collection.find({})
#     async for document in cursor:
#         todos.append(Todo(**document))
#     return todos

async def create_user(user):
    document = user
    result = await collection.insert_one(document)
    return document;
