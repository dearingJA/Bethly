from pydantic import BaseModel, HttpUrl


class ScrapeRequest(BaseModel):
    url: HttpUrl

    # property bc type url obj not str
    @property
    def url_str(self) -> str:
        return str(self.url)


class ScrapeResponse(BaseModel):
    site: str
    price: str | None
