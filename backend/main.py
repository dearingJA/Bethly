from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from scrapers import detect_site, scrape_amazon

from database import engine, SessionLocal
from sqlalchemy.orm import Session

import models
import schemas


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Bethly Backend API")

origins = [
    "http://localhost:5173",
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}


@app.get("/items/", response_model=list[schemas.Item])
def read_items(db: Session = Depends(get_db)):
    items = db.query(models.Item).all()
    # for i in items:
    #     print(i.name, i.price, i.image)
    return items


@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    url_str = item.url
    site = detect_site(url_str)

    price = "0"
    img_url = ""

    if site == "www.amazon.com":
        price, img_url = scrape_amazon(url_str)

    db_item = models.Item(
        user=item.user,
        name=item.name,
        group=item.group,
        site=site,
        url=item.url,
        price=price,
        img_url=img_url
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}
