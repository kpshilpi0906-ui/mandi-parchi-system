import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type DalalParchi = {
  id?: number
  date: string
  party_name: string
  no_of_bags: number
  rate: number
  amount: number
  created_at?: string
}

export type TollParchi = {
  id?: number
  date: string
  party_name: string
  bags_50kg: number
  loose_kg: number
  total_kg: number
  quintal: number
  rate: number
  amount: number
  created_at?: string
}

export type Bardana = {
  id?: number
  date: string
  party_name: string
  bags: number
  bardana_taken: number
  deposit: number
  actual_bags: number
  created_at?: string
}
