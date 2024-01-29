from pydantic import BaseModel

class User(BaseModel):
    name: str
    username: str
    password: str
    
class Item(BaseModel):
    userName: str
    data: list