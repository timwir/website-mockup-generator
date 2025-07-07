import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL ist erforderlich' }, { status: 400 })
    }

    // URL validieren
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Ungültige URL' }, { status: 400 })
    }

    console.log('Generiere Screenshot für:', url)

    // Browser starten
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    })

    const page = await browser.newPage()
    
    // Viewport für Desktop-Screenshot setzen
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    })

    // User Agent setzen
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')

    // Häufige Cookie-Consent Cookies setzen um Banner zu vermeiden
    const domain = new URL(url).hostname
    try {
      await page.setCookie(
        { name: 'cookieConsent', value: 'true', domain },
        { name: 'cookie-consent', value: 'accepted', domain },
        { name: 'gdpr-consent', value: 'true', domain },
        { name: 'cookies-accepted', value: 'true', domain },
        { name: 'privacy-policy-accepted', value: 'true', domain },
        { name: 'cookielawinfo-checkbox-necessary', value: 'yes', domain },
        { name: 'cookielawinfo-checkbox-non-necessary', value: 'yes', domain },
        { name: 'CookieConsent', value: '{stamp:%27jkl456789%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1}', domain }
      )
    } catch (e) {
      // Cookie-Fehler ignorieren
      console.log('Cookies konnten nicht gesetzt werden:', e)
    }

    // Zur URL navigieren
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    })

    // Cookie-Banner und andere störende Elemente entfernen
    await page.evaluate(() => {
      // Häufige Cookie-Banner Selektoren
      const cookieSelectors = [
        // Allgemeine Selektoren
        '[id*="cookie"]', '[class*="cookie"]', '[id*="consent"]', '[class*="consent"]',
        '[id*="gdpr"]', '[class*="gdpr"]', '[id*="privacy"]', '[class*="privacy"]',
        '[class*="banner"]', '[id*="banner"]', '[class*="notice"]', '[id*="notice"]',
        
        // Real Cookie Banner (WordPress Plugin) - spezifische Selektoren
        '#real-cookie-banner', '.real-cookie-banner', '[data-real-cookie-banner]',
        '.rcb-banner', '#rcb-banner', '.real-cookie-consent',
        '.rcb-dialog', '#rcb-dialog', '.rcb-overlay',
        '[class*="real-cookie"]', '[id*="real-cookie"]',
        '.wp-real-cookie-banner', '#wp-real-cookie-banner',
        
        // Spezifische bekannte Cookie-Banner
        '#cookieConsent', '.cookie-consent', '.cookie-banner', '.cookie-notice',
        '#cookie-law-info-bar', '.cookie-law-info-bar',
        '#CybotCookiebotDialog', '.CybotCookiebotDialog',
        '#onetrust-consent-sdk', '.onetrust-consent-sdk',
        '.cc-window', '.cc-banner', '.cookieconsent',
        '#cookieChoiceInfo', '.cookie-alert', '.cookie-bar',
        '[data-cookiebanner]', '[data-cookie-consent]',
        '.gdpr-banner', '.privacy-banner', '.consent-banner',
        
        // Weitere störende Elemente
        '.popup-overlay', '.modal-overlay', '.newsletter-popup',
        '[class*="popup"]', '[class*="modal"]', '[class*="overlay"]'
      ]

      // Alle Cookie-Banner entfernen
      cookieSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector)
          elements.forEach(el => {
            if (el && el.parentNode) {
              // Überprüfe ob es wirklich ein Cookie-Banner ist
              const text = el.textContent?.toLowerCase() || ''
              const cookieKeywords = ['cookie', 'consent', 'gdpr', 'privacy', 'accept', 'zustimmen', 'akzeptieren', 'datenschutz']
              
              if (cookieKeywords.some(keyword => text.includes(keyword)) || 
                  selector.toLowerCase().includes('cookie') || 
                  selector.toLowerCase().includes('consent') ||
                  selector.toLowerCase().includes('gdpr')) {
                (el as HTMLElement).style.display = 'none'
                el.remove()
              }
            }
          })
        } catch (e) {
          // Fehler beim Entfernen ignorieren
        }
      })

      // Zusätzlich: Fixed/Sticky Elemente am unteren Rand (oft Cookie-Banner)
      const allElements = document.querySelectorAll('*')
      allElements.forEach(el => {
        const style = window.getComputedStyle(el)
        if (style.position === 'fixed' || style.position === 'sticky') {
          const text = el.textContent?.toLowerCase() || ''
          if (text.includes('cookie') || text.includes('consent') || text.includes('gdpr') || 
              text.includes('datenschutz') || text.includes('accept') || text.includes('zustimmen')) {
            (el as HTMLElement).style.display = 'none'
            el.remove()
          }
        }
      })

      // Body Overflow zurücksetzen (falls durch Cookie-Banner blockiert)
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    })

    // Kurz warten damit sich die Seite nach dem Entfernen der Banner stabilisiert
    await page.waitForTimeout(1000)

    // Website-Titel auslesen
    const pageTitle = await page.title()
    console.log(`Website-Titel gefunden: "${pageTitle}"`)

    // Screenshot erstellen
    const screenshotBuffer = await page.screenshot({
      type: 'png',
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1080
      }
    })

    await browser.close()

    console.log('Screenshot erstellt, generiere Mockup...')

    // Favicon herunterladen
    const faviconBuffer = await downloadFavicon(url)

    // Mockup erstellen
    const mockupBuffer = await createMonitorMockup(screenshotBuffer, faviconBuffer, pageTitle)

    // Buffer zu Base64 konvertieren
    const base64 = mockupBuffer.toString('base64')
    const dataUrl = `data:image/png;base64,${base64}`

    return NextResponse.json({
      success: true,
      mockupImage: dataUrl
    })

  } catch (error) {
    console.error('Fehler beim Generieren des Mockups:', error)
    return NextResponse.json(
      { error: 'Fehler beim Generieren des Mockups' },
      { status: 500 }
    )
  }
}

async function downloadFavicon(url: string): Promise<Buffer | null> {
  try {
    console.log('Versuche Favicon herunterzuladen...')
    const domain = new URL(url).origin
    
    // Verschiedene Favicon-URLs versuchen
    const faviconUrls = [
      `${domain}/favicon.ico`,
      `${domain}/favicon.png`,
      `${domain}/apple-touch-icon.png`,
      `${domain}/apple-touch-icon-180x180.png`
    ]
    
    for (const faviconUrl of faviconUrls) {
      try {
        const response = await fetch(faviconUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })
        
        if (response.ok && response.headers.get('content-type')?.includes('image')) {
          const arrayBuffer = await response.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          console.log(`Favicon gefunden: ${faviconUrl}`)
          return buffer
        }
      } catch (e) {
        // Weitermachen mit nächster URL
        continue
      }
    }
    
    console.log('Kein Favicon gefunden')
    return null
  } catch (error) {
    console.error('Fehler beim Favicon-Download:', error)
    return null
  }
}

async function createMonitorMockup(screenshotBuffer: Buffer, faviconBuffer?: Buffer | null, pageTitle?: string): Promise<Buffer> {
  try {
    console.log('Erstelle Mockup mit deinem eigenen Design...')
    
    // 1. Dein Mockup-Bild als Basis laden
    const mockupBasePath = path.join(process.cwd(), 'public', 'images', '4249950_90969.jpg')
    
    if (!fs.existsSync(mockupBasePath)) {
      throw new Error('Mockup-Basis-Bild nicht gefunden')
    }

    // 2. Mockup-Basis laden und Größe ermitteln
    const mockupBase = sharp(mockupBasePath)
    const { width: mockupWidth, height: mockupHeight } = await mockupBase.metadata()
    
    console.log(`Mockup-Basis geladen: ${mockupWidth}x${mockupHeight}`)

    // 3. Screenshot für den Laptop-Bildschirmbereich vorbereiten
    // EXAKTE WERTE AUS DEBUG-TOOL!
    const screenWidth = 2625  // Exakt aus Debug-Tool
    const screenHeight = 1642 // Exakt aus Debug-Tool
    // Exakte Position aus Debug-Tool
    const screenX = 778       // X-Position aus Debug-Tool
    const screenY = 1218      // Y-Position aus Debug-Tool

    const processedScreenshot = await sharp(screenshotBuffer)
      .resize(screenWidth, screenHeight, { 
        fit: 'cover',
        position: 'top'
      })
      .png()
      .toBuffer()

    console.log(`Screenshot angepasst auf: ${screenWidth}x${screenHeight} bei Position ${screenX},${screenY}`)

    // 4. Screenshot auf das Mockup-Bild legen
    let finalMockup = await mockupBase
      .composite([
        {
          input: processedScreenshot,
          top: screenY,
          left: screenX
        }
      ])

    // 5. Logo hinzufügen (ohne Rahmen, links oben)
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo-light.png')
    if (fs.existsSync(logoPath)) {
      try {
        console.log('Füge riesiges Logo ohne Rahmen hinzu...')
        const logoBuffer = await sharp(logoPath)
          .resize(1050, 1050, { fit: 'inside' }) // 3x größer! (350 * 3)
          .png()
          .toBuffer()

        finalMockup = await sharp(await finalMockup.png().toBuffer())
          .composite([
            // Das riesige Logo direkt ohne Rahmen oder Schatten
            {
              input: logoBuffer,
              top: 100,
              left: 100
            }
          ])
      } catch (logoError) {
        console.error('Logo konnte nicht hinzugefügt werden:', logoError)
      }
    }

    // 6. Favicon hinzufügen (rechts oben)
    if (faviconBuffer) {
      try {
        console.log('Füge Favicon rechts oben hinzu...')
        const faviconImage = await sharp(faviconBuffer)
          .resize(120, 120, { fit: 'inside' }) // Favicon-Größe
          .png()
          .toBuffer()

        finalMockup = await sharp(await finalMockup.png().toBuffer())
          .composite([
            // Das Favicon rechts oben
            {
              input: faviconImage,
              top: 80,
              left: (mockupWidth || 4165) - 200 // 120px Favicon + 80px Abstand
            }
          ])
      } catch (faviconError) {
        console.error('Favicon konnte nicht hinzugefügt werden:', faviconError)
      }
    }

    // 7. Website-Titel unten mittig hinzufügen
    if (pageTitle && pageTitle.trim()) {
      try {
        console.log(`Füge Website-Titel hinzu: "${pageTitle}"`)
        
        // Titel kürzen falls zu lang
        const displayTitle = pageTitle.length > 60 ? pageTitle.substring(0, 57) + '...' : pageTitle
        
        // Text-SVG erstellen
        const titleSvg = `
          <svg width="800" height="100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="rgba(255,255,255,0.95)" rx="20"/>
            <text x="50%" y="60%" 
                  text-anchor="middle" 
                  font-family="Arial, sans-serif" 
                  font-size="32" 
                  font-weight="600"
                  fill="#2D3748">
              ${displayTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </text>
          </svg>
        `
        
        const titleBuffer = Buffer.from(titleSvg)
        
        finalMockup = await sharp(await finalMockup.png().toBuffer())
          .composite([
            {
              input: titleBuffer,
              top: (mockupHeight || 4165) - 200, // 100px vom unteren Rand
              left: Math.round(((mockupWidth || 4165) - 800) / 2) // Zentriert
            }
          ])
      } catch (titleError) {
        console.error('Titel konnte nicht hinzugefügt werden:', titleError)
      }
    }

    console.log('Professionelles Mockup mit deinem Design erstellt!')
    return await finalMockup.png().toBuffer()

  } catch (error) {
    console.error('Fehler beim Erstellen des Mockups:', error)
    
    // Einfacher Fallback
    console.log('Verwende einfaches Fallback-Mockup...')
    return await sharp(screenshotBuffer)
      .resize(1200, 750, { fit: 'cover' })
      .extend({
        top: 120,
        bottom: 300,
        left: 300,
        right: 300,
        background: { r: 240, g: 242, b: 247 }
      })
      .png()
      .toBuffer()
  }
} 