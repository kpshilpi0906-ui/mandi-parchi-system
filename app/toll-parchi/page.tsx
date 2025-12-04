'use client'

import { useState, useEffect } from 'react'
import { supabase, TollParchi } from '@/lib/supabase'
import { calculateTollTotalKg, calculateTollQuintal, calculateTollAmount } from '@/lib/calculations'
import { useSearchParams } from 'next/navigation'

export default function TollParchiPage() {
  const searchParams = useSearchParams()
  const prefilledParty = searchParams.get('party') || ''

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    party_name: prefilledParty,
    bags_50kg: 0,
    loose_kg: 0,
    rate: 0,
  })
  const [entries, setEntries] = useState<TollParchi[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('toll_parchi')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setEntries(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const total_kg = calculateTollTotalKg(formData.bags_50kg, formData.loose_kg)
    const quintal = calculateTollQuintal(total_kg)
    const amount = calculateTollAmount(quintal, formData.rate)

    const { error } = await supabase
      .from('toll_parchi')
      .insert([{ ...formData, total_kg, quintal, amount }])

    if (!error) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        party_name: '',
        bags_50kg: 0,
        loose_kg: 0,
        rate: 0,
      })
      fetchEntries()
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      await supabase.from('toll_parchi').delete().eq('id', id)
      fetchEntries()
    }
  }

  const totalKg = calculateTollTotalKg(formData.bags_50kg, formData.loose_kg)
  const quintal = calculateTollQuintal(totalKg)
  const amount = calculateTollAmount(quintal, formData.rate)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Toll Parchi</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Entry</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label">Party Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.party_name}
              onChange={(e) => setFormData({ ...formData, party_name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label">50Kg Bags</label>
            <input
              type="number"
              className="form-input"
              value={formData.bags_50kg}
              onChange={(e) => setFormData({ ...formData, bags_50kg: parseFloat(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="form-label">Loose Kg</label>
            <input
              type="number"
              className="form-input"
              value={formData.loose_kg}
              onChange={(e) => setFormData({ ...formData, loose_kg: parseFloat(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="form-label">Rate</label>
            <input
              type="number"
              className="form-input"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="md:col-span-2">
            <div className="bg-gray-100 p-3 rounded space-y-1">
              <div><strong>Total Kg (Auto-calculated): </strong>{totalKg.toFixed(2)} kg</div>
              <div><strong>Quintal (Auto-calculated): </strong>{quintal.toFixed(2)}</div>
              <div><strong>Amount (Auto-calculated): </strong>₹{amount.toFixed(2)}</div>
            </div>
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">All Entries</h3>
        <table className="excel-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Party Name</th>
              <th>50Kg Bags</th>
              <th>Loose Kg</th>
              <th>Total Kg</th>
              <th>Quintal</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.party_name}</td>
                <td className="text-right">{entry.bags_50kg}</td>
                <td className="text-right">{entry.loose_kg}</td>
                <td className="text-right">{entry.total_kg.toFixed(2)}</td>
                <td className="text-right">{entry.quintal.toFixed(2)}</td>
                <td className="text-right">₹{entry.rate.toFixed(2)}</td>
                <td className="text-right">₹{entry.amount.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(entry.id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {entries.length === 0 && (
          <p className="text-center text-gray-500 py-4">No entries yet</p>
        )}
      </div>
    </div>
  )
}
