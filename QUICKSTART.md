# 🚀 Quick Start Guide - Mandi Parchi System

## ⚡ 5-Minute Setup

### 1️⃣ Setup Database (2 minutes)

**Go to Supabase:**
1. Visit [supabase.com](https://supabase.com) → Sign up/Login
2. Create New Project → Wait for it to initialize
3. Go to **SQL Editor** → New Query
4. Copy & paste from `database/setup.sql` → Run
5. Go to **Settings** → **API** → Copy:
   - Project URL
   - anon public key

### 2️⃣ Deploy to Vercel (3 minutes)

**Go to Vercel:**
1. Visit [vercel.com](https://vercel.com) → Sign up/Login with GitHub
2. Click **Add New** → **Project**
3. Import `kpshilpi0906-ui/mandi-parchi-system`
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = [paste your Supabase URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [paste your anon key]
   ```
5. Click **Deploy** → Wait 2-3 minutes

### 3️⃣ Done! 🎉

Your app is live at: `https://your-project.vercel.app`

---

## 📱 Install on Mobile

**Android (Chrome):**
- Open app URL → Menu (⋮) → Add to Home screen

**iOS (Safari):**
- Open app URL → Share (□↑) → Add to Home Screen

---

## 🎯 What You Get

✅ **3 Entry Forms:**
- Dalal Parchi (bags × rate = amount)
- Toll Parchi (50kg bags + loose kg → quintal → amount)
- Bardana (bardana taken - deposit = actual bags)

✅ **4 Reports:**
- Dalal Report (daily totals)
- Toll Report (daily totals)
- Bardana Report (daily totals)
- Daily Summary (all 3 reports together)

✅ **Features:**
- Auto-calculations
- PDF export
- Share reports
- Excel-like tables
- Mobile responsive
- PWA installable

---

## 🔗 Important Links

- **GitHub Repo**: https://github.com/kpshilpi0906-ui/mandi-parchi-system
- **Full Deployment Guide**: See `DEPLOYMENT.md`
- **Database Setup**: See `database/setup.sql`

---

## ❓ Need Help?

Check `DEPLOYMENT.md` for detailed instructions and troubleshooting!
