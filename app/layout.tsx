import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CRO Analyzer',
  description: 'Análise completa de Conversion Rate Optimization',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
