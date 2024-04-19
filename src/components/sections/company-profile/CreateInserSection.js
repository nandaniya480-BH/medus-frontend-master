import React from 'react';
import { Link } from 'react-router-dom';
import inserienProcessImg from '../../../assets/img/inserien_process.png';
import ImagePost from '../../elements/images/ImagePost';

const imgProps = {
  src: inserienProcessImg,
  size: 'regular',
};

const CreateInseratSection = ({ categoryType }) => {
  return (
    <>
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      <div className="w-full flex flex-col justify-center mt-4">
        <div className="w-full flex flex-row justify-between">
          <h3 className="font-bold text-center text-primary-500 mt-4 text-2xl">
            So funktionierts:
          </h3>
          <Link
            to={'/company/job/create'}
            className="text-white bg-gradient-to-r from-primary-200 to-primary-regular rounded-full font-semibold px-6 py-3"
          >
            Inserat Erfassen <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
        <div className="w-full flex flex-row my-8 justify-between">
          <ImagePost {...imgProps} />
        </div>
        <div className="w-full">
          <h3 className="font-bold text-center text-primary-500 pb-4 my-auto text-2xl">
            Stellen-Inserat erfassen
          </h3>

          <p className="text-blueGray-600 leading-relaxed text-[14px]">
            <span className="text-primary-500">medus.work</span> ist das
            Stellenportal für Fachkräfte im Gesundheitswesen. Wir verfügen über
            die grösste Datenbank an Fachkräften des Gesundheitswesens und sind
            zugleich die Nummer EINS bei den Nachwuchskräften. Unser
            ausgeklügeltes System gleicht durch unseren Magic- Match mit Hilfe
            von intelligenten Algorithmen und durch den Einsatz von künstlicher
            Intelligenz die Job-Anforderungen und die unterschiedlichen Profile
            unserer umfangreichen Datenbank ab. Die Plattform analysiert Ihr
            Stelleninserat uns setzt automatisch alle eruierten Parameter für
            den Magic-Match. So wird sichergestellt, dass jede Vakanz passend
            besetzt wird. Unsere Plattform vermittelt Ihnen das Fachpersonal,
            welches sie nur bedingt durch ein gewöhnliches Job-Inserat
            erreichen. Durch die Plattform medus.work, welche für alle Geräte
            vorhanden ist, unterstützen wir aktiv Arbeitgeber und Arbeitnehmer
            bei der Besetzung jeder Vakanz.
          </p>

          <h2 className="font-bold text-left text-blueGray-800 py-6 my-auto text-2xl">
            Vorteil für Arbeitgeber
          </h2>
          <ul className="text-blueGray-600 list-disc text-[14px] mx-4 pl-4">
            <li>
              Mit täglich mehreren tausend Besuchern deckt medus.work die
              gewünschte Zielgruppe schweizweit flächendeckend ab
            </li>
            <li>
              Als Nummer EINS bei den Nachwuchskräften erreichen Sie über
              medus.work alle Young-Talents für Ihr Unternehmen
            </li>
            <li>
              Mit Hilfe des Magic Matches besetzten Sie jede Vakanz und erzielen
              Einsparungen in allen Aspekten des Rekrutierungsprozesses
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
        </div>
      </div>
    </>
  );
};

export default CreateInseratSection;
