import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const exportDalalReportPDF = (data: any[], date: string, totals: any) => {
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.text('Dalal Report', 14, 20)
  doc.setFontSize(12)
  doc.text(`Date: ${date}`, 14, 30)
  
  autoTable(doc, {
    startY: 35,
    head: [['Party Name', 'No of Bags', 'Rate', 'Amount']],
    body: data.map(item => [
      item.party_name,
      item.no_of_bags,
      item.rate,
      item.amount.toFixed(2)
    ]),
    foot: [[
      'Total',
      totals.totalBags,
      '',
      totals.totalAmount.toFixed(2)
    ]],
    theme: 'grid',
    headStyles: { fillColor: [66, 66, 66] },
    footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' }
  })
  
  doc.save(`dalal-report-${date}.pdf`)
}

export const exportTollReportPDF = (data: any[], date: string, totals: any) => {
  const doc = new jsPDF('landscape')
  
  doc.setFontSize(18)
  doc.text('Toll Report', 14, 20)
  doc.setFontSize(12)
  doc.text(`Date: ${date}`, 14, 30)
  
  autoTable(doc, {
    startY: 35,
    head: [['Party', '50Kg Bags', 'Loose Kg', 'Total Kg', 'Quintal', 'Rate', 'Amount']],
    body: data.map(item => [
      item.party_name,
      item.bags_50kg,
      item.loose_kg,
      item.total_kg.toFixed(2),
      item.quintal.toFixed(2),
      item.rate,
      item.amount.toFixed(2)
    ]),
    foot: [[
      'Total',
      totals.totalBags50kg,
      totals.totalLooseKg,
      totals.totalKg.toFixed(2),
      totals.totalQuintal.toFixed(2),
      '',
      totals.totalAmount.toFixed(2)
    ]],
    theme: 'grid',
    headStyles: { fillColor: [66, 66, 66] },
    footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' }
  })
  
  doc.save(`toll-report-${date}.pdf`)
}

export const exportBardanaReportPDF = (data: any[], date: string, totals: any) => {
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.text('Bardana Report', 14, 20)
  doc.setFontSize(12)
  doc.text(`Date: ${date}`, 14, 30)
  
  autoTable(doc, {
    startY: 35,
    head: [['Party', 'Bags', 'Bardana Taken', 'Deposit', 'Actual Bags']],
    body: data.map(item => [
      item.party_name,
      item.bags,
      item.bardana_taken,
      item.deposit,
      item.actual_bags
    ]),
    foot: [[
      'Total',
      totals.totalBags,
      totals.totalBardanaTaken,
      totals.totalDeposit,
      totals.totalActualBags
    ]],
    theme: 'grid',
    headStyles: { fillColor: [66, 66, 66] },
    footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' }
  })
  
  doc.save(`bardana-report-${date}.pdf`)
}

export const exportDailySummaryPDF = (dalalData: any, tollData: any, bardanaData: any, date: string) => {
  const doc = new jsPDF('landscape')
  
  doc.setFontSize(20)
  doc.text('Daily Summary Report', 14, 15)
  doc.setFontSize(12)
  doc.text(`Date: ${date}`, 14, 25)
  
  let yPos = 35
  
  // Dalal Report
  doc.setFontSize(14)
  doc.text('Dalal Report', 14, yPos)
  yPos += 5
  
  autoTable(doc, {
    startY: yPos,
    head: [['Party', 'Bags', 'Rate', 'Amount']],
    body: dalalData.data.map((item: any) => [
      item.party_name,
      item.no_of_bags,
      item.rate,
      item.amount.toFixed(2)
    ]),
    foot: [['Total', dalalData.totals.totalBags, '', dalalData.totals.totalAmount.toFixed(2)]],
    theme: 'grid',
    headStyles: { fillColor: [66, 66, 66], fontSize: 10 },
    footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 9 }
  })
  
  yPos = (doc as any).lastAutoTable.finalY + 15
  
  // Toll Report
  doc.setFontSize(14)
  doc.text('Toll Report', 14, yPos)
  yPos += 5
  
  autoTable(doc, {
    startY: yPos,
    head: [['Party', '50Kg', 'Loose', 'Total Kg', 'Quintal', 'Rate', 'Amount']],
    body: tollData.data.map((item: any) => [
      item.party_name,
      item.bags_50kg,
      item.loose_kg,
      item.total_kg.toFixed(2),
      item.quintal.toFixed(2),
      item.rate,
      item.amount.toFixed(2)
    ]),
    foot: [[
      'Total',
      tollData.totals.totalBags50kg,
      tollData.totals.totalLooseKg,
      tollData.totals.totalKg.toFixed(2),
      tollData.totals.totalQuintal.toFixed(2),
      '',
      tollData.totals.totalAmount.toFixed(2)
    ]],
    theme: 'grid',
    headStyles: { fillColor: [66, 66, 66], fontSize: 10 },
    footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 9 }
  })
  
  yPos = (doc as any).lastAutoTable.finalY + 15
  
  // Bardana Report
  doc.setFontSize(14)
  doc.text('Bardana Report', 14, yPos)
  yPos += 5
  
  autoTable(doc, {
    startY: yPos,
    head: [['Party', 'Bags', 'Bardana Taken', 'Deposit', 'Actual Bags']],
    body: bardanaData.data.map((item: any) => [
      item.party_name,
      item.bags,
      item.bardana_taken,
      item.deposit,
      item.actual_bags
    ]),
    foot: [[
      'Total',
      bardanaData.totals.totalBags,
      bardanaData.totals.totalBardanaTaken,
      bardanaData.totals.totalDeposit,
      bardanaData.totals.totalActualBags
    ]],
    theme: 'grid',
    headStyles: { fillColor: [66, 66, 66], fontSize: 10 },
    footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 9 }
  })
  
  doc.save(`daily-summary-${date}.pdf`)
}
