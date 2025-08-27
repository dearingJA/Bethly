from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                     "AppleWebKit/537.36 (KHTML, like Gecko) "
                     "Chrome/120.0 Safari/537.36")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)


TEST_URLS = [
    "https://www.amazon.com/Marina-Moscone-Boyfriend-Blazer-Cognac/dp/B0CYQ8GDPW?ref_=lx_bd&th=1&psc=1",
    "https://www.amazon.com/Sony-WH-1000XM6-Headphones-Microphones-Studio-Quality/dp/B0F3QJLD3B/ref=cur_obsess_elect_grid?pf_rd_p=61fc7264-70f8-4083-9c30-8dcbac60092c&pf_rd_r=AVMNVSN2TJ8HEZS0WK9S&sr=1-1-c9c68f94-e5d9-4bd2-97d7-6a7e542381df&th=1",
]

url = TEST_URLS[1]

driver.get(url)

time.sleep(3)

whole_list = driver.find_elements(By.CLASS_NAME, "a-price-whole")
fraction_list = driver.find_elements(By.CLASS_NAME, "a-price-fraction")

if whole_list:
    whole = whole_list[0].text
    fraction = fraction_list[0].text if fraction_list else "00"
    price = whole + "." + fraction
    print("Price:", price)
else:
    print("Price not found")

driver.quit()
