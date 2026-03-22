# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Supabase Auth (local and Netlify)

1. Create a `.env.local` (or `.env`) file in the project root with:

```env
DOCUSAURUS_SUPABASE_URL=https://<your-project>.supabase.co
DOCUSAURUS_SUPABASE_ANON_KEY=<your-anon-key>
```

2. Confirm `.env` is ignored by git (`.gitignore` includes `.env`).
3. In Netlify site settings, configure environment variables (do not commit them):
   - `DOCUSAURUS_SUPABASE_URL`
   - `DOCUSAURUS_SUPABASE_ANON_KEY`

4. Login flow:
   - Navigate to `/login`
   - Enter email and submit
   - Confirm via email magic-link

5. Optional: use `/signup` for email/password registration if enabled.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
