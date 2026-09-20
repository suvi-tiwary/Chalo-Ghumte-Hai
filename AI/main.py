import os
import json
import html
import re
import requests

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from langchain_groq import ChatGroq
from tavily import TavilyClient


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is missing from .env")

if not TAVILY_API_KEY:
    raise ValueError("TAVILY_API_KEY is missing from .env")

if not WEATHER_API_KEY:
    raise ValueError("WEATHER_API_KEY is missing from .env")


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Chalo Ghumte Hai AI",
    description="AI Travel Planner and Travel Assistant",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# AI CLIENTS
# ============================================================

tavily = TavilyClient(
    api_key=TAVILY_API_KEY
)

llm = ChatGroq(
    model_name="openai/gpt-oss-120b",
    api_key=GROQ_API_KEY,
    temperature=0.2,
)


# ============================================================
# REQUEST MODELS
# ============================================================

class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = Field(default_factory=list)


class TripRequest(BaseModel):
    destination: str
    starting_point: str = "Delhi"
    days: int = 3
    budget: int = 10000
    travelers: int = 1
    travel_type: str = "balanced"
    interests: list[str] = Field(default_factory=list)


# ============================================================
# WEATHER
# ============================================================

def get_weather(city: str) -> str:

    try:

        url = "https://api.openweathermap.org/data/2.5/weather"

        params = {
            "q": city,
            "appid": WEATHER_API_KEY,
            "units": "metric",
        }

        response = requests.get(
            url,
            params=params,
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        return (
            f"City: {data['name']}, {data['sys']['country']}\n"
            f"Temperature: {data['main']['temp']}°C\n"
            f"Feels like: {data['main']['feels_like']}°C\n"
            f"Condition: {data['weather'][0]['main']}\n"
            f"Description: {data['weather'][0]['description']}\n"
            f"Humidity: {data['main']['humidity']}%\n"
            f"Wind: {data['wind']['speed']} m/s"
        )

    except Exception as e:

        return f"Weather unavailable: {str(e)}"


# ============================================================
# DESTINATION SEARCH
# ============================================================

def search_destination(city: str) -> str:

    try:

        response = tavily.search(
            query=(
                f"Best places to visit in {city}. "
                f"Major attractions, scenic places, "
                f"hidden gems and important tourist spots."
            ),
            search_depth="basic",
            max_results=3,
        )

        results = response.get("results", [])

        if not results:
            return "No destination information found."

        output = []

        for result in results:

            content = result.get("content", "")

            output.append(
                f"Title: {result.get('title', '')}\n"
                f"Information: {content[:700]}\n"
                f"Source: {result.get('url', '')}"
            )

        return "\n\n".join(output)

    except Exception as e:

        return f"Destination search failed: {str(e)}"


# ============================================================
# ACTIVITIES SEARCH
# ============================================================

def search_activities(city: str, interests: str) -> str:

    try:

        response = tavily.search(
            query=(
                f"Best things to do in {city}. "
                f"Activities for: {interests}. "
                f"Include adventure, nature, culture, "
                f"photography and local experiences."
            ),
            search_depth="basic",
            max_results=3,
        )

        results = response.get("results", [])

        if not results:
            return "No activities found."

        output = []

        for result in results:

            content = result.get("content", "")

            output.append(
                f"Activity: {result.get('title', '')}\n"
                f"Details: {content[:700]}\n"
                f"Source: {result.get('url', '')}"
            )

        return "\n\n".join(output)

    except Exception as e:

        return f"Activity search failed: {str(e)}"


# ============================================================
# ROUTE SEARCH
# ============================================================

def search_route(starting_point: str, destination: str) -> str:

    try:

        response = tavily.search(
            query=(
                f"How to travel from {starting_point} to {destination}. "
                f"Best practical options by train, bus, flight or car. "
                f"Approximate travel time and route."
            ),
            search_depth="basic",
            max_results=3,
        )

        results = response.get("results", [])

        if not results:
            return "No route information found."

        output = []

        for result in results:

            content = result.get("content", "")

            output.append(
                f"Route: {result.get('title', '')}\n"
                f"Information: {content[:700]}\n"
                f"Source: {result.get('url', '')}"
            )

        return "\n\n".join(output)

    except Exception as e:

        return f"Route search failed: {str(e)}"


# ============================================================
# TRIP PLANNER
# ============================================================

def plan_trip(
    destination: str,
    starting_point: str,
    days: int,
    budget: int,
    travelers: int,
    travel_type: str,
    interests: list[str],
):

    interests_text = (
        ", ".join(interests)
        if interests
        else "general sightseeing"
    )

    print("🌤️ Getting weather...")

    weather = get_weather(destination)

    print("📍 Searching destination...")

    destination_info = search_destination(destination)

    print("🎯 Searching activities...")

    activities = search_activities(
        destination,
        interests_text,
    )

    print("🚗 Searching route...")

    route = search_route(
        starting_point,
        destination,
    )

    prompt = f"""
You are the AI travel planner for "Chalo Ghumte Hai".

Create a practical trip plan using the research data below.

TRIP DETAILS

Destination: {destination}
Starting Point: {starting_point}
Days: {days}
Budget: ₹{budget}
Travelers: {travelers}
Travel Type: {travel_type}
Interests: {interests_text}


================ WEATHER ================

{weather}


================ DESTINATION ================

{destination_info}


================ ACTIVITIES ================

{activities}


================ ROUTE ================

{route}


================ TASK ================

Create a realistic itinerary.

Requirements:

1. Keep the trip within or reasonably close to the given budget.
2. Do not invent current weather.
3. Do not claim estimated prices are exact.
4. Avoid overcrowding the itinerary.
5. Consider travel time between places.
6. Recommend suitable local food.
7. Include practical travel tips.
8. Mention warnings where useful.
9. Use the research above as the primary source.
10. If information is unavailable, clearly say it is unavailable.

Return ONLY valid JSON.

Use exactly this structure:

{{
    "destination": "{destination}",
    "trip_summary": "",

    "weather": {{
        "temperature": "",
        "condition": "",
        "summary": ""
    }},

    "route": {{
        "summary": "",
        "recommended_transport": ""
    }},

    "highlights": [],

    "food": [],

    "budget": {{
        "transport": 0,
        "stay": 0,
        "food": 0,
        "activities": 0,
        "miscellaneous": 0,
        "total": 0
    }},

    "itinerary": [
        {{
            "day": 1,
            "title": "",
            "activities": [
                {{
                    "time": "",
                    "place": "",
                    "description": ""
                }}
            ]
        }}
    ],

    "travel_tips": [],

    "warnings": []
}}
"""

    print("🤖 Generating itinerary...")

    response = llm.invoke(prompt)

    final_response = response.content

    if isinstance(final_response, list):

        final_response = "".join(
            item.get("text", "")
            for item in final_response
            if isinstance(item, dict)
        )

    final_response = str(final_response).strip()

    # Remove markdown code fences
    if final_response.startswith("```json"):
        final_response = final_response[7:].strip()

    if final_response.startswith("```"):
        final_response = final_response[3:].strip()

    if final_response.endswith("```"):
        final_response = final_response[:-3].strip()

    try:

        return json.loads(final_response)

    except json.JSONDecodeError:

        return {
            "error": "AI returned invalid JSON",
            "raw_response": final_response,
        }


# ============================================================
# CHAT AI
# ============================================================

def askllm(
    query: str,
    history: list[dict[str, str]] | None = None,
) -> str:

    conversation = history or []

    history_text = "\n".join(
        f"{item.get('role', 'user')}: {item.get('content', '')}"
        for item in conversation[-8:]
        if item.get("content")
    )

    prompt = f"""
You are "Chalo", the AI travel assistant for
"Chalo Ghumte Hai".

You are a friendly, practical and knowledgeable travel assistant.

You can help with:

- destinations
- trip planning
- itineraries
- transport
- routes
- hotels and stays
- budgets
- food
- local culture
- activities
- packing
- travel safety
- visas
- weather
- travel tips

IMPORTANT:

Stay focused on travel.

If the user asks something unrelated to travel, reply exactly:

"I can help with travel plans, destinations, routes, stays, food, and travel tips."

Do not pretend to have live information if you don't have it.

Do not invent:
- current prices
- hotel availability
- current closures
- current weather
- train/flight availability

    Keep the answer under 120 words.

    Use this simple format when useful:
    Answer: one direct sentence.
    - Point one
    - Point two
    - Point three

    Use no HTML tags, markdown tables, code fences, emojis, or long headings.
    Use at most four short bullet points. Ask at most one short follow-up
    question, and only when the request cannot be answered without it.

If important trip details are missing, ask one useful follow-up question.

Use Indian rupees when discussing Indian travel budgets unless
the user asks for another currency.

Conversation history:

{history_text}

Current user question:

{query}
"""

    response = llm.invoke(prompt)

    answer = response.content

    if isinstance(answer, list):

        answer = "".join(
            item.get("text", "")
            for item in answer
            if isinstance(item, dict)
        )

    answer = html.unescape(str(answer))
    answer = re.sub(r"```(?:text|markdown|html)?", "", answer, flags=re.IGNORECASE)
    answer = re.sub(r"</?(?:br|p|div|li|ul|ol|strong|em|b|i|h[1-6])[^>]*>", "\n", answer, flags=re.IGNORECASE)
    answer = re.sub(r"<[^>]+>", "", answer)
    answer = re.sub(r"\|[^\n]*\|", "", answer)
    answer = re.sub(r"\n{3,}", "\n\n", answer)
    return answer.strip()


# ============================================================
# API ROUTES
# ============================================================

@app.get("/")
def root():

    return {
        "message": "Chalo Ghumte Hai AI backend is running 🚀"
    }


@app.get("/health")
def health():

    return {
        "status": "ok",
        "ai": "Groq",
        "service": "Chalo Ghumte Hai",
    }


# ============================================================
# CHAT ENDPOINT
# ============================================================

@app.post("/chat")
def chat(request: ChatRequest):

    try:

        answer = askllm(
            query=request.message,
            history=[
                {
                    "role": item.role,
                    "content": item.content,
                }
                for item in request.history
            ],
        )

        return {
            "answer": answer
        }

    except Exception as e:

        print("CHAT ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=f"AI chat failed: {str(e)}",
        )


# ============================================================
# TRIP PLAN ENDPOINT
# ============================================================

@app.post("/plan-trip")
def create_trip(request: TripRequest):

    try:

        result = plan_trip(
            destination=request.destination,
            starting_point=request.starting_point,
            days=request.days,
            budget=request.budget,
            travelers=request.travelers,
            travel_type=request.travel_type,
            interests=request.interests,
        )

        return result

    except Exception as e:

        print("TRIP ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=f"Trip planning failed: {str(e)}",
        )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )