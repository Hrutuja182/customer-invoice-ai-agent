
from fastapi import FastAPI

app = FastAPI(
    title="Customer Invoice AI Agent",
    description="AI-powered customer invoice validation system",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Customer Invoice AI Agent API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
