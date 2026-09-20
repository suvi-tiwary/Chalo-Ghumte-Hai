# Production Deployment

## 1. Deploy the AI API on Vercel

1. Create a second Vercel project from this repository for the AI service.
2. Leave the project root directory as the repository root. Vercel will detect `api/index.py`.
3. Add these environment variables in the AI Vercel project:
   - `GROQ_API_KEY`
   - `TAVILY_API_KEY`
   - `WEATHER_API_KEY`
   - `FRONTEND_ORIGINS=https://chalo-ghumte-hai.vercel.app`
4. Deploy and copy the generated AI project URL, for example `https://chalo-ghumte-hai-ai.vercel.app`.
5. Open `<ai-project-url>/api/health` and confirm it returns `{"status":"healthy"}`.

## 2. Connect Vercel to the API

In the Vercel project settings, add this environment variable for **Production**:

```text
VITE_API_URL=https://<your-ai-project>.vercel.app/api
```

Redeploy the frontend after saving the variable. The chat uses `<ai-project-url>/api/chat`, and trip planning uses `<ai-project-url>/api/plan-trip`.

For local development, create `frontend/.env.local` with:

```text
VITE_API_URL=http://localhost:8000
```
