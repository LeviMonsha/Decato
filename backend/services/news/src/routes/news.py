from fastapi import APIRouter, Query, HTTPException

from src.utils.parser import fetch_all_news
from src.storage import add_news_items, get_news_items, get_news_status
from src.models.news import NewsItem

router = APIRouter(prefix="/news")

@router.get("/", response_model=list[NewsItem])
async def get_news(page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=50)):
    offset = (page - 1) * page_size
    news = await get_news_items(limit=page_size, offset=offset)
    return news

@router.post("/update", response_model=list[NewsItem])
async def update_news():
    try:
        news = await fetch_all_news()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при получении новостей: {e}")

    add_news_items(news)
    return news

@router.get("/status")
async def get_news_status_endpoint():
    status = get_news_status()
    if not status:
        return {"status": "Новости не загружены"}
    return status