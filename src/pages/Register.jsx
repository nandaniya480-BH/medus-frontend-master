import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../anatomy/Page';
import PageContent from '../components/containers/PageContent';
import headerImage from '../assets/img/app_banner.jpg';
import CardRegister from '../components/elements/cards/CardRegister';

const userServicesProps = [
  {
    title: 'Stellen-Angebote suche',
    description: 'Schnell und einfach alle passenden Stellen-Angebote finden',
    icon: 'fas fa-magnifying-glass fa-xl',
  },
  {
    title: 'Magic-Match',
    description:
      'Durch den Magic-Match von medus.work verpassen Sie keine passenden Stellen-Angebote mehr',
    icon: 'fas fa-wand-magic-sparkles fa-xl',
  },
  {
    title: 'Lass dich finden',
    description:
      'Mit einem medus.work Konto sind Sie für jedes interessierte Unternehmen einfach zu finden und dies jederzeit anonym',
    icon: 'fas fa-wand-magic-sparkles fa-xl',
  },
  {
    title: 'Persönliche Favoriten',
    description:
      'Die interessanten Stellen-Angebote können Sie einfach und bequem in ihre persönliche Favoritenliste eintragen',
    icon: 'fas fa-star fa-xl',
  },
];

const companyServicesProps = [
  {
    title: 'Ziel-Gruppe',
    description:
      'Mit täglich mehreren tausend Besuchern deckt medus.work die gewünschte Ziel-Gruppe flächendeckend ab',
    color: 'light',
    icon: 'fas fa-magnifying-glass fa-xl',
  },
  {
    title: 'Nummer EINS',
    description:
      'Als Nummer EINS bei den Nachwuchskräften erreichen Sie über medus.work alle Young-Talents für Ihr Unternehmen',
    icon: 'fa-solid fa-trophy fa-xl',
  },
  {
    title: 'Magic-Match',
    description:
      'Durch den Magic-Match von medus.work verpassen Sie keine passenden Stellen-Angebote mehr',
    icon: 'fas fa-wand-magic-sparkles fa-xl',
  },
  {
    title: 'Modersnte Platform',
    description:
      'Die medus.work Plattform ist für alle auf allen gängigen Devices erhältlich',
    icon: 'fa-solid fa-mobile fa-xl',
  },
  {
    title: 'Bestes-Preisleistungsverhältnis',
    description: 'medus.work hat das beste Preis-Leistungs-Verhältnis',
    icon: 'fa-solid fa-tags fa-xl',
  },
  {
    title: 'Schweizer Datenhost',
    description:
      'Als Schweizer Unternehmen hosten wir auch unsere Daten in Rechenzentren in der Schweiz. Bei uns gelten stets Schweizer Rechte und Pflichten',
    icon: 'fa-solid fa-server fa-xl',
  },
];

const cardloginregister = {
  color: 'primary',
  detailsPanel: {
    leftTitle: 'Als Unternehmen registrieren ?',
    leftDescription: 'Hier entland',
    leftButton: {
      children: 'Hier entland',
      size: 'lg',
      outline: true,
      extraStyle: 'bg-white',
    },
    rightTitle: 'Als Arbeitnehmer registrieren ?',
    rightDescription: 'Hier entland',
    rightButton: {
      children: 'Hier entland',
      size: 'lg',
      outline: true,
      extraStyle: 'bg-white',
    },
  },
  leftCard: {
    title: 'Registrieren Sie sich als Arbeitnehmer (User)',
    subtitle:
      'Erstellen Sie schnell und einfach Ihr persönliches medus.work Profil',
    socials: [],
  },
  rightCard: {
    title: 'Registrieren Sie sich als Arbeitgeber (Firmen)',
    subtitle:
      'Erstellen Sie schnell und einfach Ihr medus.work Unternehmensprofil',
    socials: [],
  },
};

export default function LoginRegister() {
  const location = useLocation();
  const [isCompanyRegisterView, setIsCompanyRegisterView] = useState(
    location.search && location.search === '?user' ? true : false
  );
  const updateCompanyRegisterView = (newValue) => {
    setIsCompanyRegisterView(newValue);
  };
  return (
    <>
      <Page>
        <PageContent>
          <div className="bg-white-800  py-8 bg-radial-gradient">
            <h1 className="font-bold text-blueGray-800 text-center my-auto h-full text-3xl">
              Registrieren
            </h1>
            <div className="py-6 container mx-auto px-4">
              <div className="flex flex-wrap -mx-4">
                <div className="mx-auto px-4 relative w-full lg:w-10/12 mb-8">
                  <CardRegister
                    {...cardloginregister}
                    isCompanyRegisterView={isCompanyRegisterView}
                    updateCompanyRegisterView={updateCompanyRegisterView}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary-200 to-primary-regular text-white md:hidden mx-4 lg:hidden rounded-lg py-10 mb-20">
            {!isCompanyRegisterView &&
              userServicesProps.map((item) => (
                <div
                  key={item.title}
                  className="flex border-b-[0.5px] last:border-none mb-2 pb-2 text-left my-auto"
                >
                  <div className="flex-none text-sm align-center mx-auto my-auto w-5 h-5">
                    <i className={item.icon}></i>
                  </div>
                  <div className="flex-initial w-80 ...">
                    <h4 className="text-md font-bold">{item.title}</h4>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
            {isCompanyRegisterView &&
              companyServicesProps.map((item) => (
                <div
                  key={item.title}
                  className="flex border-b-[0.5px] last:border-none mb-2 pb-2 text-left"
                >
                  <div className="flex-none text-sm align-center mx-auto my-auto w-5 h-5">
                    <i className={item.icon}></i>
                  </div>
                  <div className="flex-initial w-80 ...">
                    <h4 className="text-md font-bold">{item.title}</h4>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </PageContent>
      </Page>
    </>
  );
}
