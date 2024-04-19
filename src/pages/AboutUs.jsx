import Page from '../anatomy/Page';
import PageContent from '../components/containers/PageContent';

const servicesProps = [
  {
    title: 'Ziel-Gruppe',
    description:
      'Mit täglich mehreren tausend Besuchern deckt medus.work die gewünschte Ziel-Gruppe flächendeckend ab',
    color: 'light',
    icon: 'fas fa-magnifying-glass fa-2xl',
  },
  {
    title: 'Nummer EINS',
    description:
      'Als Nummer EINS bei den Nachwuchskräften erreichen Sie über medus.work alle Young-Talents für Ihr Unternehmen',
    icon: 'fa-solid fa-trophy fa-2xl',
  },
  {
    title: 'Magic-Match',
    description:
      'Durch den Magic-Match von medus.work verpassen Sie keine passenden Stellen-Angebote mehr',
    icon: 'fas fa-wand-magic-sparkles fa-2xl',
  },
  {
    title: 'Modersnte Platform',
    description:
      'Die medus.work Plattform ist für alle auf allen gängigen Devices erhältlich',
    icon: 'fa-solid fa-mobile fa-2xl',
  },
  {
    title: 'Bestes-Preisleistungsverhältnis',
    description: 'medus.work hat das beste Preis-Leistungs-Verhältnis',
    icon: 'fa-solid fa-tags fa-2xl',
  },
  {
    title: 'Schweizer Datenhost',
    description:
      'Als Schweizer Unternehmen hosten wir auch unsere Daten in Rechenzentren in der Schweiz. Bei uns gelten stets Schweizer Rechte und Pflichten',
    icon: 'fa-solid fa-server fa-2xl',
  },
];

const AboutUs = () => {
  return (
    <>
      <Page>
        <PageContent>
          <div className="container mx-auto px-6 md:px-10">
            <h1 className="font-bold text-center text-primary-500 py-6 my-auto md:text-[38px] text-[28px]">
              Weshalb medus.work ?
            </h1>

            <h6 className="font-semiBold text-center my-auto text-xl mb-6">
              Aus diesen Gründen sollten Sie auf medus.work setzen!
            </h6>

            <p className="text-blueGray-600 leading-relaxed text-[14px]">
              <span className="text-primary-500">medus.work</span> ist das
              Stellenportal für Fachkräfte im Gesundheitswesen. Wir verfügen
              über die grösste Datenbank an Fachkräften des Gesundheitswesens
              und sind zugleich die Nummer EINS bei den Nachwuchskräften. Unser
              ausgeklügeltes System gleicht durch unseren Magic- Match mit Hilfe
              von intelligenten Algorithmen und durch den Einsatz von
              künstlicher Intelligenz die Job-Anforderungen und die
              unterschiedlichen Profile unserer umfangreichen Datenbank ab. Die
              Plattform analysiert Ihr Stelleninserat uns setzt automatisch alle
              eruierten Parameter für den Magic-Match. So wird sichergestellt,
              dass jede Vakanz passend besetzt wird. Unsere Plattform vermittelt
              Ihnen das Fachpersonal, welches sie nur bedingt durch ein
              gewöhnliches Job-Inserat erreichen. Durch die Plattform
              medus.work, welche für alle Geräte vorhanden ist, unterstützen wir
              aktiv Arbeitgeber und Arbeitnehmer bei der Besetzung jeder Vakanz.
            </p>

            <h2
              id="employers"
              className="font-bold text-left text-blueGray-800 py-6 my-auto text-2xl md:mx-[4rem] mx-[2rem]"
            >
              Vorteile für Arbeitnehmer
            </h2>

            <ul className="text-blueGray-600 list-disc text-[14px] md:mx-[6rem] mx-[2rem]">
              <li>Schnell und unkompliziert die passende Stelle finden</li>
              <li>
                Werde von unterschiedlichen Arbeitgebern mit Hilfe deines
                anonymisierten medus.work-Profile entdeckt.
              </li>
              <li>
                Erhalten durch unseren Magic-Match jederzeit die passenden
                Job-Inserate nach deinen Präferenzen
              </li>
              <li>
                Durch medus.work entgehen Dir keine Stellen-Inserate mehr. Mit
                Hilfe des Magic-Match und eine korrekte Kategorisierung gehen
                Stellen-Inserate nicht, wie bei vielen herkömmlichen
                Job-Portalen in einer unübersichtlichen Massenflut unter.
              </li>
              <li>
                Erstelle einen übersichtlichen Lebenslauf (CV) mit Hilfe der
                medus.work Plattform
                <br /> <i className="fa fa-arrow-right"></i> und vieles mehr
                jederzeit <strong>kostenlos</strong>.
              </li>
            </ul>

            <h2
              id="employees"
              className="font-bold text-left text-blueGray-800 py-6 my-auto text-2xl md:mx-[4rem] mx-[2rem]"
            >
              Vorteil für Arbeitgeber
            </h2>
            <ul className="text-blueGray-600 list-disc text-[14px] md:mx-[6rem] mx-[2rem]">
              <li>
                Mit täglich mehreren tausend Besuchern deckt medus.work die
                gewünschte Zielgruppe schweizweit flächendeckend ab
              </li>
              <li>
                Als Nummer EINS bei den Nachwuchskräften erreichen Sie über
                medus.work alle Young-Talents für Ihr Unternehmen
              </li>
              <li>
                Mit Hilfe des Magic Matches besetzten Sie jede Vakanz und
                erzielen Einsparungen in allen Aspekten des
                Rekrutierungsprozesses
              </li>
              <li>
                Ihr Stellen-Inserat geht nicht wie bei vielen Stellen-Portale in
                einer unübersichtlichen Flut von Inseraten unter
              </li>
              <li>
                Sie erhalten Zugriff auf eine umfangreiche Kandidaten-Datenbank
                und erhalten die Möglichkeit zusätzlich zu den
                Kandidaten-Empfehlungen seitens medus.work, auch aktiv und
                eigenständig, das passende Personal zu kontaktieren
              </li>
              <li>
                meduUS.ch verfügt über die modernste Plattform, was dazu führt,
                dass Ihr Inserat auf allen Endgeräten jederzeit verfügbar ist
              </li>
              <li>
                Bestes Preis-Leistungs-Verhältnis
                <br />
                <span className="font-bold">... und vieles mehr.</span>{' '}
              </li>
            </ul>

            <div className="md:w-10/12 mx-auto bg-gradient-to-r from-primary-200 to-primary-regular text-white rounded-lg mt-10 md:p-4 mb-10">
              <div className="flex flex-col w-full mb-2 text-left">
                {servicesProps.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-row w-full border-b-[0.5px] last:border-none p-3 justify-between"
                  >
                    <div className="md:w-1/12 w-1/12 text-sm my-auto">
                      <i className={item.icon}></i>
                    </div>
                    <div className="md:w-11/12 w-10/12 place-self-end mr-0">
                      <h4 className="text-md font-bold">{item.title}</h4>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default AboutUs;
