-- Sample Data for Testing Mandi Parchi System
-- Run this AFTER setup.sql to populate with test data

-- Sample Dalal Parchi entries
INSERT INTO dalal_parchi (date, party_name, no_of_bags, rate, amount) VALUES
('2025-12-04', 'Ram Traders', 100, 50, 5000),
('2025-12-04', 'Shyam Enterprises', 150, 48, 7200),
('2025-12-04', 'Krishna Suppliers', 80, 52, 4160),
('2025-12-03', 'Ram Traders', 120, 50, 6000),
('2025-12-03', 'Gopal & Sons', 90, 49, 4410);

-- Sample Toll Parchi entries
INSERT INTO toll_parchi (date, party_name, bags_50kg, loose_kg, total_kg, quintal, rate, amount) VALUES
('2025-12-04', 'Ram Traders', 20, 25, 1025, 10.25, 500, 5125),
('2025-12-04', 'Shyam Enterprises', 30, 15, 1515, 15.15, 480, 7272),
('2025-12-04', 'Krishna Suppliers', 15, 30, 780, 7.80, 520, 4056),
('2025-12-03', 'Ram Traders', 25, 20, 1270, 12.70, 500, 6350),
('2025-12-03', 'Gopal & Sons', 18, 10, 910, 9.10, 490, 4459);

-- Sample Bardana entries
INSERT INTO bardana (date, party_name, bags, bardana_taken, deposit, actual_bags) VALUES
('2025-12-04', 'Ram Traders', 100, 120, 20, 100),
('2025-12-04', 'Shyam Enterprises', 150, 160, 10, 150),
('2025-12-04', 'Krishna Suppliers', 80, 95, 15, 80),
('2025-12-03', 'Ram Traders', 120, 135, 15, 120),
('2025-12-03', 'Gopal & Sons', 90, 100, 10, 90);

-- Verify data inserted
SELECT 'Dalal Parchi' as table_name, COUNT(*) as record_count FROM dalal_parchi
UNION ALL
SELECT 'Toll Parchi', COUNT(*) FROM toll_parchi
UNION ALL
SELECT 'Bardana', COUNT(*) FROM bardana;

-- Show today's summary
SELECT 
  'Today: ' || CURRENT_DATE as info,
  (SELECT COUNT(*) FROM dalal_parchi WHERE date = CURRENT_DATE::TEXT) as dalal_entries,
  (SELECT COUNT(*) FROM toll_parchi WHERE date = CURRENT_DATE::TEXT) as toll_entries,
  (SELECT COUNT(*) FROM bardana WHERE date = CURRENT_DATE::TEXT) as bardana_entries;
