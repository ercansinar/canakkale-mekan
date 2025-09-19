import { Inter } from 'next/font/google' // Not: Bu satırı projenizdekiyle aynı tutun, font ismi farklı olabilir.
import './globals.css'
import 'leaflet/dist/leaflet.css'
import Header from '@/components/Header' // Header bileşenini import ediyoruz

const inter = Inter({ subsets: ['latin'] }) // Not: Bu satırı da projenizdekiyle aynı tutun.

export const metadata = {
  title: 'Çanakkale Mekan Rehberi',
  description: 'Çanakkale\'deki tüm mekanları ve işletmeleri keşfedin.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}> {/* Bu satırı da projenizdekiyle aynı tutun. */}
        <Header /> {/* Header'ı buraya ekledik */}
        <main className="container mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  )
}