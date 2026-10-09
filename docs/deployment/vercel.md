# Deploying the frontend to Vercel

The Next.js app in `frontend/` deploys to Vercel's free tier.

## Steps

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Set **Root Directory** to `frontend`. Vercel detects Next.js and uses [`frontend/vercel.json`](../../frontend/vercel.json).
4. Add the environment variable:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_API_URL` | The public URL of your API, for example `https://hoodiesbus-backend.onrender.com` |

5. Click **Deploy**.

After the first deploy, set `FRONTEND_URL` on the API to your Vercel URL so CORS allows it. See [Render](render.md) or [Railway](railway.md).

## Troubleshooting

- **No deployment appears:** confirm the Git integration has access to the repository (Vercel → Settings → Git) and that the Root Directory is `frontend`.
- **Build fails:** run `npm run build` inside `frontend/` locally to reproduce the error.
- **Designer cannot reach the API:** check `NEXT_PUBLIC_API_URL` has no trailing slash, then redeploy. Environment variables are baked in at build time.
