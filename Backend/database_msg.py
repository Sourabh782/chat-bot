import motor.motor_asyncio

from pymongo import ReturnDocument

from model import Item, Update

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.UserList
collection = database.messages

async def fetch_one_message(username):
    document = await collection.find_one({"username": username})
    return document

async def create_messages(message: Item):
    document = message
    result = await collection.insert_one(document)
    return document;


async def append_string(username, data1: Update):
    
    existing_document = await collection.find_one({"username": username})
    
    if existing_document:
        # Append the new array to the end of the existing array
        existing_document["sent"].append(data1.data)
        
        # Update the document in MongoDB
        await collection.update_one({"username": username}, {"$set": {"sent": existing_document["sent"]}})
        
        return existing_document