# SANA album editor maintenance

## User's release preference

The user wants updates to this editor published to their existing Vercel project,
with a recoverable previous version kept before every change or release.

- Before editing application files, run `scripts/backup-release.ps1`. Keep every
  dated backup; never replace or delete older release backups without permission.
- The deployable static site is `dist/`. Synchronize the changed source files and
  assets into it, and increment the `app.js` query version when JavaScript changes.
- Before publishing to Vercel, inspect the current production deployment and save
  its ID, URL, project ID and team ID in the release backup directory. Keep that
  deployment available as the rollback target.
- Preserve a complete ZIP of the previous production files. Match their SHA1s
  to Vercel's source file tree; reuse matching local files and download any
  different public files before replacing production. Keep the release and
  rollback IDs current in `deployment-history.json`.
- Build or stage the new deployment, verify it, then promote that tested version
  to production. Do not delete the prior deployment.
- Keep the local Vercel-ready ZIP updated after successful changes. A ZIP contains
  `index.html` at its root; it must not contain credentials or deployment backups.
- Vercel access is through the connected Vercel plugin. If team consent is missing,
  use `authorize_team_access` and let the user approve the returned link. Never
  copy authentication cookies or tokens from the user's browser.
- The verified Vercel target is project `prj_f7C2kjOQUyg9NmnsQ8L4sptSfqJ0`
  (`29-10-2026temp-album`) in team `team_NQF4FvSoEffTHO6x1C5mIpJW`
  (`mash-s-projects2`). Its production URL is
  `https://29-10-2026temp-album.vercel.app`. Recheck its current production
  deployment before each release; do not create a duplicate project.

Do not change the Facebook template when a request is scoped to Instagram.

## GitHub synchronization

The user explicitly chose the public repository `mash911/mash999` for this work.
Publish future completed updates there as well as to the existing Vercel project.

- Preserve the default branch `main` and all existing history.
- Before updating `main`, read its current SHA and preserve it in a new dated
  `backup/` branch. Do not overwrite an existing backup branch.
- Create each new commit as a descendant of the current head; update the ref
  without force, using `expected_sha` when available to detect concurrent work.
- Use the connected GitHub plugin; never retrieve browser cookies or credentials.
- Include source, `assets/`, `dist/`, and maintenance documentation. Exclude
  credentials, local authentication state, and the large local backup archives.
- Keep the existing `sites` Git remote; do not replace it with the GitHub URL.
- The imported pre-update production snapshot is kept on
  `backup/vercel-before-2026-11-07`.
