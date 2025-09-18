from pydantic import BaseModel, HttpUrl


class ScrapeRequest(BaseModel):
    url: HttpUrl
    name: str

    # property bc type url obj not str
    @property
    def url_str(self) -> str:
        return str(self.url)


class ScrapeResponse(BaseModel):
    site: str
    price: str | None
    url: str
    img_url: str | None
