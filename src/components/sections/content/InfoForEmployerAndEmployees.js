import React from 'react';
import logo1 from '../../../assets/img/pvermittlung.jpg';
import logo2 from '../../../assets/img/fur_arbeitnehmer.jpg';
import InfoCardFullBgImage from '../../elements/cards/InfoCardFullBgImage';

const forEmployerProps = {
  title: 'Für Arbeitgeber',
  description:
    'medus.work ist das Stellenportal für Fachkräfte im Gesundheitswesen. Wir verfügen über die grösste Datenbank an Fachkräften des Gesundheitswesens und sind zugleich die Nummer EINS bei den Nachwuchskräften. Unser ausgeklügeltes System gleicht durch unseren Magic-Match mit Hilfe von intelligenten Algorithmen und durch den Einsatz von künstlicher Intelligenz die Job-Anforderungen und die unterschiedlichen Profile unserer umfangreichen Datenbank ab...',
  bgImage: logo1,
  userimage: '',
  username: '',
  user: { href: '#pablo' },
  link: {
    to: '/about-us#employees',
    children: 'Mehr erfahren...',
  },
};

const forEmployeesProps = {
  title: 'Für Arbeitnehmer',
  description:
    'medus.work ist das Stellenportal für Fachkräfte im Gesundheitswesen. Wir verfügen über die grösste Datenbank an Fachkräften des Gesundheitswesens und sind zugleich die Nummer EINS bei den Nachwuchskräften. Unser ausgeklügeltes System gleicht durch unseren Magic-Match mit Hilfe von intelligenten Algorithmen und durch den Einsatz von künstlicher Intelligenz die Job-Anforderungen und die unterschiedlichen Profile unserer umfangreichen Datenbank ab...',
  bgImage: logo2,
  userimage: '',
  username: '',
  user: { href: '#pablo' },
  link: {
    to: '/about-us#employers',
    children: 'Mehr erfahren...',
  },
};

export default function InfoForEmployerAndEmployees() {
  return (
    <>
      <div className="container mx-auto grid md:grid-flow-col md:gap-20 gap-4 md:p-0 p-4 border-b-[0.5px] border-blueGray-300 ">
        <InfoCardFullBgImage {...forEmployerProps} />
        <InfoCardFullBgImage {...forEmployeesProps} />
      </div>
    </>
  );
}
