from sqlalchemy import Column, Integer, String, Float
from database import Base

# uv run python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, nullable=False)
    name = Column(String, nullable=False)
    group = Column(String, nullable=False)
    site = Column(String, nullable=False)
    url = Column(String, nullable=False)
    img_url = Column(String, nullable=True)
    price = Column(Float, nullable=True)
