import Page from '../anatomy/Page';
import PageContent from '../components/containers/PageContent';
import Button from '../components/elements/buttons/Button';
import inserienProcessImg from '../assets/img/inserien_process.png';
import ImagePost from '../components/elements/images/ImagePost';

const imgProps = {
  src: inserienProcessImg,
  size: 'regular',
  alt: 'inserien process',
};

const btnProps = {
  outline: true,
  to: '#',
  children: 'Inserat erfassen',
  size: 'lg',
  extraStyle:
    'hover:bg-gradient-to-r hover:from-primary-200 hover:to-primary-regular hover:text-white hover:border-white',
};

const servicesProps = [
  {
    title: 'Easy Integration durch Job-Link, PDF oder Text-Eingabe',
    color: 'light',
    icon: 'fas fa-check fa-xl',
  },
  {
    title: 'Versand Ihres Stellenangebotes per E-Mail an Stellensuchende',
    color: 'light',
    icon: 'fas fa-envelope fa-xl',
  },
  {
    title: 'Publikation auf Mobile sowie Mobile-Push-Nachricht bei allen Usern',
    color: 'light',
    icon: 'fas fa-bell fa-xl',
  },
  {
    title:
      'Publikation Ihres Stellen Inserates auf allen Social-Media Plattformen Linkedin, Xing, Facebook, Twitter usw.',
    color: 'light',
    icon: 'fas fa-share fa-xl',
  },
  { title: 'Erinnerungs-Mail', color: 'light', icon: 'fas fa-bookmark fa-xl' },
  {
    title: 'Aktives Platzieren des Stelleninserates bei Kandidaten',
    color: 'light',
    icon: 'fas fa-paper-plane fa-xl',
  },
  {
    title: 'Cockpit für das Inseratenmanagement',
    color: 'light',
    icon: 'fas fa-table-columns fa-xl',
  },
];

const Inserien = () => {
  return (
    <>
      <Page>
        <PageContent>
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex md:flex-row flex-col gap-4">
              <div className="md:w-8/12 w-full">
                <h1 className="font-bold text-center text-primary-500 py-6 my-auto md:text-[38px] text-[28px]">
                  Weshalb medus.work ?
                </h1>

                <h6 className="font-semiBold text-center my-auto text-xl mb-6">
                  Aus diesen Gründen sollten Sie auf medus.work setzen!
                </h6>

                <p className="text-blueGray-600 leading-relaxed text-[14px]">
                  <span className="text-primary-500">medus.work</span> ist das
                  Stellenportal für Fachkräfte im Gesundheitswesen. Wir verfügen
                  über die grösste Datenbank an Fachkräften des
                  Gesundheitswesens und sind zugleich die Nummer EINS bei den
                  Nachwuchskräften. Unser ausgeklügeltes System gleicht durch
                  unseren Magic- Match mit Hilfe von intelligenten Algorithmen
                  und durch den Einsatz von künstlicher Intelligenz die
                  Job-Anforderungen und die unterschiedlichen Profile unserer
                  umfangreichen Datenbank ab. Die Plattform analysiert Ihr
                  Stelleninserat uns setzt automatisch alle eruierten Parameter
                  für den Magic-Match. So wird sichergestellt, dass jede Vakanz
                  passend besetzt wird. Unsere Plattform vermittelt Ihnen das
                  Fachpersonal, welches sie nur bedingt durch ein gewöhnliches
                  Job-Inserat erreichen. Durch die Plattform medus.work, welche
                  für alle Geräte vorhanden ist, unterstützen wir aktiv
                  Arbeitgeber und Arbeitnehmer bei der Besetzung jeder Vakanz.
                </p>

                <h2 className="font-bold text-left text-blueGray-800 py-6 my-auto text-2xl">
                  Vorteile für Arbeitnehmer
                </h2>

                <ul className="text-blueGray-600 list-disc text-[14px]">
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
                    Durch medus.work entgehen Dir keine Stellen-Inserate mehr.
                    Mit Hilfe des Magic-Match und eine korrekte Kategorisierung
                    gehen Stellen-Inserate nicht, wie bei vielen herkömmlichen
                    Job-Portalen in einer unübersichtlichen Massenflut unter.
                  </li>
                  <li>
                    Erstelle einen übersichtlichen Lebenslauf (CV) mit Hilfe der
                    medus.work Plattform
                    <br /> <i className="fa fa-arrow-right"></i> und vieles mehr
                    jederzeit <strong>kostenlos</strong>.
                  </li>
                </ul>
              </div>
              <div className="md:w-4/12 w-full text-center">
                {/* <div className="w-full border-b-[0.5px] py-8">
                  <Button {...btnProps} />
                </div> */}
                <div className="my-auto px-2">
                  <h2 className="font-bold text-left text-blueGray-800 py-6 my-auto text-xl">
                    Preise
                  </h2>

                  <div className="text-left">
                    <ul className="text-blueGray-600 list-none text-[16px] ">
                      <li className="mb-1">
                        <strong className="flex flex-row">
                          <span className="w-8/12 text-primary-500">
                            Stelleninserat für 35 Tage
                          </span>
                          <span className="w-4/12 ">CHF 0.00.- </span>
                        </strong>
                        <span className="flex flex-rowtext-left text-xs font-bold">
                          <span className="w-8/12 ">
                            * Promotion bis 30.09.2023 statt
                          </span>
                          <span className="w-4/12 ">CHF 249.00.- </span>
                        </span>
                      </li>
                      <li className="mb-1">
                        <strong className="flex flex-row">
                          <span className="w-8/12 text-primary-500">
                            Stelleninserat für 70 Tage
                          </span>
                          <span className="w-4/12 ">CHF 49.00.- </span>
                        </strong>
                        <span className="flex flex-rowtext-left text-xs font-bold">
                          <span className="w-8/12 ">
                            * Promotion bis 30.09.2023 statt
                          </span>
                          <span className="w-4/12 ">CHF 289.00.- </span>
                        </span>
                      </li>
                      <li className="mb-1">
                        <strong className="flex flex-row">
                          <span className="w-8/12 text-primary-500">
                            Stelleninserat für 105 Tage
                          </span>
                          <span className="w-4/12 ">CHF 89.00.- </span>
                        </strong>
                        <span className="flex flex-rowtext-left text-xs font-bold">
                          <span className="w-8/12 ">
                            * Promotion bis 30.09.2023 statt
                          </span>
                          <span className="w-4/12 ">CHF 349.00.- </span>
                        </span>
                      </li>
                      <li className="mb-1">
                        <strong className="flex flex-row">
                          <span className="w-8/12 text-primary-500">
                            All-IN-ONE Push Mail-Nachricht
                          </span>
                          <span className="w-4/12 ">CHF 14.90.- </span>
                        </strong>
                      </li>
                      <li className="mb-1">
                        <strong className="flex flex-row">
                          <span className="w-8/12 text-primary-500">
                            Farblicher Hintergrund des Stelleninserates
                          </span>
                          <span className="w-4/12 ">CHF 39.90.- </span>
                        </strong>
                      </li>
                      <li className="mb-1">
                        <strong className="flex flex-row">
                          <span className="w-8/12 text-primary-500">
                            Anfrage an Fachpersonal
                          </span>
                          <span className="w-4/12 ">CHF 39.90.- </span>
                        </strong>
                      </li>
                      <li className="mb-1 mt-4  border-b-[0.5px] py-2">
                        <strong className="flex flex-row text-right mx-4 text-sm">
                          <span className="w-full ">
                            * alle Preise exkl. 7.7% MwSt.{' '}
                          </span>
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-bold text-center text-blueGray-800 py-10 my-auto text-2xl">
              So funktionierts:
            </h2>
            <ImagePost {...imgProps} />

            <div className="w-full justify-items-center">
              <div className="bg-gradient-to-r from-primary-200 to-primary-regular text-white rounded-lg mt-10 md:p-10 p-4 mb-10 md:w-10/12 mx-auto">
                <div className="flex flex-col w-full mb-2 text-left">
                  {servicesProps.map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-row w-full gap-6 md:gap-4 border-b-[0.5px] last:border-none p-4"
                    >
                      <div className="md:w-1/12 w-2/12 text-sm align-center my-auto w-5 h-5">
                        <i className={item.icon}></i>
                      </div>
                      <div className="md:w-11/12 w-10/12">
                        <h4 className="text-md font-bold">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default Inserien;
