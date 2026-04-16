# VCStack — VC Tool Directory Clone

A full-stack clone of [vcstack.io](https://vcstack.io) — the largest directory of tools and resources for venture capital and angel investors. Built with Next.js 16, TailwindCSS v4, Prisma, and Clerk.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | TailwindCSS v4 |
| Auth | Clerk |
| Database | Prisma + SQLite (dev) / PostgreSQL (prod) |
| Language | TypeScript |
| Icons | Lucide React |

---

## Getting Started

### 1. Install dependencies

```bash
cd vcstack-clone
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env
```

Required variables:

```env
# Clerk (get from https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
DATABASE_URL="file:./dev.db"
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Setting Up Clerk (Admin Auth)

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com) and create a new application
2. Choose **Email + Password** as the sign-in method
3. Copy your **Publishable Key** and **Secret Key** from the API Keys page
4. Paste them into `.env`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
5. In your Clerk dashboard, create a user with your email/password — this becomes the admin account
6. Restart the dev server: `npm run dev`
7. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in

> **Note:** Clerk handles all auth — no hardcoded credentials needed. Any user you create in your Clerk dashboard can log in to the admin panel.

---

## Admin Panel

### Login

**URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Sign in with the email/password you created in the Clerk dashboard.

### Admin Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Clerk-powered sign-in page |
| `/admin/dashboard` | Overview stats — total tools, categories, pending submissions, reviews |
| `/admin/tools` | Browse and manage all tools in the directory |
| `/admin/categories` | View all categories with tool counts |
| `/admin/submissions` | Review user-submitted tools (Approve / Reject) |
| `/admin/reviews` | Manage user reviews |

All `/admin/*` routes (except `/admin/login`) are protected by Clerk middleware — unauthenticated users are redirected to the login page automatically.

---

## Project Structure

```
vcstack-clone/
├── src/
│   ├── app/
│   │   ├── (main)/               # Public-facing routes
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── category/[slug]/  # Category listing page
│   │   │   ├── product/[slug]/   # Tool detail page
│   │   │   ├── all-categories/   # All categories grid
│   │   │   ├── search/           # Search results
│   │   │   ├── submit-product/   # Submit a new tool
│   │   │   └── review/           # Write a review
│   │   ├── admin/                # Admin panel (Clerk-protected)
│   │   │   ├── login/            # Clerk SignIn component
│   │   │   ├── dashboard/        # Stats overview
│   │   │   ├── tools/            # Tool management
│   │   │   ├── categories/       # Category management
│   │   │   ├── submissions/      # Submission review
│   │   │   └── AdminSidebar.tsx  # Sidebar with UserButton
│   │   ├── layout.tsx            # Root layout (ClerkProvider)
│   │   └── globals.css
│   ├── components/
│   │   ├── cards/
│   │   │   ├── ToolCard.tsx      # Tool card (default + compact variants)
│   │   │   └── CategoryCard.tsx  # Category card with gradient fallback
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageLayout.tsx
│   │   └── ui/
│   │       ├── SearchBox.tsx
│   │       └── NewsletterForm.tsx
│   ├── lib/
│   │   ├── data.ts               # Data access layer (Prisma → static fallback)
│   │   ├── tools-data.ts         # Static tool catalog (~500 tools)
│   │   ├── types.ts              # TypeScript types
│   │   └── db/
│   │       └── prisma.ts         # Prisma client singleton
│   └── middleware.ts             # Clerk route protection
├── public/
│   └── images/
│       └── categories/           # Downloaded category header images
├── prisma/
│   └── schema.prisma             # Database schema
├── .env                          # Local environment variables
├── .env.example                  # Environment variable template
└── ADMIN.md                      # Detailed admin documentation
```

---

## Data Architecture

The app uses a **Prisma → static fallback** pattern:

1. On each request, it tries to fetch data from the database via Prisma
2. If Prisma fails (no DB connected), it falls back to the static `STATIC_TOOLS` and `STATIC_CATEGORIES` arrays in `src/lib/tools-data.ts`
3. This means the site works fully in dev without any database setup

The static catalog contains ~500 tools across 26 categories, sourced from the real vcstack.io.

---

## Category Images

Category header images are downloaded from the Webflow CDN and served locally:

```bash
cd ..  # back to VCstack.io root
python3 download_cat_images.py
```

Images are saved to `public/images/categories/`.

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key (from dashboard) |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key (from dashboard) |
| `DATABASE_URL` | No | Database URL (SQLite default, PostgreSQL for prod) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | No | Sign-in page path (default: `/admin/login`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | No | Redirect after login (default: `/admin/dashboard`) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

Deploy to Vercel in one click:

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in the Vercel dashboard
4. Set `DATABASE_URL` to a PostgreSQL connection string (e.g. Neon, Supabase)
5. Deploy

For the Clerk keys, copy them from your Clerk dashboard's **Production** instance (not the Development instance).
