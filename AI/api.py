import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

try:
    from .main import askllm, plan_trip
except ImportError:
    from main import askllm, plan_trip


logger = logging.getLogger("chalo-ghumte-hai")


app = FastAPI(
    title="Chalo Ghumte Hai",
    description="AI Powered Trip Planner",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TripRequest(BaseModel):
    destination: str
    starting_point: str
    days: int
    budget: int
    travelers: int = 1
    travel_type: str = "friends"
    interests: list[str] = []


class ChatRequest(BaseModel):
    message: str
    history: list[dict[str, str]] = []


@app.get("/")
def home():
    return {
        "message": "Chalo Ghumte Hai API is running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/plan-trip")
def create_trip(request: TripRequest):

    try:
        trip = plan_trip(
            destination=request.destination,
            starting_point=request.starting_point,
            days=request.days,
            budget=request.budget,
            travelers=request.travelers,
            travel_type=request.travel_type,
            interests=request.interests
        )

        return {
            "success": True,
            "trip": trip
        }

    except Exception as e:
        # Keep the full traceback in the FastAPI terminal while returning a useful response to the UI.
        logger.exception("Trip planning failed for destination=%s", request.destination)
        raise HTTPException(
            status_code=500,
            detail=f"Trip planning failed: {type(e).__name__}: {e}"
        )


@app.post("/chat")
def travel_chat(request: ChatRequest):
    """Answer travel questions while keeping the assistant on-topic."""
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    try:
        return {"answer": askllm(request.message, request.history)}
    except Exception as error:
        logger.exception("Travel chat failed")
        raise HTTPException(
            status_code=503,
            detail=f"Travel chat unavailable: {type(error).__name__}: {error}"
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )