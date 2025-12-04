'use client'

import { useState, useEffect } from 'react'
import { supabase, Bardana } from '@/lib/supabase'
import { calculateActualBags } from '@/lib/calculations'

export default function BardanaPage() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    party_name: '',
    bags: 0,
    bardana_taken: 0,
    deposit: 0,
  })
  const [entries, setEntries] = useState<Bardana[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('bardana')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setEntries(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const actual_bags = calculateActualBags(formData.bardana_taken, formData.deposit)

    const { error } = await supabase
      .from('bardana')
      .insert([{ ...formData, actual_bags }])

    if (!error) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        party_name: '',
        bags: 0,
        bardana_taken: 0,
        deposit: 0,
      })
      fetchEntries()
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      await supabase.from('bardana').delete().eq('id', id)
      fetchEntries()
    }
  }

  const actualBags = calculateActualBags(formData.bardana_taken, formData.deposit)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bardana</h2>

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
            <label className="form-label">Bags</label>
            <input
              type="number"
              className="form-input"
              value={formData.bags}
              onChange={(e) => setFormData({ ...formData, bags: parseFloat(e.target.value) })}
              required
              min="0"
              step="1"
            />
          </div>

          <div>
            <label className="form-label">Bardana Taken</label>
            <input
              type="number"
              className="form-input"
              value={formData.bardana_taken}
              onChange={(e) => setFormData({ ...formData, bardana_taken: parseFloat(e.target.value) })}
              required
              min="0"
              step="1"
            />
          </div>

          <div>
            <label className="form-label">Deposit</label>
            <input
              type="number"
              className="form-input"
              value={formData.deposit}
              onChange={(e) => setFormData({ ...formData, deposit: parseFloat(e.target.value) })}
              required
              min="0"
              step="1"
            />
          </div>

          <div className="md:col-span-2">
            <div className="bg-gray-100 p-3 rounded">
              <strong>Actual Bags (Auto-calculated): </strong>
              {actualBags}
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
              <th>Bags</th>
              <th>Bardana Taken</th>
              <th>Deposit</th>
              <th>Actual Bags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.party_name}</td>
                <td className="text-right">{entry.bags}</td>
                <td className="text-right">{entry.bardana_taken}</td>
                <td className="text-right">{entry.deposit}</td>
                <td className="text-right">{entry.actual_bags}</td>
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
