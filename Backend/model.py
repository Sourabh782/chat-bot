from pydantic import BaseModel
from typing import List

class User(BaseModel):
    name: str
    username: str
    password: str
    
class Item(BaseModel):
    username: str
    sent: list[list]
    # replies: list
    
class Update(BaseModel):
    data: List[str]