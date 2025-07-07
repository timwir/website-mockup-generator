'use client'

import { useState } from 'react'
import { ArrowRightIcon, ArrowDownTrayIcon, SparklesIcon, ComputerDesktopIcon, CameraIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [url, setUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [mockupImage, setMockupImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateMockup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsGenerating(true)
    setError(null)
    setMockupImage(null)

    try {
      const response = await fetch('/api/generate-mockup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Erstellen des Mockups')
      }

      setMockupImage(data.mockupImage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!mockupImage) return
    
    const link = document.createElement('a')
    link.href = mockupImage
    link.download = `mockup-${new Date().getTime()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Sektion - TimWir Style */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full animate-pulse-slow hover:scale-110 transition-all duration-300">
              <SparklesIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="hero-text mb-8">
            Dein digitaler
            <span className="block">Mockup Generator</span>
          </h1>
          <p className="hero-subtitle max-w-4xl mx-auto mb-12">
            Als Webdesign-Profi entwickeln wir innovative Mockup-Lösungen mit modernster Technologie. 
            Verwandle deine Websites in professionelle Monitor-Mockups – so begeisterst du deine Kunden. Getestet mit <img src="/images/firefox.svg" alt="Firefox" className="inline-block h-5 w-5 mx-1" /> und <img src="/images/chrome.svg" alt="Chrome" className="inline-block h-5 w-5 mx-1" />.
          </p>
        </div>

        {/* URL Eingabe - TimWir Style */}
        <div className="max-w-4xl mx-auto mb-20">
          <form onSubmit={handleGenerateMockup} className="card">
            <div className="mb-8">
              <label htmlFor="url" className="block text-lg font-semibold text-gray-800 mb-4">
                Website URL eingeben
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://deine-website.de"
                  className="input-field flex-1 text-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={isGenerating || !url}
                  className="btn-primary flex items-center justify-center gap-3 min-w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                      Mockup wird erstellt...
                    </>
                  ) : (
                    <>
                      <CameraIcon className="h-5 w-5" />
                      Jetzt Mockup erstellen
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100/80 backdrop-blur-sm border border-red-300 rounded-2xl p-6 text-red-800">
                <p className="font-semibold mb-2">Ein Fehler ist aufgetreten:</p>
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Features - Clean ohne Boxen */}
        <div className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 text-white/90">
              <div className="hover:transform hover:scale-105 transition-all duration-300">
                <ComputerDesktopIcon className="h-12 w-12 mx-auto mb-4 text-white animate-pulse-slow" />
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Realistische Mockups
                </h3>
                <p className="leading-relaxed">
                  Professionelle Monitor-Mockups mit realistischem Design und deinem Logo
                </p>
              </div>
              <div className="hover:transform hover:scale-105 transition-all duration-300">
                <CameraIcon className="h-12 w-12 mx-auto mb-4 text-white animate-pulse-slow" style={{animationDelay: '1s'}} />
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Intelligente Screenshots
                </h3>
                <p className="leading-relaxed">
                  Automatische Screenshots ohne Cookie-Banner und störende Popups
                </p>
              </div>
              <div className="hover:transform hover:scale-105 transition-all duration-300">
                <ArrowDownTrayIcon className="h-12 w-12 mx-auto mb-4 text-white animate-pulse-slow" style={{animationDelay: '2s'}} />
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Sofortiger Download
                </h3>
                <p className="leading-relaxed">
                  Hochwertige Mockups perfekt für Präsentationen und Kundenakquise
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup Anzeige - TimWir Style */}
        {mockupImage && (
          <div className="max-w-6xl mx-auto">
            <div className="card">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                  🎉 Dein Mockup ist fertig!
                </h2>
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center gap-3"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Mockup herunterladen
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center">
                <img 
                  src={mockupImage} 
                  alt="Generiertes TimWir Mockup" 
                  className="max-w-full h-auto mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg text-gray-700">
                  Perfekt! Dein professionelles Mockup ist bereit für Präsentationen und die Kundenakquise. 
                  <br />
                  <span className="font-semibold text-gray-800">Erstellt mit Timwir Mockup Generator.</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State - TimWir Style */}
        {isGenerating && (
          <div className="max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="py-12">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></div>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto">
                    <div className="animate-ping w-20 h-20 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Dein Mockup wird erstellt...
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Wir nehmen gerade einen professionellen Screenshot deiner Website auf, 
                  entfernen störende Elemente und erstellen ein hochwertiges Monitor-Mockup mit deinem Favicon.
                </p>
                <div className="mt-8 flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/20 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
              <a 
                href="/impressum" 
                className="text-white/80 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Impressum
              </a>
              <a 
                href="/datenschutz" 
                className="text-white/80 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Datenschutzerklärung
              </a>
              <a 
                href="mailto:info@timwir.eu" 
                className="text-white/80 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 