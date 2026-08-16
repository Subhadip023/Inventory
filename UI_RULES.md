# UI & Design System Rules

This document outlines the strict UI design rules and standards for the application. All front-end components and pages must adhere to these guidelines to ensure design consistency across the platform.

---

## 1. Layout Architecture & Structure

- **Authentication & Guest Pages**:
  - Must use `GuestLayout` (`@/Layouts/GuestLayout`).
  - Follow the **50/50 split-screen layout**:
    - **Left Section (Desktop)**: Brand banner with `bg-mainColor`, containing the store illustration centered.
    - **Right Section**: Content container centered with `w-full max-w-md`.
- **Dashboard Pages**:
  - Must use standardized dashboard layouts (`DashboardLayout`).

---

## 2. Color Palette & Branding

- **Primary Color**: `mainColor` (`#119ABF`).
- **Utility Classes**:
  - Primary Background: `bg-mainColor`
  - Primary Text: `text-mainColor`
  - Primary Border: `border-mainColor`
- **Hover & Active States**:
  - Primary Buttons: `hover:opacity-95 active:scale-[0.99]` or `hover:bg-[#0E8AA9]`.
  - Secondary Buttons / Links: `hover:text-mainColor` or `hover:bg-mainColor hover:text-white`.

---

## 3. Typography & Headers

- **Page Titles**:
  - `text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white`
  - Highlight app name: `<span className="text-mainColor">{appName}</span>`
- **Subtitles & Descriptions**:
  - `text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed`
- **Form Input Labels**:
  - `font-medium text-sm text-gray-700 dark:text-gray-300`
- **Sub-headers & Badges**:
  - `text-xs font-semibold uppercase tracking-wider text-gray-400`

---

## 4. Forms & Input Fields

- **Component Usage**:
  - Always use standardized components from `@/Components/Form`:
    - `TextInput`
    - `PasswordInput`
    - `Checkbox`
    - `InputLabel`
    - `InputError`
- **Spacing & Layout**:
  - Form spacing: `space-y-5`
  - Label margin bottom: `mt-1.5`
  - Error message margin top: `mt-1.5`
  - Input text size: `text-sm`

---

## 5. Buttons & Interactive Elements

- **Button Sizing & Shape**:
  - Border radius: `rounded-lg` (or `rounded-md` when requested).
  - Padding: `py-3 px-4` for full width buttons.
  - Font: `font-semibold text-sm`.
- **Primary Button Style**:
  - `w-full py-3 px-4 bg-mainColor hover:opacity-95 active:scale-[0.99] text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`
- **Secondary / Outline Button Style**:
  - `w-full py-3 px-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-center font-semibold text-sm rounded-lg transition-all cursor-pointer`

---

## 6. Navigation & Back Links

- **Top Navigation Back Link**:
  ```jsx
  <Link
      href="/"
      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-mainColor transition-colors gap-1.5 mb-6"
  >
      <HiArrowLeft className="w-4 h-4" />
      Back to home
  </Link>
  ```
- **Inline Action Links**:
  - `font-semibold text-mainColor hover:underline`
