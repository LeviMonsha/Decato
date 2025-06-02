import psycopg2
from psycopg2.extras import RealDictCursor

from src.config import DB_PARAMS

def get_connection():
    conn = psycopg2.connect(**DB_PARAMS, cursor_factory=RealDictCursor)
    return conn