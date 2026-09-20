from dotenv import load_dotenv

from langchain_groq import ChatGroq
from tavily import TavilyClient


import requests
import os
import json


load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

tavily = TavilyClient(
    api_key=TAVILY_API_KEY
)

llm = ChatGroq(
    model_name="openai/gpt-oss-120b",
    api_key=GROQ_API_KEY,
    temperature=0.2
)


def get_weather(city: str) -> str:

    try:

        url = "https://api.openweathermap.org/data/2.5/weather"

        params = {
            "q": city,
            "appid": WEATHER_API_KEY,
            "units": "metric"
        }

        response = requests.get(
            url,
            params=params,
            timeout=10
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


def search_destination(city: str) -> str:

    try:

        response = tavily.search(
            query=(
                f"Best places to visit in {city}. "
                f"Major attractions, scenic places, "
                f"hidden gems and important tourist spots."
            ),
            search_depth="basic",
            max_results=1
        )

        results = response.get("results", [])

        if not results:
            return "No destination information found."

        output = []

        for result in results:

            content = result.get("content", "")

            output.append(
                f"Title: {result.get('title', '')}\n"
                f"Information: {content[:450]}\n"
                f"Source: {result.get('url', '')}"
            )

        return "\n\n".join(output)

    except Exception as e:

        return f"Destination search failed: {str(e)}"



def search_activities(
    city: str,
    interests: str
) -> str:

    try:

        response = tavily.search(
            query=(
                f"Best things to do in {city}. "
                f"Activities for: {interests}. "
                f"Include relevant adventure, nature, "
                f"culture, photography and local experiences."
            ),
            search_depth="basic",
            max_results=2
        )

        results = response.get("results", [])

        if not results:
            return "No activities found."

        output = []

        for result in results:

            content = result.get("content", "")

            output.append(
                f"Activity: {result.get('title', '')}\n"
                f"Details: {content[:450]}\n"
                f"Source: {result.get('url', '')}"
            )

        return "\n\n".join(output)

    except Exception as e:

        return f"Activity search failed: {str(e)}"


def search_route(
    starting_point: str,
    destination: str
) -> str:

    try:

        response = tavily.search(
            query=(
                f"How to travel from {starting_point} to {destination}. "
                f"Best practical options by train, bus, flight or car. "
                f"Approximate travel time."
            ),
            search_depth="basic",
            max_results=1
        )

        results = response.get("results", [])

        if not results:
            return "No route information found."

        output = []

        for result in results:

            content = result.get("content", "")

            output.append(
                f"Route: {result.get('title', '')}\n"
                f"Information: {content[:450]}\n"
                f"Source: {result.get('url', '')}"
            )

        return "\n\n".join(output)

    except Exception as e:

        return f"Route search failed: {str(e)}"



def plan_trip(
    destination: str,
    starting_point: str,
    days: int,
    budget: int,
    travelers: int,
    travel_type: str,
    interests: list[str]
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
        interests_text
    )


    print("🚗 Searching route...")

    route = search_route(
        starting_point,
        destination
    )


    # ========================================================
    # 2. SEND COMPACT DATA TO GROQ
    # ========================================================

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


    # ========================================================
    # 3. ONE GROQ CALL
    # ========================================================

    print("🤖 Generating itinerary...")

    response = llm.invoke(prompt)

    final_response = response.content


    # ========================================================
    # 4. CLEAN RESPONSE
    # ========================================================

    if isinstance(final_response, list):

        final_response = "".join(
            item.get("text", "")
            for item in final_response
            if isinstance(item, dict)
        )


    final_response = final_response.strip()


    # Remove markdown fences

    if final_response.startswith("```json"):

        final_response = final_response[7:].strip()


    if final_response.startswith("```"):

        final_response = final_response[3:].strip()


    if final_response.endswith("```"):

        final_response = final_response[:-3].strip()


    # ========================================================
    # 5. PARSE JSON
    # ========================================================

    try:

        return json.loads(final_response)

    except json.JSONDecodeError:

        return {
            "error": "AI returned invalid JSON",
            "raw_response": final_response
        }