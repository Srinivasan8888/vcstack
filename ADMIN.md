# Admin Panel

## Login

Go to: **http://localhost:3000/admin/login**

| Field    | Value               |
|----------|---------------------|
| Email    | `admin@vcstack.io`  |
| Password | `admin123`          |

These credentials come from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`.  
In dev mode (no database connected), the app uses these as a direct fallback — no DB required.

---

## Admin Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Login page |
| `/admin/dashboard` | Overview — total tools, categories, pending submissions |
| `/admin/tools` | Browse and manage all tools in the directory |
| `/admin/categories` | View all categories with tool counts |
| `/admin/submissions` | Review user-submitted tools (Approve / Reject) |

---

## How Auth Works

Authentication uses **NextAuth.js** with a credentials provider.

**Dev mode (no DB):** The app catches the Prisma connection error and falls back to checking `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env` directly. No database setup needed.

**Production mode (with DB):** Users are looked up in the `User` table. Only accounts with `role = "ADMIN"` can log in. Passwords are stored as SHA-256 hashes.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
# Required for NextAuth sessions
NEXTAUTH_SECRET="generate-a-strong-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Admin credentials (dev fallback when no DB)
ADMIN_EMAIL="admin@vcstack.io"
ADMIN_PASSWORD="admin123"
```

Generate a production secret with:
```bash
openssl rand -base64 32
```

---

## Changing the Admin Password

**Dev (no DB):** Change `ADMIN_PASSWORD` in `.env` and restart the dev server.

**Production (with DB):** Generate a SHA-256 hash of your new password and update the `passwordHash` field in the `User` table:

```bash
echo -n "your-new-password" | shasum -a 256
```
