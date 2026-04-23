import os
from contextlib import contextmanager

import psycopg2
from psycopg2 import pool
from psycopg2.extras import RealDictCursor

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "5432"))
DB_NAME = os.getenv("DB_NAME", "testaccounts")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "1234")

_pool: pool.SimpleConnectionPool | None = None


def init_pool() -> None:
    global _pool
    _pool = pool.SimpleConnectionPool(
        1,
        10,
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
    )


def get_conn():
    if _pool is None:
        raise RuntimeError("Connection pool is not initialized")
    return _pool.getconn()


def release_conn(conn) -> None:
    if _pool is not None:
        _pool.putconn(conn)


@contextmanager
def connection():
    conn = get_conn()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        release_conn(conn)


CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS accounts (
    id           SERIAL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    address      TEXT,
    email        VARCHAR(255) UNIQUE,
    status       SMALLINT NOT NULL DEFAULT 1,
    created_time BIGINT NOT NULL,
    updated_time BIGINT NOT NULL
);
"""


def init_schema() -> None:
    init_pool()
    with connection() as conn:
        with conn.cursor() as cur:
            cur.execute(CREATE_TABLE_SQL)
