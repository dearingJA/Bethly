from sqlalchemy import Column, Integer, String, Float
from database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    site = Column(String, nullable=False)
    url = Column(String, nullable=False)
    img_url = Column(String, nullable=True)
    price = Column(Float, nullable=True)
