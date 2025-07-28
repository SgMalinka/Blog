# Blogs – Next.js + Firebase Blogging Platform

A modern blogging platform built with Next.js, React, Redux Toolkit, and Firebase.
Features real-time posts, comments, authentication, and a clean, modular architecture.

## Features

- 🔥 **Firebase**: Real-time Firestore for posts and comments, Auth for user management.
- ⚛️ **React + Next.js**: SSR, file-based routing, and modern React features.
- 🗃️ **Redux Toolkit**: State management for posts, users, and comments.
- 💬 **Comments**: Add and view comments in real time.
- 📝 **CRUD**: Create, update, and delete posts (with author permissions).
- 🧪 **Jest + RTL**: Unit tests for components, store, and utilities.

## Getting Started

### 1. Clone & Install

```sh
git clone https://github.com/your-username/Blog.git
cd blogs
pnpm install
```

### 2. Configure Firebase

Create a `.env.local` file in the root with your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 3. Run the App

```sh
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 4. Run Tests

```sh
pnpm test
```

---

## Project Structure

```
src/
  app/                # Next.js app directory (pages, layouts, API routes)
  components/         # Reusable React components (Posts, BlogHeader, ModalWindow, etc.)
  store/              # Redux slices and store setup
  core/               # Firebase, utilities, constants, enums, types
  hooks/              # Custom React hooks
  styles/             # SCSS styles and variables
```

---

## Main Components & Modules

### Components

- **BlogHeader**: Header with "Create Post" modal trigger.
- **Posts**: Lists all blog posts, real-time updates.
- **Details**: Shows a single post summary.
- **ModalWindow**: Create/update post modal.
- **Comments**: Add a comment to a post.
- **DeletePost / UpdatePost**: Author-only post actions.

### Store

- **postSlice**: Handles posts, comments, async CRUD with Firestore.
- **userSlice**: Handles user authentication state.

### Utilities

- **getTimeAgo**: Formats timestamps as "X minutes/hours/days ago".
- **fetchPostsServer**: Fetches posts from Firestore (SSR).

---

## Testing

- Uses **Jest** and **React Testing Library**.
- Mocks Firebase and Redux for fast, isolated tests.
- Run all tests: `pnpm test`

---

## License

MIT
