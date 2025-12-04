export default function Home() {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to Mandi Parchi System
      </h2>
      <p className="text-gray-600 mb-8">
        Select a module from the navigation menu to get started
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Entry Modules</h3>
          <ul className="text-left text-gray-700 space-y-1">
            <li>• Dalal Parchi</li>
            <li>• Toll Parchi</li>
            <li>• Bardana</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-green-600">Reports</h3>
          <ul className="text-left text-gray-700 space-y-1">
            <li>• Dalal Report</li>
            <li>• Toll Report</li>
            <li>• Bardana Report</li>
            <li>• Daily Summary</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-purple-600">Features</h3>
          <ul className="text-left text-gray-700 space-y-1">
            <li>• Auto Calculations</li>
            <li>• PDF Export</li>
            <li>• Mobile Friendly</li>
            <li>• Excel-like UI</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
