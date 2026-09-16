# 🎨 Bộ Prompt AI Tạo Giao Diện UI/UX Cho Dự Án DevPulse

Tài liệu này tổng hợp các **Prompt chuẩn chỉnh** được tối ưu hóa cho các công cụ AI tạo giao diện (như **v0.dev**, **Claude 3.5 Sonnet (Artifacts)**, **Bolt.new**, **Cursor / Copilot**, **ChatGPT**, **Figma AI**, **Uizard**) để tạo ra toàn bộ hệ thống giao diện và component kết nối với DevPulse API.

---

## 📌 Tổng Quan Dự Án & Design System

- **Tên dự án**: **DevPulse** – Nền tảng chia sẻ, tìm kiếm và bình chọn tài nguyên lập trình (Developer Resource Hub).
- **Tech Stack gợi ý cho FE**: React / Next.js (App Router), Tailwind CSS, Lucide Icons, Shadcn UI / Radix UI, Framer Motion, Axios / TanStack Query.
- **Tone & Mood**: Hiện đại, đậm chất Developer (Clean, Minimalist, Tech-oriented), hỗ trợ cả **Dark Mode** (chủ đạo) và **Light Mode**.
- **Bảng màu gợi ý**:
  - `Background Dark`: `#090D16` / `#0F172A` (Slate 900)
  - `Surface / Card Dark`: `#1E293B` (Slate 800) với border `#334155`
  - `Primary Accent`: Electric Indigo / Cyan (`#6366F1` / `#06B6D4`)
  - `Category Badges`:
    - **Frontend**: Amber/Yellow (`#F59E0B`)
    - **Backend**: Emerald/Green (`#10B981`)
    - **DevOps**: Blue (`#3B82F6`)
    - **AI**: Purple/Pink (`#A855F7`)
    - **Mobile**: Rose (`#F43F5E`)
    - **UI/UX**: Cyan/Teal (`#14B8A6`)

---

## 🚀 1. Master Prompt (Dùng Cho v0.dev / Bolt.new / Claude Artifacts)

> 💡 *Copy toàn bộ prompt dưới đây dán vào v0.dev hoặc Claude để AI sinh mã nguồn component full-page hoàn chỉnh.*

```text
Act as a Senior Frontend & UI/UX Engineer. Create a modern, responsive, and developer-centric Web Application for "DevPulse" (A developer resource sharing and discovery platform) using React (Next.js App Router or Vite), Tailwind CSS, Lucide React icons, and Framer Motion.

The app must connect to the following REST API endpoints:
- GET /api/resources?search={query}&category={category}&tags={tags}&sort={sort}
- POST /api/resources (Create new resource: title, url, category, tags[], summary)
- PUT /api/resources/:id (Update resource)
- DELETE /api/resources/:id (Delete resource)
- PATCH /api/resources/:id/upvote (Increment upvotes)

Key Requirements & UI Components to build:

1. Navigation Bar (Header):
   - Logo: "DevPulse" with pulse/code icon and subtle glowing gradient.
   - Global search input with keyboard shortcut tooltip (Ctrl + K / Cmd + K).
   - "Add Resource" CTA button (opens modal).
   - Dark/Light mode toggle switch.
   - GitHub icon link and user profile/placeholder avatar.

2. Hero Section:
   - Catchy developer headline: "Curated developer resources, tools & libraries voted by the community".
   - Search bar with instant autocomplete / submit.
   - Popular trending tag chips: #react, #docker, #tailwind, #ai, #nodejs, #typescript.

3. Filter & Toolbar:
   - Category Tabs/Pills: "All", "Frontend", "Backend", "DevOps", "AI", "Mobile", "UI/UX" (with icons and active highlight).
   - Sort dropdown: "Latest" and "Most Upvoted".
   - Tag filter chips with clear/remove button.

4. Resource Grid & Cards:
   - Responsive masonry/grid layout (1 col mobile, 2 col tablet, 3 col desktop).
   - Resource Card features:
     * Category badge with distinct theme color.
     * Title (clickable external link with external-link icon).
     * Concise summary/description (clamped to 2-3 lines).
     * Tag pills (clickable to filter by tag).
     * Upvote button with glowing count, heart/arrow-up icon, and click bounce animation.
     * Quick action menu: Copy Link, Edit, Delete (with confirm dialog).
     * Relative creation date (e.g., "2 hours ago").

5. Create & Edit Resource Modal:
   - Form fields:
     * Title (required, 3-100 chars, real-time counter).
     * URL (required, valid URL validation).
     * Category dropdown (Frontend, Backend, DevOps, AI, Mobile, UI/UX).
     * Tags input (badge-style input: press Enter/Comma to add tag, max 5 tags, no special chars).
     * Summary textarea (optional, max 300 chars with counter).
   - Form validation with error message highlights.
   - Submit and Cancel buttons with loading state indicator.

6. States & Polish:
   - Skeleton loading cards when fetching data.
   - Empty state illustration when no resources match search/filter.
   - Toast notifications for: Resource added, Upvoted, Link copied, Deleted, and API errors.
   - Modern glassmorphism, subtle borders, sleek hover transitions, and clean typography.
```

---

## 🧩 2. Prompt Chi Tiết Từng Component (Modular Prompts)

### 2.1. Navigation Header & Search Bar
```text
Prompt:
Build a sticky top navigation bar component for DevPulse in React + Tailwind CSS.
Features:
- Left: DevPulse logo with an animated pulse dot & code icon.
- Center: Sleek floating Search input with a search icon, clear button, and '⌘K' shortcut badge.
- Right:
  - 'Add Resource' button with a '+' icon and gradient background.
  - Theme toggle (Sun / Moon) with smooth switch transition.
  - Github repository button with live star badge placeholder.
- Styling: Backdrop-blur glassmorphism background (bg-slate-900/80 dark:border-b dark:border-slate-800).
```

### 2.2. Category Filter & Sorting Toolbar
```text
Prompt:
Create an interactive Filter & Sort Toolbar component for DevPulse using React, Tailwind CSS, and Lucide React.
Requirements:
- Horizontal scrollable pill list of categories: All, Frontend, Backend, DevOps, AI, Mobile, UI/UX.
- Each category pill must have an appropriate icon (e.g., Monitor for Frontend, Server for Backend, Cloud for DevOps, Sparkles for AI, Smartphone for Mobile, Palette for UI/UX).
- Sort dropdown with options: "🔥 Most Upvoted" and "🕒 Latest".
- Active tag filters display area with a "Clear all" button.
- Smooth active pill animation with Framer Motion layoutId.
```

### 2.3. Resource Card (Component Trọng Tâm)
```text
Prompt:
Design a modern Developer Resource Card component in React with Tailwind CSS and Framer Motion.
Component Props:
- id: string
- title: string
- url: string
- category: "Frontend" | "Backend" | "DevOps" | "AI" | "Mobile" | "UI/UX"
- tags: string[]
- summary?: string
- upvotes: number
- createdAt: string
- onUpvote: (id) => void
- onEdit: (id) => void
- onDelete: (id) => void
- onTagClick: (tag) => void

Card UI Specs:
- Dark theme card background (#1E293B) with subtle border (#334155) and hover hover:border-indigo-500/50 hover:shadow-lg transition.
- Top: Category badge (colored pill) and dropdown action menu (Edit, Delete, Copy Link).
- Middle: Title in bold text with external link icon; 2-line summary in muted text.
- Bottom:
  - Tag chips (clickable).
  - Left-bottom: Relative timestamp (e.g. '3 days ago').
  - Right-bottom: Upvote button showing arrow-up icon + upvote counter with interactive scale animation on click.
```

### 2.4. Modal Tạo / Chỉnh Sửa Resource (Form & Validation)
```text
Prompt:
Create an 'Add / Edit Resource Modal' component with Tailwind CSS, React Hook Form / Zod, and Radix Dialog.
Validation rules:
- Title: required, string, min 3 chars, max 100 chars.
- URL: required, valid URL format.
- Category: select enum ('Frontend', 'Backend', 'DevOps', 'AI', 'Mobile', 'UI/UX').
- Tags: multi-input tags (convert to lowercase, strip special chars, min 1, max 5 tags). Allow pressing Enter or Comma to chip a tag.
- Summary: optional, textarea max 300 chars with live countdown.
States:
- Dynamic title: "Add New Resource" or "Edit Resource".
- Loading spinner on submit button.
- Error alerts with clean red badge formatting.
```

### 2.5. Empty State & Skeleton Loading State
```text
Prompt:
Create two components in React + Tailwind CSS:
1. ResourceSkeletonGrid: Displays 6 animated skeleton pulse cards mimicking the layout of the Resource Card (badges, title bars, tags, and upvote button placeholders).
2. EmptyState: Displays an illustration/icon (SearchX or Sparkles), a heading "No resources found", a description "Try adjusting your search or filters, or be the first to share one!", and a CTA button "Add Resource".
```

---

## 🎨 3. Prompt Cho AI Thiết Kế Giao Diện (Figma AI / Uizard / Midjourney)

### 3.1. Prompt Figma AI / Uizard (Wireframe & UI Design)
```text
Create a modern Web App UI for a developer resource directory named "DevPulse". 
Dark mode aesthetic inspired by Vercel, Linear, and GitHub.
Pages/Sections:
- Hero banner with dark gradient background, glowing mesh accents, and a prominent search bar.
- Category navigation bar with pill buttons for Frontend, Backend, DevOps, AI, Mobile, UI/UX.
- 3-column responsive card grid displaying tech resource cards with category tags, upvote counters, and external link indicators.
- Floating modal for submitting new developer tools and tutorials.
- High contrast, monospace fonts for tags, sleek minimalist icons, and electric blue/indigo accents.
```

### 3.2. Prompt Midjourney / DALL-E (Hero Background Illustration)
```text
Clean modern UI mockup of a developer resource discovery dashboard, dark mode theme with glowing neon indigo and cyan cybernetic accents, sleek floating cards, minimalist code symbols, modern glassmorphism, UI/UX web design showcase, dribbble, behance, 8k resolution, photorealistic rendering --ar 16:9
```

---

## ⚡ 4. Gợi Ý Các Bước Triển Khai Cho Frontend Dev

1. **Dán Master Prompt** vào [v0.dev](https://v0.dev) hoặc Claude Artifacts để nhận toàn bộ code component UI.
2. Cài đặt các thư viện bổ trợ:
   ```bash
   npm install lucide-react clsx tailwind-merge framer-motion axios
   ```
3. Tạo file gọi API dựa theo tài liệu `API_DOCUMENTATION.md`.
4. Kết nối state giữa UI Filter/Search và hàm gọi `GET /api/resources`.
