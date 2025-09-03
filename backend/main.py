from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scrapers import detect_site, scrape_amazon
from schemas import ScrapeRequest, ScrapeResponse

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


@app.post("/scrape", response_model=ScrapeResponse)
def scrape(request: ScrapeRequest):
    url_str = str(request.url_str)

    site = detect_site(url_str)

    if site == "unsupported":
        return ScrapeResponse(site=site, price=None)

    price = None
    if site == "www.amazon.com":
        price = scrape_amazon(url_str)

    return ScrapeResponse(site=site, price=price)
