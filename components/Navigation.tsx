'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dalal-parchi', label: 'Dalal Parchi' },
    { href: '/toll-parchi', label: 'Toll Parchi' },
    { href: '/bardana', label: 'Bardana' },
    { href: '/reports/dalal', label: 'Dalal Report' },
    { href: '/reports/toll', label: 'Toll Report' },
    { href: '/reports/bardana', label: 'Bardana Report' },
    { href: '/reports/daily-summary', label: 'Daily Summary' },
  ]
  
  return (
    <nav className="bg-white shadow-md overflow-x-auto">
      <div className="container mx-auto">
        <div className="flex space-x-1 p-2 min-w-max">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded whitespace-nowrap transition ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
