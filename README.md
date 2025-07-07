# 🎨 TimWir Mockup Generator

> **Professioneller Website-Mockup-Generator für Webdesigner und Agenturen**

Erstelle automatisch hochwertige Monitor-Mockups aus Website-URLs. Perfekt für Präsentationen, Kundenakquise und Portfolio-Darstellungen.

![TimWir Mockup Generator](https://img.shields.io/badge/Version-1.0.0-brightgreen) 
![Next.js](https://img.shields.io/badge/Next.js-14-black) 
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) 
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🖥️ **Intelligente Screenshot-Erfassung**
- Automatische Website-Screenshots in Full-HD (1920x1080)
- Erweiterte Cookie-Banner-Entfernung (30+ Selektoren)
- Unterstützung für Real Cookie Banner WordPress Plugin
- Optimierte Darstellung ohne störende Pop-ups

### 🎯 **Professionelle Mockup-Erstellung**
- **Custom Monitor-Design** - Verwendung eigener Mockup-Vorlagen
- **Logo-Integration** - Automatische Timwir-Branding-Platzierung
- **Favicon-Extraktion** - Automatisches Herunterladen und Positionierung
- **Website-Titel** - Intelligente Titel-Extraktion und -Anzeige
- **Responsive Positionierung** - Pixel-genaue Platzierung aller Elemente

### 🎨 **Timwir Corporate Design**
- Türkis-Gradient Hintergrund (#008A75 → #00A085)
- Glasmorphismus-Effekte mit Backdrop-Blur
- Animierte Gradienten und Hover-Effekte
- Mobile-responsive Design

### 🔒 **Rechtliche Compliance**
- DSGVO-konforme Datenschutzerklärung
- Vollständiges Impressum nach TMG
- Keine dauerhafte Datenspeicherung
- SSL-Verschlüsselung

## 🚀 Demo

Besuche die Live-Demo: **[mockup.timwir.de](https://mockup.timwir.de)** *(Beispiel-URL)*

## 📋 Voraussetzungen

- **Node.js** 18.x oder höher
- **npm** oder **yarn**
- **macOS/Linux/Windows** (getestet auf macOS ARM64)

## 🛠️ Installation

1. **Repository klonen:**
```bash
git clone https://github.com/timwirkner/mockup-generator-timwir.git
cd mockup-generator-timwir
```

2. **Dependencies installieren:**
```bash
npm install
# oder
yarn install
```

3. **Entwicklungsserver starten:**
```bash
npm run dev
# oder
yarn dev
```

4. **Öffne [http://localhost:3000](http://localhost:3000)** im Browser

## 📁 Projektstruktur

```
mockup-generator-timwir/
├── 📁 app/
│   ├── 📁 api/
│   │   └── 📁 generate-mockup/
│   │       └── route.ts          # Hauptlogik für Mockup-Generierung
│   ├── 📁 debug/
│   │   └── page.tsx              # Koordinaten-Debug-Tool
│   ├── 📁 datenschutz/
│   │   └── page.tsx              # Datenschutzerklärung
│   ├── 📁 impressum/
│   │   └── page.tsx              # Impressum
│   ├── globals.css               # Globale Styles + TimWir Design
│   ├── layout.tsx                # App Layout
│   └── page.tsx                  # Hauptseite
├── 📁 public/
│   └── 📁 images/
│       ├── logo-light.png        # TimWir Logo
│       └── 4249950_90969.jpg     # Custom Mockup-Vorlage
├── 📋 package.json
└── 📖 README.md
```

## 🔧 Technologie-Stack

- **Framework:** Next.js 14 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Screenshot:** Puppeteer
- **Bildverarbeitung:** Sharp
- **Icons:** Heroicons
- **Deployment:** Vercel-ready

## 🎯 Verwendung

1. **URL eingeben:** Gib die Website-URL in das Eingabefeld ein
2. **Mockup generieren:** Klicke auf "Jetzt Mockup erstellen"
3. **Warten:** Der Generator erstellt automatisch:
   - Screenshot der Website
   - Favicon-Download
   - Monitor-Mockup mit Logo
   - Website-Titel-Integration
4. **Download:** Lade das fertige Mockup als PNG herunter

## ⚙️ Konfiguration

### Custom Mockup-Vorlage

Ersetze `public/images/4249950_90969.jpg` mit deiner eigenen Mockup-Vorlage und passe die Koordinaten in `route.ts` an:

```typescript
// Exakte Position für Screenshot im Mockup
const screenWidth = 2625   // Bildschirm-Breite
const screenHeight = 1642  // Bildschirm-Höhe
const screenX = 778        // X-Position
const screenY = 1218       // Y-Position
```

### Logo anpassen

Ersetze `public/images/logo-light.png` mit deinem Logo und passe die Größe an:

```typescript
.resize(1050, 1050, { fit: 'inside' }) // Logo-Größe
```

## 🌐 Deployment

### Vercel (Empfohlen)

1. **GitHub Repository erstellen**
2. **Bei Vercel einloggen** und Repository verbinden
3. **Automatisches Deployment** - Vercel erkennt Next.js automatisch

### Andere Plattformen

Das Projekt ist kompatibel mit:
- **Netlify**
- **Railway**
- **Heroku**
- **Docker**

## 🐛 Troubleshooting

### Puppeteer-Probleme
```bash
# Bei macOS ARM64-Problemen:
npm install puppeteer --save
```

### Sharp-Installation
```bash
# Falls Sharp-Fehler auftreten:
npm rebuild sharp
```

### Memory-Probleme
```bash
# Für größere Websites:
node --max-old-space-size=4096 server.js
```

## 🔒 Datenschutz & Sicherheit

- ✅ **Keine persistente Speicherung** - Alle Daten nur temporär im RAM
- ✅ **DSGVO-konform** - Vollständige Datenschutzerklärung
- ✅ **SSL-Verschlüsselung** - Sichere Datenübertragung
- ✅ **Input-Validation** - Schutz vor malicious URLs

## 🤝 Contributing

Contributions sind willkommen! Bitte:

1. **Fork** das Repository
2. **Feature Branch** erstellen (`git checkout -b feature/AmazingFeature`)
3. **Changes committen** (`git commit -m 'Add AmazingFeature'`)
4. **Branch pushen** (`git push origin feature/AmazingFeature`)
5. **Pull Request** öffnen

## 📜 Lizenz

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Kontakt

**Timo Wirkner** - TimWir Webdesign Agentur

- 📧 **E-Mail:** [info@timwir.eu](mailto:info@timwir.eu)
- 🌐 **Website:** [www.timwir.de](https://www.timwir.de)
---

## 🏆 Credits

- **Designer & Developer:** Timo Wirkner
- **Agentur:** Timwir - Webdesign aus OWL
- **Framework:** Next.js Team
- **Icons:** Heroicons

---

<div align="center">

**⭐ Vergiss nicht, das Repository zu sternen, wenn es dir gefällt! ⭐**

Made with ❤️ by [TimWir](https://www.timwir.de)

</div> 