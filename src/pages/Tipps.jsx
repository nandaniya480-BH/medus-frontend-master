import Page from '../anatomy/Page';
import PageContent from '../components/containers/PageContent';
// import PDFExportButton from '../components/elements/buttons/PDFExportButton';

const Tipps = () => {
  return (
    <>
      <Page>
        <PageContent>
          <div className="container mx-auto px-6 md:px-10">
            <h1 className="font-bold text-center text-primary-500 py-6 my-auto md:text-[38px] text-[28px]">
              Vorbereitung und Bewerbung
            </h1>

            <p className="text-blueGray-600 leading-relaxed text-[14px]">
              Vor der Bewerbung sollte man sich im Vorfeld darüber im Klaren
              sein, wo man aktuell im Berufsleben steht und wohin man sich
              weiterentwickeln möchte. Es empfiehlt sich drei bis fünf jährige
              Ziele zu setzen. Dabei sollte man sich folgende Fragen stellen:
            </p>
            <ul className="text-blueGray-600 list-disc text-[14px] ml-10">
              <li>Wo möchte man in drei bis fünf Jahre stehen?</li>
              <li>Welche Position wird angestrebt?</li>
              <li>
                Welche Fähigkeiten und Qualifikationen sind für die gewünschte
                Position relevant?
              </li>
              <li>Welche alternativen Positionen sind auch interessant?</li>
            </ul>
            <p className="text-blueGray-600 leading-relaxed text-[14px]">
              Folgend einige Tipps und Tricks zu allen Aspekten des
              Bewerbungsdossiers.
            </p>

            <h2 className="font-bold text-left text-blueGray-800 py-6 my-auto text-2xl">
              Anschreiben/ Bewerbungsschreiben
            </h2>
            <p className="text-blueGray-600 leading-relaxed text-[14px]">
              Damit Ihr Anschreiben den Personaler überzeugt, muss es
              einzigartig und spannend sein. Das Bewerbungsanschreiben ist in
              der Regel das erste, was er von Ihrer Bewerbung sieht. Hier müssen
              Sie zeigen, dass es sich lohnt, weiterzulesen. Im Gegensatz zum
              Lebenslauf, der das Profil des Bewerbers schärft, spiegelt das
              Anschreiben seine Motivation und Persönlichkeit. Es ist
              entscheidend, dass Sie hier schon die Aufmerksamkeit wecken und
              dem Personaler zeigen, warum Sie sich auf die Stelle bewerben, was
              Sie qualifiziert und wie Sie sich einbringen können und wollen.
              Ein paar Emotionen schaden dabei ganz und gar nicht. Ein optimales
              Bewerbungsschreiben gliedert sich in folgende Bereichen:
            </p>

            <h2 className="font-bold text-left text-blueGray-800 py-6 my-auto text-2xl">
              Lebenslauf/CV
            </h2>

            <p className="text-blueGray-600 leading-relaxed text-[14px]">
              Ein tabellarischer Lebenslauf gehört so selbstverständlich zur
              Bewerbung wie das Anschreiben. Er ist das Herzstück der Bewerbung
              und wird oft noch vor dem Anschreiben gelesen, weil sich für den
              Personaler an den aufgelisteten Kompetenzen und Erfahrungen
              schnell erkennen lässt, ob der Bewerber geeignet ist oder nicht.
              Je übersichtlicher der Lebenslauf gestaltet ist und je leichter es
              der Personalverantwortliche hat, wichtige Informationen über den
              Kandidaten zu finden, desto besser sind seine Chancen, zu einem
              Vorstellungsgespräch eingeladen zu werden. Ein übersichtlicher
              Lebenslauf beinhaltet folgende Aspekte, welche idealerweise in
              einzelnen Abschnitte unterteil werden sollte.
            </p>

            <div className="ml-10 mt-4">
              <ul className="text-blueGray-600 list-disc text-[14px] md:ml-10">
                <li>
                  <strong className="text-[16px]">Persönliche Daten</strong>{' '}
                  <br />
                  (Name, Vorname, Adresse, Tel-Kontaktdaten, Email und
                  Familienstand)
                </li>
                <li>
                  <strong className="text-[16px]">Beruflicher Werdegang</strong>{' '}
                  <br />
                  (Datum, Funktion, Tätigkeit evt. relevante Projektangaben)
                </li>
                <li>
                  <strong className="text-[16px]">Ausbildung</strong> <br />
                  (Datum, Bezeichnung des Abschluss evt. Hauptfächer)
                </li>
                <li>
                  <strong className="text-[16px]">Sprachkenntnisse</strong>{' '}
                  <br />
                  (Sprache und Level)
                </li>
                <li>
                  <strong className="text-[16px]">
                    EDV-Kenntnisse (optional)
                  </strong>{' '}
                  <br />
                  (EDV-Kenntnis und Level)
                </li>
                <li>
                  <strong className="text-[16px]">Referenzen</strong> <br />
                  (Angaben der Referenz oder ansonsten folgenden Text:
                  «Referenzen werden auf Anfrage gerne zu Verfügung gestellt»)
                </li>
              </ul>
            </div>

            <div className="flex flex-row w-full bg-gradient-to-r from-primary-200 to-primary-regular text-white md:px-10 px-5 py-[60px] my-10 rounded-lg">
              <div className="md:w-1/12 w-2/12 text-center align-center mx-auto my-auto">
                <i className="fa-solid fa-lightbulb fa-2xl"></i>
              </div>
              <div className="md:w-11/12 w-10/12 text-sm">
                Mit einem Profil auf medus.work können Sie ganz einfache ihr
                eigenen Lebenslauf automatisch generieren lassen und diesen mit
                nur einem Klick als PDF-Dokument exportieren. Füllen Sie hierfür
                alle Angaben in Ihrem Profil aus.
              </div>
            </div>

            <h2 className="font-bold text-left text-blueGray-800 py-6 my-auto text-2xl">
              Zeugnisse, Diplome, Zertifikate etc.
            </h2>
            <p className="text-blueGray-600 leading-relaxed text-[14px]">
              Ganz allgemein gilt, dass Zeugnisse vollständig einzureichen sind.
              Dazu gehören:
            </p>
            <ul className="text-blueGray-600 list-disc text-[14px] ml-10">
              <li>alle Arbeitszeugnisse</li>
              <li>das Hochschulabschlusszeugnis</li>
              <li>das Berufsausbildungszeugnis</li>
              <li>das Zeugnis über den letzten Schulabschluss</li>
            </ul>

            <h1 className="font-bold text-left text-primary-500 py-6 my-auto md:text-[38px] text-[28px]">
              Vorstellungsgespräche / Bewerbungsgespräch
            </h1>

            <p className="text-blueGray-600 leading-relaxed text-[14px]">
              Werden Sie zu einem Vorstellungsgespräch eingeladen dann haben Sie
              schon mal eine grosse Hürde erfolgreich gemeistert und können
              stolz auf sich sein. Wir gratulieren Ihnen! <br />
              <br />
              Mit folgenden Tipps sind Sie bestens für das Vorstellungsgespräch
              ausgerüstet:
            </p>
            <ul className="text-blueGray-600 list-disc text-[14px] ml-10 mb-10">
              <li>Vorbereitung schafft Sicherheit</li>
              <li>Seien Sie selbstbewusst</li>
              <li>Seien Sie pünktlich ca. 10 min vor Termin Beginn</li>
              <li>
                Ziehen Sie die für die angestrebte Position passende Kleidung an
              </li>
              <li>Versuchen Sie jederzeit authentisch und ehrlich zu sein</li>
              <li>Beantworten Sie die gestellten Fragen konkret und direkt</li>
              <li>Stellen Sie Fragen</li>
              <li>
                Bedanke dich für das Gespräch und verabschieden Sie sich mit
                einem Händedruck
              </li>
            </ul>

            <p className="text-blueGray-600 leading-relaxed text-[14px] font-semibold mt-10 mb-10">
              medus.work wünscht viel Erfolg!
            </p>
          </div>

          {/* <PDFExportButton containerId={'resume-template'} filename={'hamdi'} /> */}
        </PageContent>
      </Page>
    </>
  );
};

export default Tipps;
