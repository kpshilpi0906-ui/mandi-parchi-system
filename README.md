# Mandi Parchi System

Complete Mandi Parchi Management System with 3 entry modules and 4 comprehensive reports.

## Features

### Entry Modules
- **Dalal Parchi** - Track bags, rates, and auto-calculate amounts
- **Toll Parchi** - Manage 50kg bags, loose kg with quintal calculations
- **Bardana** - Monitor bardana taken, deposits, and actual bags

### Reports
- **Dalal Report** - Daily summary with totals
- **Toll Report** - Comprehensive toll data analysis
- **Bardana Report** - Bardana tracking and totals
- **Daily Summary** - All three reports in one view

### Key Features
✅ Auto-calculations for all formulas
✅ Excel-like table interface
✅ PDF export for all reports
✅ Share functionality
✅ Mobile-responsive design
✅ PWA support (installable on mobile)
✅ Party name click navigation (Dalal → Toll)

## Setup Instructions

### 1. Database Setup (Supabase)

Create a Supabase project and run these SQL commands:

```sql
-- Dalal Parchi Table
CREATE TABLE dalal_parchi (
  id BIGSERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  party_name TEXT NOT NULL,
  no_of_bags NUMERIC NOT NULL,
  rate NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Toll Parchi Table
CREATE TABLE toll_parchi (
  id BIGSERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  party_name TEXT NOT NULL,
  bags_50kg NUMERIC NOT NULL,
  loose_kg NUMERIC NOT NULL,
  total_kg NUMERIC NOT NULL,
  quintal NUMERIC NOT NULL,
  rate NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bardana Table
CREATE TABLE bardana (
  id BIGSERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  party_name TEXT NOT NULL,
  bags INTEGER NOT NULL,
  bardana_taken INTEGER NOT NULL,
  deposit INTEGER NOT NULL,
  actual_bags INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_dalal_date ON dalal_parchi(date);
CREATE INDEX idx_toll_date ON toll_parchi(date);
CREATE INDEX idx_bardana_date ON bardana(date);
```

### 2. Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## Formulas Implemented

### Dalal Parchi
```
amount = no_of_bags * rate
```

### Toll Parchi
```
total_kg = (bags_50kg * 50) + loose_kg
quintal = total_kg / 100
amount = quintal * rate
```

### Bardana
```
actual_bags = bardana_taken - deposit
```

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **PDF Export**: jsPDF + jsPDF-AutoTable
- **Deployment**: Vercel
- **PWA**: Installable on mobile devices

## Mobile Installation

### Android/iOS
1. Open the app in your mobile browser
2. Tap the "Add to Home Screen" option
3. The app will install like a native app

## License

MIT
