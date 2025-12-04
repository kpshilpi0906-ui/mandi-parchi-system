'use client'

import { useState, useEffect } from 'react'
import { supabase, DalalParchi, TollParchi, Bardana } from '@/lib/supabase'
import { exportDailySummaryPDF } from '@/lib/pdfExport'

export default function DailySummaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [dalalData, setDalalData] = useState<DalalParchi[]>([])
  const [tollData, setTollData] = useState<TollParchi[]>([])
  const [bardanaData, setBardanaData] = useState<Bardana[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAllReports()
  }, [selectedDate])

  const fetchAllReports = async () => {
    setLoading(true)
    
    const [dalal, toll, bardana] = await Promise.all([
      supabase.from('dalal_parchi').select('*').eq('date', selectedDate).order('party_name'),
      supabase.from('toll_parchi').select('*').eq('date', selectedDate).order('party_name'),
      supabase.from('bardana').select('*').eq('date', selectedDate).order('party_name'),
    ])
    
    if (dalal.data) setDalalData(dalal.data)
    if (toll.data) setTollData(toll.data)
    if (bardana.data) setBardanaData(bardana.data)
    
    setLoading(false)
  }

  const dalalTotals = {
    totalBags: dalalData.reduce((sum, item) => sum + item.no_of_bags, 0),
    totalAmount: dalalData.reduce((sum, item) => sum + item.amount, 0),
  }

  const tollTotals = {
    totalBags50kg: tollData.reduce((sum, item) => sum + item.bags_50kg, 0),
    totalLooseKg: tollData.reduce((sum, item) => sum + item.loose_kg, 0),
    totalKg: tollData.reduce((sum, item) => sum + item.total_kg, 0),
    totalQuintal: tollData.reduce((sum, item) => sum + item.quintal, 0),
    totalAmount: tollData.reduce((sum, item) => sum + item.amount, 0),
  }

  const bardanaTotals = {
    totalBags: bardanaData.reduce((sum, item) => sum + item.bags, 0),
    totalBardanaTaken: bardanaData.reduce((sum, item) => sum + item.bardana_taken, 0),
    totalDeposit: bardanaData.reduce((sum, item) => sum + item.deposit, 0),
    totalActualBags: bardanaData.reduce((sum, item) => sum + item.actual_bags, 0),
  }

  const handleExportPDF = () => {
    exportDailySummaryPDF(
      { data: dalalData, totals: dalalTotals },
      { data: tollData, totals: tollTotals },
      { data: bardanaData, totals: bardanaTotals },
      selectedDate
    )
  }

  const handleShare = async () => {
    const text = `Daily Summary Report - ${selectedDate}\n\nDalal: ${dalalTotals.totalBags} bags, ₹${dalalTotals.totalAmount.toFixed(2)}\nToll: ${tollTotals.totalQuintal.toFixed(2)} quintal, ₹${tollTotals.totalAmount.toFixed(2)}\nBardana: ${bardanaTotals.totalActualBags} actual bags`
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Daily Summary Report', text })
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
      <h2 className="text-2xl font-bold mb-6">Daily Summary Report</h2>

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
        <div className="space-y-6">
          {/* Dalal Report Section */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Dalal Report</h3>
            <table className="excel-table">
              <thead>
                <tr>
                  <th>Party</th>
                  <th>Bags</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {dalalData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.party_name}</td>
                    <td className="text-right">{item.no_of_bags}</td>
                    <td className="text-right">₹{item.rate.toFixed(2)}</td>
                    <td className="text-right">₹{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td className="text-right">{dalalTotals.totalBags}</td>
                  <td></td>
                  <td className="text-right">₹{dalalTotals.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            {dalalData.length === 0 && (
              <p className="text-center text-gray-500 py-4">No data</p>
            )}
          </div>

          {/* Toll Report Section */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-green-600">Toll Report</h3>
            <table className="excel-table">
              <thead>
                <tr>
                  <th>Party</th>
                  <th>50Kg</th>
                  <th>Loose</th>
                  <th>Total Kg</th>
                  <th>Quintal</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {tollData.map((item) => (
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
                  <td className="text-right">{tollTotals.totalBags50kg}</td>
                  <td className="text-right">{tollTotals.totalLooseKg}</td>
                  <td className="text-right">{tollTotals.totalKg.toFixed(2)}</td>
                  <td className="text-right">{tollTotals.totalQuintal.toFixed(2)}</td>
                  <td></td>
                  <td className="text-right">₹{tollTotals.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            {tollData.length === 0 && (
              <p className="text-center text-gray-500 py-4">No data</p>
            )}
          </div>

          {/* Bardana Report Section */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-purple-600">Bardana Report</h3>
            <table className="excel-table">
              <thead>
                <tr>
                  <th>Party</th>
                  <th>Bags</th>
                  <th>Bardana Taken</th>
                  <th>Deposit</th>
                  <th>Actual Bags</th>
                </tr>
              </thead>
              <tbody>
                {bardanaData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.party_name}</td>
                    <td className="text-right">{item.bags}</td>
                    <td className="text-right">{item.bardana_taken}</td>
                    <td className="text-right">{item.deposit}</td>
                    <td className="text-right">{item.actual_bags}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td className="text-right">{bardanaTotals.totalBags}</td>
                  <td className="text-right">{bardanaTotals.totalBardanaTaken}</td>
                  <td className="text-right">{bardanaTotals.totalDeposit}</td>
                  <td className="text-right">{bardanaTotals.totalActualBags}</td>
                </tr>
              </tfoot>
            </table>
            {bardanaData.length === 0 && (
              <p className="text-center text-gray-500 py-4">No data</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
