from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time


app = FastAPI(title="Bethly Backend API")

origins = [
    "http://localhost:5173",
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}


@app.get("/ping")
async def ping():
    return {"status": "hot reloding? ok"}


@app.get("/api/price")
def get_amazon_price():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    url = "https://www.amazon.com/Marina-Moscone-Boyfriend-Blazer-Cognac/dp/B0CYQ8GDPW"
    driver.get(url)
    time.sleep(3)
    
    whole_list = driver.find_elements(By.CLASS_NAME, "a-price-whole")
    fraction_list = driver.find_elements(By.CLASS_NAME, "a-price-fraction")
    
    if whole_list:
        whole = whole_list[0].text
        fraction = fraction_list[0].text if fraction_list else "00"
        price = whole + "." + fraction
    else:
        price = None
        
    driver.quit()
    return {"price": price}
