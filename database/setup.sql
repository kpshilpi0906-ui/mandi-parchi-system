-- Mandi Parchi System Database Setup
-- Run this SQL in your Supabase SQL Editor

-- 1. Dalal Parchi Table
CREATE TABLE IF NOT EXISTS dalal_parchi (
  id BIGSERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  party_name TEXT NOT NULL,
  no_of_bags NUMERIC NOT NULL,
  rate NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Toll Parchi Table
CREATE TABLE IF NOT EXISTS toll_parchi (
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

-- 3. Bardana Table
CREATE TABLE IF NOT EXISTS bardana (
  id BIGSERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  party_name TEXT NOT NULL,
  bags INTEGER NOT NULL,
  bardana_taken INTEGER NOT NULL,
  deposit INTEGER NOT NULL,
  actual_bags INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_dalal_date ON dalal_parchi(date);
CREATE INDEX IF NOT EXISTS idx_dalal_party ON dalal_parchi(party_name);
CREATE INDEX IF NOT EXISTS idx_toll_date ON toll_parchi(date);
CREATE INDEX IF NOT EXISTS idx_toll_party ON toll_parchi(party_name);
CREATE INDEX IF NOT EXISTS idx_bardana_date ON bardana(date);
CREATE INDEX IF NOT EXISTS idx_bardana_party ON bardana(party_name);

-- Enable Row Level Security (RLS)
ALTER TABLE dalal_parchi ENABLE ROW LEVEL SECURITY;
ALTER TABLE toll_parchi ENABLE ROW LEVEL SECURITY;
ALTER TABLE bardana ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (adjust based on your security needs)
CREATE POLICY "Enable all operations for dalal_parchi" ON dalal_parchi
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for toll_parchi" ON toll_parchi
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for bardana" ON bardana
  FOR ALL USING (true) WITH CHECK (true);

-- Verify tables created
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('dalal_parchi', 'toll_parchi', 'bardana')
ORDER BY table_name;
