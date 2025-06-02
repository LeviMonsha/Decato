from datetime import datetime
from bs4 import BeautifulSoup
from typing import List
import httpx

from src.utils.parsers.base import BaseNewsParser
from src.models.news import NewsItem

class NuancesProgParser:
    site_name = "NuancesProg"
    url = "https://nuancesprog.ru/computer-science/"

    async def fetch(self) -> List[NewsItem]:
        return []