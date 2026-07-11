import './globals.css'
import localFont from 'next/font/local'
import { AuthProvider } from '../context/AuthContext'

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = {
  title: 'MOVO — Smart Recovery Nutrition',
  description:
    'Personalized post-workout nutrition on a student budget. Macros, meals and real nearby prices in 30 seconds.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
