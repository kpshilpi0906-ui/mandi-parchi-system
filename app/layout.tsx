import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mandi Parchi System',
  description: 'Complete Mandi Parchi Management System',
  manifest: '/manifest.json',
  themeColor: '#1f2937',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-gray-800 text-white p-4 shadow-lg">
            <h1 className="text-2xl font-bold text-center">Mandi Parchi System</h1>
          </header>
          <Navigation />
          <main className="container mx-auto p-4 max-w-7xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
