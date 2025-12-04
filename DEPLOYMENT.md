# Deployment Guide - Mandi Parchi System

## 🚀 Quick Deployment Steps

### Step 1: Setup Supabase Database

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and set project name
   - Set a strong database password
   - Select region closest to you
   - Wait for project to be ready (~2 minutes)

2. **Run Database Setup**
   - In your Supabase dashboard, go to **SQL Editor**
   - Click "New Query"
   - Copy the entire content from `database/setup.sql`
   - Paste and click "Run"
   - Verify: You should see 3 tables created

3. **Get API Credentials**
   - Go to **Project Settings** → **API**
   - Copy these two values:
     - `Project URL` (looks like: https://xxxxx.supabase.co)
     - `anon public` key (long string starting with eyJ...)

---

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub** (Already done! ✅)
   - Repository: `kpshilpi0906-ui/mandi-parchi-system`

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import `kpshilpi0906-ui/mandi-parchi-system`
   - Click "Import"

3. **Configure Environment Variables**
   - Before deploying, add these environment variables:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   - Paste the values you copied from Supabase

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live! 🎉

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

---

### Step 3: Access Your App

After deployment, you'll get:
- **Web URL**: `https://mandi-parchi-system.vercel.app` (or similar)
- **Mobile**: Open URL on phone → Add to Home Screen

---

## 📱 Mobile Installation (PWA)

### Android
1. Open the deployed URL in Chrome
2. Tap the menu (⋮) → "Add to Home screen"
3. Tap "Add"
4. App icon appears on home screen

### iOS
1. Open the deployed URL in Safari
2. Tap the Share button (□↑)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"
5. App icon appears on home screen

---

## 🔧 Post-Deployment Configuration

### Update Environment Variables (if needed)
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Update values
5. Redeploy from **Deployments** tab

### Custom Domain (Optional)
1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Home page loads correctly
- [ ] All navigation tabs work
- [ ] Dalal Parchi form submits and displays data
- [ ] Toll Parchi form submits and displays data
- [ ] Bardana form submits and displays data
- [ ] Dalal Report shows data for selected date
- [ ] Toll Report shows data for selected date
- [ ] Bardana Report shows data for selected date
- [ ] Daily Summary shows all three reports
- [ ] PDF export works on all reports
- [ ] Share functionality works
- [ ] Party name click navigation (Dalal → Toll) works
- [ ] Mobile responsive design works
- [ ] PWA installation works on mobile

---

## 🐛 Troubleshooting

### "Failed to fetch" errors
- Check environment variables are set correctly
- Verify Supabase URL and key are correct
- Check Supabase project is active

### Tables not found
- Run the SQL setup script again
- Verify tables exist in Supabase Table Editor

### Build fails on Vercel
- Check all dependencies in package.json
- Verify no TypeScript errors locally
- Check build logs in Vercel dashboard

### PDF export not working
- This is a client-side feature, should work automatically
- Check browser console for errors

---

## 📊 Database Backup (Recommended)

### Manual Backup
1. Supabase Dashboard → **Database** → **Backups**
2. Enable daily backups
3. Download backup when needed

### Export Data
```sql
-- Export to CSV from Supabase SQL Editor
COPY dalal_parchi TO '/tmp/dalal_backup.csv' CSV HEADER;
COPY toll_parchi TO '/tmp/toll_backup.csv' CSV HEADER;
COPY bardana TO '/tmp/bardana_backup.csv' CSV HEADER;
```

---

## 🎯 Next Steps

1. **Test the app** with sample data
2. **Share the URL** with your team
3. **Install on mobile** devices
4. **Set up regular backups**
5. **Monitor usage** in Vercel Analytics

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Check Supabase logs
4. Verify environment variables

---

## 🎉 You're All Set!

Your Mandi Parchi System is now:
- ✅ Deployed and accessible worldwide
- ✅ Mobile-friendly and installable
- ✅ Connected to a secure database
- ✅ Ready for production use

**Deployment URL**: Check your Vercel dashboard for the live URL!
