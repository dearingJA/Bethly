from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
from urllib.parse import urlparse


supported_sites = ["www.amazon.com"]


def detect_site(url: str) -> str:
    site = urlparse(url).hostname or ""
    # print(site)
    if site not in supported_sites:
        return "unsupported"
    else:
        return site


def parse_price(price_str: str) -> float:
    return float(price_str.replace(",", ""))


def create_driver():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                         "AppleWebKit/537.36 (KHTML, like Gecko) "
                         "Chrome/120.0 Safari/537.36")

    return(webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options))


def scrape_amazon(url):
    driver = create_driver()

    # Attempt to scrape page for price
    try:
        driver.get(url)
        time.sleep(3)
        whole_list = driver.find_elements(By.CLASS_NAME, "a-price-whole")
        fraction_list = driver.find_elements(By.CLASS_NAME, "a-price-fraction")
        if whole_list:
            whole = whole_list[0].text
            fraction = fraction_list[0].text if fraction_list else "00"
            price = whole + "." + fraction
            price = parse_price(price)
        else:
            price = None

        # Attempt to get image
        try:
            img_element = driver.find_element(By.ID, "landingImage")
            img_url = img_element.get_attribute("src")
        except Exception:
            img_url = None

    finally:
        driver.quit()
    return price, img_url
