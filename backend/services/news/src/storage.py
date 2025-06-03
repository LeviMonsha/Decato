from datetime import datetime
from typing import List
import uuid

from src.utils.db import get_connection
from src.models.news import NewsItem

async def add_news_items(items: List[NewsItem]):
    conn = get_connection()
    with conn:
        with conn.cursor() as cur:
            for item in items:
                news_id = item.id or uuid.uuid4()
                cur.execute("""
                    INSERT INTO decatopg.news (id, title, content, link, published_at)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (published_at) DO UPDATE SET
                        title = EXCLUDED.title,
                        content = EXCLUDED.content,
                        published_at = EXCLUDED.published_at;
                """, (str(news_id), item.title, item.content, str(item.link), item.published_at))
    conn.close()

async def get_news_items(limit: int = 10, offset: int = 0) -> List[NewsItem]:
    conn = get_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, title, content, link, published_at
                FROM decatopg.news
                ORDER BY published_at DESC
                LIMIT %s OFFSET %s;
                """,
                (limit, offset)
            )
            rows = cur.fetchall()
    conn.close()
    return [NewsItem(**row) for row in rows]

def get_news_status():
    return {
        "news_count": None,
        "last_updated": None
    }