# Debugging Playbook: 2-Minute Fixes for Hackathon Speed

### 1. React 19 Hydration Mismatch
- **Symptom**: `Hydration failed because the server-rendered HTML didn't match the client`.
- **Root Cause**: Accessing `localStorage`, `window`, or non-deterministic math (`Math.random()`, `Date.now()`) during initial render.
- **Fix**: Use `useSyncExternalStore` or wrap storage initialization in a `useEffect` with a `mounted` guard:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <SkeletonLoader />;
```

### 2. React 19 `react-hooks/set-state-in-effect` Lint Error
- **Symptom**: `Calling setState synchronously within an effect can trigger cascading renders`.
- **Root Cause**: Triggering `setState(false)` synchronously inside the body of a `useEffect`.
- **Fix**: Move state updates inside asynchronous callbacks (`setInterval`, `fetch`, event handlers) or use functional state transitions:
```tsx
setTimeLeft((prev) => {
  if (prev <= 1) {
    setTimerRunning(false);
    return 0;
  }
  return prev - 1;
});
```

### 3. Tailwind CSS v4 Migration Issues
- **Symptom**: Custom theme classes not resolving or `@tailwind` directives warning.
- **Root Cause**: Tailwind v4 uses `@import "tailwindcss";` and `@theme { ... }` blocks rather than `tailwind.config.js`.
- **Fix**: Keep theme tokens declared in `app/globals.css` under `:root` and `@theme`.

### 4. Next.js 16 Turbopack Prerendering Failures
- **Symptom**: `next build` fails with `Error: Cannot read properties of undefined` during static generation.
- **Root Cause**: Dynamic API routes or client components accessing query parameters without Suspense boundary.
- **Fix**: Wrap query-dependent components in `<Suspense fallback={<Loading />}>`. For server route handlers requiring request bodies, export `export const dynamic = 'force-dynamic'`.

### 5. Repository Bloat (> 10 MB limit)
- **Symptom**: Tracked git size exceeds 10 MB.
- **Fix**: Inspect git objects and un-track heavy files:
```bash
git count-objects -vH
git rm --cached -r <heavy-folder>
```
