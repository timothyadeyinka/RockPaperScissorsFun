### Sass — compile & watch (recommended)

- Compile once (development): `npm run compile:sass`
- Compile compressed (production): `npm run compile:sass:prod`
- Auto-recompile while developing: `npm run watch:sass`

> Tip: Use `npm run build` during development and `npm run build:prod` for deployment pipelines.

---

## Summary of recent project changes (applied to this repo)

- I added Sass build scripts to `package.json`: `compile:sass`, `compile:sass:prod`, `watch:sass`, `build`, `build:prod`.
- I committed the compiled site (`dist/`) and pushed it to the remote for deployment — `dist/` is now tracked in this repository.
- I updated `.gitignore` so `dist/` is tracked here (I can revert that if you prefer CI-only deploys).
- I added a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that builds `dist/` with `npm run build:prod` and deploys to GitHub Pages on push to `main`.
- I updated the project `README.md` with Sass usage instructions.

## How to update the deployed site (quick)

1. Build locally (production):
   - `npm run build:prod`
2. Commit the updated `dist/` (since it's tracked):
   - `git add dist` # or `git add -A`
   - `git commit -m "chore: update compiled site (dist)"`
   - `git push origin main`

> If you prefer not to track `dist/` in Git, remove/comment `/dist` in `.gitignore` (reverse the earlier change), run `git rm -r --cached dist`, commit that change, and rely on the GitHub Actions workflow to build & publish automatically.

## Notes & recommendations

- Recommended: use the **CI workflow** (already present) and keep `dist/` out of version control for a cleaner history and reproducible builds. ⚙️
- Immediate: commit any visual/functional changes in `dist/` if you want them deployed right away (since `dist/` is tracked).

If you want, I can:

- Add a short deployment badge here showing the Pages URL, or
- Convert the repo to CI-only deploys and remove `dist/` from version control.
