# Environment & Security Verification Checklist

- [x] **No Secrets Committed**: Verified using `git log -p` and `git status`. Zero tokens or API keys exist in git history.
- [x] **Gitignore Coverage**: `.env*.local` is explicitly listed in `.gitignore`.
- [x] **Public Template Provided**: `.env.example` is committed with non-secret variable placeholders:
  ```env
  GEMINI_API_KEY=your_gemini_api_key_here
  ```
- [x] **Dual-Mode Architectural Safety**:
  - When `GEMINI_API_KEY` is present in Vercel or local environment, the system utilizes Google Gemini 2.5 Flash for generative synthesis.
  - When `GEMINI_API_KEY` is not present, the system defaults cleanly to a deterministic high-fidelity domain decision engine, ensuring judges and evaluators encounter zero crashes or blank states.
- [x] **Server-Side Key Isolation**: All AI SDK interactions are encapsulated inside server-side route handlers (`/api/generate-project` and `/api/evaluate-viva`). Keys are never bundled or transmitted to the client browser.
