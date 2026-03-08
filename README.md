# QNL Frontend

React + Vite frontend for the QNL project. Built with React 18, Vite, Tailwind CSS and Redux Toolkit.

## Features

- Admin panel components and forms
- Public site with hero, products, services, testimonials, newsletter, and footer
- Image upload, pagination, modals, and reusable UI components

## Tech stack

- React 18
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios

## Requirements

- Node.js 18+ and npm (or Yarn)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build locally

```bash
npm run preview
```

## Available scripts

Taken from `package.json`:

- `dev` — start Vite dev server
- `build` — build for production
- `preview` — locally preview production build
- `lint` — run ESLint

## Project structure

Key folders:

- `src/` — application source
  - `components/` — reusable and page components
  - `pages/` — route pages (admin and public)
  - `layouts/` — layout components
  - `routes/` — route definitions and protected routes
  - `store/` — Redux store and slices
  - `hooks/` — custom hooks

## Environment

If the app needs environment variables, add them to a `.env` file at the project root (example `.env.local`). Typical variables include API base URL used by `src/config/axiosInstance.jsx`.

## Notes for contributors

- Follow existing code style and lint rules. Run `npm run lint` before opening PRs.
- Keep components small and focused; prefer hooks for logic reuse.

## Where to look

- Admin views: `src/pages/admin`
- Public views: `src/pages/public`
- Central API client: `src/config/axiosInstance.jsx`

---

If you'd like, I can also add a CONTRIBUTING.md, update package.json with a `prepare` or `format` script, or create example env files.
