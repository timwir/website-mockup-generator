import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Professionelle Mockups von Webdesigner für Webdesigner',
  description: 'Automatischer Mockup-Generator für Webdesigner. Erstelle professionelle Mockups deiner Websites mit nur einer URL.',
  keywords: 'mockup, generator, webdesign, screenshot, monitor, device',
  authors: [{ name: 'Timwir' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} timwir-bg min-h-screen`}>
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <img 
                  src="/images/logo-dark.png" 
                  alt="TimWir Logo" 
                  className="h-16 w-auto"
                />
              </div>
              <div className="text-white/80 font-medium">
               <a href="https://timwir.de" target="_blank" rel="noopener noreferrer">Zu Timwir.de</a>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-white/80">
              <p>© 2025 Timwir Mockup Generator. Erstellt für professionelle Webdesigner.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 