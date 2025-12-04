'use client'

import { useState, useEffect } from 'react'
import { supabase, TollParchi } from '@/lib/supabase'
import { exportTollReportPDF } from '@/lib/pdfExport'

export default function TollReportPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [data, setData] = useState<TollParchi[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchReport()
  }, [selectedDate])

  const fetchReport = async () => {
    setLoading(true)
    const { data: result, error } = await supabase
      .from('toll_parchi')
      .select('*')
      .eq('date', selectedDate)
      .order('party_name')
    
    if (result) setData(result)
    setLoading(false)
  }

  const totals = {
    totalBags50kg: data.reduce((sum, item) => sum + item.bags_50kg, 0),
    totalLooseKg: data.reduce((sum, item) => sum + item.loose_kg, 0),
    totalKg: data.reduce((sum, item) => sum + item.total_kg, 0),
    totalQuintal: data.reduce((sum, item) => sum + item.quintal, 0),
    totalAmount: data.reduce((sum, item) => sum + item.amount, 0),
  }

  const handleExportPDF = () => {
    exportTollReportPDF(data, selectedDate, totals)
  }

  const handleShare = async () => {
    const text = `Toll Report - ${selectedDate}\n\nTotal 50Kg Bags: ${totals.totalBags50kg}\nTotal Loose Kg: ${totals.totalLooseKg}\nTotal Kg: ${totals.totalKg.toFixed(2)}\nTotal Quintal: ${totals.totalQuintal.toFixed(2)}\nTotal Amount: ₹${totals.totalAmount.toFixed(2)}`
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Toll Report', text })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(text)
      alert('Report copied to clipboard!')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Toll Report</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button onClick={handleExportPDF} className="btn-primary">
            Download PDF
          </button>
          <button onClick={handleShare} className="btn-secondary">
            Share Report
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Report for {selectedDate}</h3>
          <table className="excel-table">
            <thead>
              <tr>
                <th>Party Name</th>
                <th>50Kg Bags</th>
                <th>Loose Kg</th>
                <th>Total Kg</th>
                <th>Quintal</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.party_name}</td>
                  <td className="text-right">{item.bags_50kg}</td>
                  <td className="text-right">{item.loose_kg}</td>
                  <td className="text-right">{item.total_kg.toFixed(2)}</td>
                  <td className="text-right">{item.quintal.toFixed(2)}</td>
                  <td className="text-right">₹{item.rate.toFixed(2)}</td>
                  <td className="text-right">₹{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td className="text-right">{totals.totalBags50kg}</td>
                <td className="text-right">{totals.totalLooseKg}</td>
                <td className="text-right">{totals.totalKg.toFixed(2)}</td>
                <td className="text-right">{totals.totalQuintal.toFixed(2)}</td>
                <td></td>
                <td className="text-right">₹{totals.totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          {data.length === 0 && (
            <p className="text-center text-gray-500 py-4">No data for selected date</p>
          )}
        </div>
      )}
    </div>
  )
}
