---
name: depot-code
description: >
  Depot Code (code.depot.dev) — Depot's Git source-control hosting, where THIS monorepo
  (chained-monorepo) is hosted. Use when cloning, pushing, adding remotes, setting up git
  credentials, creating or deleting repositories via the dashboard or API, or when a push/clone
  auth prompt or "code.depot.dev" URL appears. Covers repository types (standalone vs GitHub
  mirror), HTTPS token auth, clone-URL shape, and how Depot Code interacts with Depot CI.
---

# Depot Code

Depot Code is Depot's source control hosting at `code.depot.dev`. It is entirely standard Git
under the hood — the server is "diskless": packfiles live in blob storage and refs/metadata live
in a transactional store, so Git workers are stateless and horizontally scalable. There is no
web UI for browsing code; you interact with it purely via `git` and the dashboard for repo/token
management. Docs: https://depot.dev/docs/code/overview and https://depot.dev/docs/code/quickstart

**This monorepo (`chainedtools/chained-monorepo`) is hosted on Depot Code, not GitHub.** The
`origin` remote is `https://<org-id>.code.depot.dev/chained-monorepo`, where the org ID is the
URL subdomain.

## Cloning, pushing, fetching

Clone URL shape (org ID is the subdomain, repo paths can be namespaced like `team/service`):

```bash
git clone https://<org-id>.code.depot.dev/<repository>
```

Auth is Git-over-HTTPS only: username is the literal string `x-token`, password is a Depot
access token (per-repo tokens are created from the repository page in the Depot dashboard and
shown only once). Storing it inline in the remote works, but prefer a credential helper
(`git config credential.helper store` or the system helper) so tokens aren't embedded in
`.git/config` or printed by `git remote -v`.

Standalone repos support clone, push, and fetch with plain git — no special CLI needed.

## Repository types

- **Standalone**: fresh empty repo created in the dashboard (under Code → Repositories →
  Create repository). Depot is the source of truth.
- **GitHub mirror**: imports a GitHub repo (org needs a **GitHub Code Access** connection,
  checked in org Settings). GitHub remains the source of truth — pushes through Depot are
  forwarded to GitHub, and upstream changes are imported on refresh. Mirrors exist so Depot CI
  clones/fetches are served from Depot without round-tripping to GitHub.

## Depot CI integration

Repos hosted on Depot Code trigger Depot CI workflows on `push`: every workflow in
`.depot/workflows/` with an `on: push` trigger runs against the pushed commit (each new commit
in a push starts its own runs). Only the `push` trigger is supported. CI triggers are currently
disabled by default for standalone repos (opt-in via Depot support). For workflow syntax see the
`depot-ci` skill.

Note: in this monorepo, Depot CI `.depot/workflows/` also handles syncing public SDK packages to
their GitHub mirrors via `sync-*.yml` workflows — a `git push` to the Depot Code remote is what
feeds those.

## API (programmatic repo management)

The `depot.code.v1beta1.CodeService` API at `https://api.depot.dev` (Connect JSON protocol —
plain `fetch`/`curl` works, Auth `Bearer $DEPOT_TOKEN` org token):

- `POST /depot.code.v1beta1.CodeService/CreateRepository` — body either
  `{"standalone": {"repository": "team/service", "defaultBranch": "main"}}` or
  `{"github": {"repository": "owner/repository"}}` (mirror). Returns `{"repositoryId": ...}`.
- `POST /depot.code.v1beta1.CodeService/DeleteRepository` — body `{"repositoryId": ...}`; makes
  refs unreachable and cannot be undone — confirm with the user before calling.

`@depot/sdk-node` does not yet export `CodeService`; use Connect JSON directly. Full schema:
https://buf.build/depot/api

## Key facts (beta)

- Depot Code is in beta (free during beta); capabilities may change.
- HTTPS-only auth (no SSH remotes documented).
- Tokens are org/repo-scoped Depot access tokens, not GitHub PATs — don't confuse them.
