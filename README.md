# Memory Wall - Frontend

A collaborative memory sharing platform where users can create walls, invite members, and post memories with images. Built as a university project for the Single Page Applications course.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **MUI (Material UI) 7** for component library and theming
- **React Router 7** for client-side routing with protected routes
- **React Query (TanStack Query)** for server state management and caching
- **React Hook Form + Zod** for form handling and schema validation
- **Axios** with interceptors for API communication (session-based auth)
- **ESLint (Airbnb config) + Prettier** for code quality

## Features

- User authentication (login, register, session-based)
- Create and manage personal memory walls
- Invite other users and manage wall members
- Post memories with image uploads
- Browse shared walls from other users
- Dashboard with usage statistics
- Light/dark theme support
- Responsive layout with drawer navigation

## Project Structure

```
src/
├── api/            # Axios client and service layers
├── components/     # Reusable UI components (auth, layout, modals, walls, memories)
├── constants/      # App-wide constants
├── contexts/       # React contexts (Auth, Theme, Toast)
├── hooks/          # Custom hooks (useAuth, useWalls, useMemories, etc.)
├── pages/          # Route-level page components
├── types/          # TypeScript type definitions
└── utils/          # Helpers (validation, formatting, error handling)
```

## Getting Started

```bash
npm install
npm run dev
```

Requires a running backend API. Set the `VITE_API_URL` environment variable in a `.env` file.
