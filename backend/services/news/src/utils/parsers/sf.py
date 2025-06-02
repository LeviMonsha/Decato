from bs4 import BeautifulSoup
from typing import List
import httpx

from src.utils.parsers.base import BaseNewsParser
from src.models.news import NewsItem

class SkillFactoryParser(BaseNewsParser):
    site_name = "SkillFactory"
    url = "https://blog.skillfactory.ru/trendy-v-iskusstvennom-intellekte-2025/"

    async def fetch(self) -> List[NewsItem]:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(self.url)
            response.raise_for_status()
            html = response.text

        soup = BeautifulSoup(html, 'html.parser')
        news_items = []
        for h2 in soup.find_all('h2'):
            title = h2.get_text(strip=True)
            link_tag = h2.find('a')
            link = link_tag['href'] if link_tag and link_tag.has_attr('href') else self.url
            content_tag = h2.find_next_sibling('p')
            content = content_tag.get_text(strip=True) if content_tag else None

            category = "Новости" if "новост" in title.lower() else "Статья"

            news_items.append(NewsItem(
                title=title,
                content=content,
                link=link,
                published_at=None,
                category=category
            ))
        return news_items
