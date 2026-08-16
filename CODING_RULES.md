# Codebase & Developer Rules

This document defines the architectural conventions, state management rules, backend patterns, and coding standards for this repository.

---

## 1. Technology Stack Overview

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 18 + Inertia.js
- **Styling**: Tailwind CSS + Flowbite React
- **Build Tool**: Vite

---

## 2. Directory Structure & Organization

```
resources/js/
├── Components/       # Reusable UI components (Form, Modal, Buttons, UI)
├── Layouts/          # Page wrappers (GuestLayout, DashboardLayout)
├── Pages/            # Inertia views (Auth, Welcome, Dashboard, Users, etc.)
└── utils/            # Helper functions and constants
```

---

## 3. Frontend Development Rules

### Inertia.js & React Conventions
- **Form Handling**:
  - Always use Inertia's `useForm` hook for handling user inputs and submission state (`data`, `setData`, `post`, `put`, `delete`, `processing`, `errors`, `reset`).
  - Implement `onFinish` callbacks to clean up sensitive fields (e.g. password fields).
- **Page Props**:
  - Access global auth state via `usePage().props.auth.user`.
  - Access flash notifications via `usePage().props.flash`.
- **Iconography**:
  - Import icons exclusively from `react-icons/hi` (Heroicons).
- **Dark Mode Support**:
  - Include responsive dark mode utility classes (`dark:bg-slate-900`, `dark:text-white`, `dark:border-slate-800`).

---

## 4. Backend Development Rules

### Laravel Standards
- **Controllers & Inertia Response**:
  - Return Inertia render calls: `return Inertia::render('Path/To/Page', [ 'prop' => $data ]);`.
- **Validation**:
  - Use dedicated Form Request classes (`StoreUserRequest`, `UpdateUserRequest`) for request validation.
- **Database & Models**:
  - Table and column names must be `snake_case`.
  - Models must define `$fillable` attributes and clear Eloquent relationships.

---

## 5. Build & Quality Assurance Workflow

- **Production Asset Compilation**:
  - Always run `npm run build` after making modifications to React components or CSS files to ensure build integrity and verify zero bundling errors.
- **Code Consistency**:
  - Preserve existing comments and docstrings.
  - Do not introduce breaking changes to component prop signatures without updating dependent pages.
