export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005A4F] via-[#007A6B] to-[#00A085] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Impressum
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Angaben gemäß § 5 TMG
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="text-lg mb-2">
              <strong>Timo Wirkner</strong><br />
              c/o Timwir.de<br />
              Nussweg 4<br />
              33334 Gütersloh<br />
              Germany
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Kontakt
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-2">
              <strong>E-Mail:</strong> <a href="mailto:info@timwir.eu" className="text-[#008A75] hover:underline">info@timwir.eu</a>
            </p>
            <p className="mb-2">
              <strong>Telefon:</strong> <a href="tel:+4952414039367" className="text-[#008A75] hover:underline">05241 / 4039367</a>
            </p>
            <p className="mb-2">
              <strong>Fax:</strong> 05241 / 6018672
            </p>
            <p>
              <strong>Kontaktformular:</strong> <a href="https://www.timwir.de/kontakt" target="_blank" rel="noopener noreferrer" className="text-[#008A75] hover:underline">www.timwir.de/kontakt</a>
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p>
              Timo Wirkner<br />
              Nussweg 4<br />
              33334 Gütersloh
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Haftungsausschluss
          </h2>

          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Haftung für Inhalte
          </h3>
          <p className="mb-4 text-gray-600">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>

          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Haftung für Links
          </h3>
          <p className="mb-4 text-gray-600">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>

          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Urheberrecht
          </h3>
          <p className="mb-6 text-gray-600">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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