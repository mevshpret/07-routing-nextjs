# NoteHub — Advanced Routing (Next.js App Router)

## 📌 Description
A Next.js (App Router) application focused on advanced routing patterns.
The project demonstrates parallel routes, catch-all routes, intercepted routes for modals, and proper handling of not-found pages, while working with server-side and client-side rendering.

## 🚀 Demo
https://07-routing-nextjs-wzfs.vercel.app/

## 🛠 Tech Stack
- Next.js (App Router)
- TypeScript
- React
- CSS Modules
- Axios
- TanStack Query (React Query)
- Prettier

## 🧭 Routing Features

### ❌ Not Found Page
- Implemented a custom `not-found.tsx` page
- Displays a user-friendly 404 message for non-existing routes

### 🔀 Parallel Routes for Notes Filtering
- Implemented parallel routes using `@sidebar`
- Sidebar allows filtering notes by predefined tags
- URL updates dynamically (`/notes/filter/{tag}`)
- Content updates without full page reload
- Special handling for `All notes` (no tag parameter sent to API)

### 📂 Catch-All Routes
- Used catch-all routing for dynamic note filtering
- Supports routes like:
  - `/notes/filter/all`
  - `/notes/filter/Work`
  - `/notes/filter/Personal`

## 🪟 Modal Routes (Intercepted Routes)
- Implemented modal preview for note details using intercepted routes
- Opening `/notes/{id}` shows a modal instead of full page navigation
- Background page remains visible and does not reload
- Closing the modal returns the user to the previous route

## ⚙️ API Integration
- Data fetching implemented via Axios
- API logic separated into `lib/api`
- Client-side state and requests managed with TanStack Query

## 👤 My Contribution
- Implemented advanced routing with App Router
- Built parallel routes for tag-based filtering
- Implemented intercepted routes for modal note preview
- Added custom Not Found page
- Integrated API requests with Axios and React Query
- Ensured SSR and CSR behavior according to requirements
- Deployed the application to Vercel

## 📦 Deployment
The project is deployed on Vercel.
