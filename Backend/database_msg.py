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


async def append_string(username, listName, data):
    
    existing_document = await collection.find_one({"username": username})

    if existing_document:
        if listName in existing_document:
            
            existing_document.listName.append(data)

            updated_document = collection.find_one_and_update(
                {"username": username},
                {"$set": {listName: existing_document[listName]}},
                return_document=ReturnDocument.AFTER
            )
            
            return updated_document
        else:
            return {"list not exist"}
    else:
        return {"user not exist"}