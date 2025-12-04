'use client'

import { useState, useEffect } from 'react'
import { supabase, DalalParchi } from '@/lib/supabase'
import { calculateDalalAmount } from '@/lib/calculations'
import { useRouter } from 'next/navigation'

export default function DalalParchiPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    party_name: '',
    no_of_bags: 0,
    rate: 0,
  })
  const [entries, setEntries] = useState<DalalParchi[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('dalal_parchi')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setEntries(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const amount = calculateDalalAmount(formData.no_of_bags, formData.rate)

    const { error } = await supabase
      .from('dalal_parchi')
      .insert([{ ...formData, amount }])

    if (!error) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        party_name: '',
        no_of_bags: 0,
        rate: 0,
      })
      fetchEntries()
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      await supabase.from('dalal_parchi').delete().eq('id', id)
      fetchEntries()
    }
  }

  const handlePartyClick = (partyName: string) => {
    router.push(`/toll-parchi?party=${encodeURIComponent(partyName)}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dalal Parchi</h2>

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
            <label className="form-label">No of Bags</label>
            <input
              type="number"
              className="form-input"
              value={formData.no_of_bags}
              onChange={(e) => setFormData({ ...formData, no_of_bags: parseFloat(e.target.value) })}
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
            <div className="bg-gray-100 p-3 rounded">
              <strong>Amount (Auto-calculated): </strong>
              ₹{calculateDalalAmount(formData.no_of_bags, formData.rate).toFixed(2)}
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
              <th>No of Bags</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>
                  <button
                    onClick={() => handlePartyClick(entry.party_name)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {entry.party_name}
                  </button>
                </td>
                <td className="text-right">{entry.no_of_bags}</td>
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
