from pydantic import BaseModel, HttpUrl
from datetime import datetime
import uuid

class NewsItem(BaseModel):
    id: uuid.UUID | None = None
    title: str
    content: str
    link: HttpUrl
    category: str = "Статья"
    published_at: datetime | None = None
