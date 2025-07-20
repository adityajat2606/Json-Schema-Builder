import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HROne Frontend task',
  description: 'Created BY Aditya'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
