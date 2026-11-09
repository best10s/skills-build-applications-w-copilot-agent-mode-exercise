# OctoFit Tracker frontend

The React 19 presentation layer uses React Router for the Users, Activities,
Teams, Leaderboard, and Workouts pages. It reads collection data from the
Node.js API on port `8000`.

## API URL configuration

In GitHub Codespaces, create `octofit-tracker/frontend/.env.local` and set
`VITE_CODESPACE_NAME` to the Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite uses this value to call
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev/api/<resource>/`. Restart the
Vite development server after changing `.env.local`. If the variable is omitted
in Codespaces, the frontend derives the API URL from its current
`<codespace>-5173.app.github.dev` hostname. Outside Codespaces, it uses
`http://localhost:8000`.

Run the frontend from the repository root with:

```bash
npm run dev --prefix octofit-tracker/frontend
```
