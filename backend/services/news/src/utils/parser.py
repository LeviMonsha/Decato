from typing import List

from src.models.news import NewsItem
from src.utils.parsers import sf, np

PARSERS = [
    sf.SkillFactoryParser(),
    np.NuancesProgParser()
]

async def fetch_all_news() -> List[NewsItem]:
    all_news = []
    for parser in PARSERS:
        try:
            news = await parser.fetch()
            all_news.extend(news)
        except Exception as e:
            print(f"Ошибка при парсинге {parser.site_name}: {e}")
    return all_news
