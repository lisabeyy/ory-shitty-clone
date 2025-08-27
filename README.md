# ORYnth-style Site Generator

Prompt → Template JSON (via Claude) → Persist (Vercel KV or memory) → Render at `/website/[slug]`.

## Quickstart
1. **Install**
   ```bash
   pnpm i   # or yarn / npm
   ```
2. **Env**
   - Copy `.env.example` → `.env.local`.
   - Set `ANTHROPIC_API_KEY` and optional `CLAUDE_MODEL`.
   - (Optional) Set Vercel KV vars to persist across deploys.
3. **Dev**
   ```bash
   pnpm dev
   ```
4. **Use**
   - Open `http://localhost:3000`, enter a prompt, click **Generate**.
   - You’ll be redirected to `/website/<slug>`.

## Deploy to Vercel
1. Push to GitHub, **Import Project** in Vercel.
2. Add **Environment Variables**:
   - `ANTHROPIC_API_KEY`
   - Optionally KV:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - `KV_REST_API_READ_ONLY_TOKEN`
3. Deploy.

## Notes
- No wallet/on-chain integration here.
- For per-site subdomains, move to wildcard domain routing (e.g., Cloudflare Workers) or add an edge proxy.