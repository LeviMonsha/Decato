from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import origins
from src.utils.parser import fetch_all_news
from src.storage import add_news_items
from src.routes import news

app = FastAPI(title="News API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    news = await fetch_all_news()
    await add_news_items(news)