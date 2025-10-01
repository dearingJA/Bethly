from pydantic import BaseModel, ConfigDict


class ItemBase(BaseModel):
    user: str
    name: str
    group: str
    url: str
    price: float | None = None
    img_url: str | None = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
