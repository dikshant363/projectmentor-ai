# Git Submission Workflow (PromptWars Rules Compliant)

## 1. Hackathon Constraints Check
- **Single Branch Rule**: Only branch `main` should exist and be active.
- **Repository Size Limit**: Must remain strictly under **10 MB** (measured via `git count-objects -vH`).
- **No Leaked Secrets**: `.env.local` or API tokens must never be tracked by git.

## 2. Verification Commands
```bash
# Verify single active branch
git branch -a

# Verify tracked git size
git count-objects -vH

# Verify status of sensitive environment files
git status
git ls-files .env.local
```

## 3. Clean Commit & Push Sequence
```bash
# Stage all changes
git add .

# Verify nothing unwanted is staged
git status

# Commit with standard conventional commit message
git commit -m "feat(submission): complete ProjectMentor AI with Viva Defense Simulator and survival kit"

# Set up remote and push to submission repository
git remote add origin https://github.com/<your-username>/promptwar.git
git push -u origin main
```
