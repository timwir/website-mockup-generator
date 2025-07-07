export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005A4F] via-[#007A6B] to-[#00A085] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Datenschutzerklärung
        </h1>
        
        <div className="prose prose-lg max-w-none text-gray-600">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Datenschutz auf einen Blick
          </h2>
          
          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Allgemeine Hinweise
          </h3>
          <p className="mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Datenerfassung auf dieser Website
          </h3>
          <p className="mb-6">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. Hosting und Content Delivery Networks (CDN)
          </h2>
          
          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Externes Hosting
          </h3>
          <p className="mb-6">
            Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. Allgemeine Hinweise und Pflichtinformationen
          </h2>

          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Datenschutz
          </h3>
          <p className="mb-4">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzbestimmungen sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Verantwortliche Stelle
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p>
              <strong>Timo Wirkner</strong><br />
              Nussweg 4<br />
              33334 Gütersloh<br />
              Germany<br /><br />
              E-Mail: <a href="mailto:info@timwir.eu" className="text-[#008A75] hover:underline">info@timwir.eu</a><br />
              Telefon: <a href="tel:+4952414039367" className="text-[#008A75] hover:underline">05241 / 4039367</a>
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. Datenerfassung auf dieser Website
          </h2>

          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Server-Log-Dateien
          </h3>
          <p className="mb-4">
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Mockup-Generator Service
          </h3>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
            <p className="mb-4">
              <strong>Besondere Hinweise zu unserem Mockup-Generator:</strong>
            </p>
            <p className="mb-4">
              Wenn Sie unseren Mockup-Generator verwenden, werden folgende Daten verarbeitet:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Website-URLs:</strong> Die von Ihnen eingegebenen URLs werden zur Screenshot-Erstellung verwendet</li>
              <li><strong>Screenshots:</strong> Temporäre Screenshots der angegebenen Websites werden erstellt</li>
              <li><strong>Favicon-Downloads:</strong> Favicons der Websites werden automatisch heruntergeladen</li>
              <li><strong>Verarbeitete Mockups:</strong> Das finale Mockup-Bild wird generiert</li>
            </ul>
            <p className="mb-4">
              <strong>Wichtig:</strong> Alle diese Daten werden ausschließlich temporär verarbeitet und <span className="font-semibold">nicht dauerhaft gespeichert</span>. Screenshots, Favicons und Mockups werden nur für die Dauer der Verarbeitung im Arbeitsspeicher gehalten und anschließend gelöscht.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen zur Bereitstellung des Services)
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. Ihre Rechte
          </h2>
          
          <p className="mb-4">
            Sie haben folgende Rechte:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten personenbezogenen Daten verlangen</li>
            <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen</li>
            <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
            <li><strong>Einschränkungsrecht:</strong> Sie können die Einschränkung der Verarbeitung verlangen</li>
            <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung widersprechen</li>
            <li><strong>Datenübertragbarkeit:</strong> Sie können die Übertragung Ihrer Daten verlangen</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. SSL- bzw. TLS-Verschlüsselung
          </h2>
          
          <p className="mb-6">
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            7. Kontakt
          </h2>
          
          <p className="mb-6">
            Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p>
              <strong>Timo Wirkner</strong><br />
              E-Mail: <a href="mailto:info@timwir.eu" className="text-[#008A75] hover:underline">info@timwir.eu</a><br />
              Telefon: <a href="tel:+4952414039367" className="text-[#008A75] hover:underline">05241 / 4039367</a>
            </p>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Stand dieser Datenschutzerklärung: {new Date().toLocaleDateString('de-DE')}
          </p>

          <div className="text-center mt-8">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-[#008A75] text-white rounded-lg hover:bg-[#007A6B] transition-colors duration-200"
            >
              ← Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 