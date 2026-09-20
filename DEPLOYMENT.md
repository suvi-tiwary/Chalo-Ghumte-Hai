# Production Deployment

## 1. Deploy the AI API on Render

1. Create a new Render **Web Service** from this repository.
2. Use the settings in `render.yaml` (or set these manually):
   - Root directory: `AI`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn api:app --host 0.0.0.0 --port $PORT`
3. Add these environment variables in Render:
   - `GROQ_API_KEY`
   - `TAVILY_API_KEY`
   - `WEATHER_API_KEY`
   - `FRONTEND_ORIGINS=https://chalo-ghumte-hai.vercel.app`
4. Deploy and copy the generated service URL, for example `https://chalo-ghumte-hai-ai.onrender.com`.
5. Open `<service-url>/health` and confirm it returns `{"status":"healthy"}`.

## 2. Connect Vercel to the API

In the Vercel project settings, add this environment variable for **Production**:

```text
VITE_API_URL=https://<your-render-service>.onrender.com
```

Redeploy the frontend after saving the variable. The chat uses `<service-url>/chat`, and trip planning uses `<service-url>/plan-trip`.

For local development, create `frontend/.env.local` with:

```text
VITE_API_URL=http://localhost:8000
```
