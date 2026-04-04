# Deploy Skill

Deploy the application by running tests, building a production bundle, and pushing to staging.

## Steps

Follow these steps in order. Stop and report the error if any step fails — do not continue to the next step.

1. **Run tests**
   - Run `npm test -- --run` (Vitest) or `npm test` if no Vitest config exists
   - If the project has no test script, skip this step and inform the user
   - All tests must pass before proceeding

2. **Build production bundle**
   - Run `npm run build`
   - Confirm the build succeeds and the `dist/` directory was produced

3. **Push to staging**
   - Run `git add -A && git stash` to save any uncommitted changes temporarily if needed
   - Run `git push origin main` (or the current branch) to push code
   - If a `staging` remote or branch exists, push there instead: `git push staging main`
   - Report the final git output to the user

## On completion

Report a summary:
- Tests: passed / skipped
- Build: succeeded, output directory
- Staging push: branch and remote pushed to
