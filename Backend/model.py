from pydantic import BaseModel

class User(BaseModel):
    name: str
    username: str
    password: str
    
class Item(BaseModel):
    username: str
    sent: list
    replies: list
    
class Update(BaseModel):
    username: str
    listName: str
    data: str