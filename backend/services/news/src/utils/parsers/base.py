from typing import List

from src.models.news import NewsItem

class BaseNewsParser:
    site_name: str

    async def fetch(self) -> List[NewsItem]:
        raise NotImplementedError
