import motor.motor_asyncio

from model import User, Item

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.UserList
collection = database.user

async def fetch_one_user(username):
    document = await collection.find_one({"username": username})
    return document

async def create_user(user: User):
    document = user
    result = await collection.insert_one(document)
    return document;

async def store_msg(item: Item):
    document = {"name": item.name, "data": item.data}

    result = collection.insert_one(document)
    return document
