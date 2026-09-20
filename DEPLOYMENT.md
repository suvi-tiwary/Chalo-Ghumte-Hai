# Production Deployment

## 1. AI API on Render

The deployed AI API is `https://chalo-ghumte-hai-2.onrender.com`.

In Render, add these environment variables:
   - `GROQ_API_KEY`
   - `TAVILY_API_KEY`
   - `WEATHER_API_KEY`
   - `FRONTEND_ORIGINS=https://chalo-ghumte-hai.vercel.app`
Open `https://chalo-ghumte-hai-2.onrender.com/health` and confirm it returns `{"status":"healthy"}`.

## 2. Connect Vercel to the API

In the Vercel project settings, add this environment variable for **Production**:

```text
VITE_API_URL=https://chalo-ghumte-hai-2.onrender.com
```

Redeploy the frontend after saving the variable. The chat uses `/chat`, and trip planning uses `/plan-trip` on the Render API.

For local development, create `frontend/.env.local` with:

```text
VITE_API_URL=http://localhost:8000
```
