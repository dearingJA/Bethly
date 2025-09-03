from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from scrapers import detect_site, scrape_amazon

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


@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}


@app.get("/scrape")
def scrape(url: str = Query(...)):
    print(url)
    site = detect_site(url)

    if site == "unsupported":
        return {"error": f"Unsupported site for URL: {url}"}

    price = None
    if site == "www.amazon.com":
        price = scrape_amazon(url)

    return {"price": price}
