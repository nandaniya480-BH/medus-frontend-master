import React from 'react';
import InfoCardFullBgColor from '../../elements/cards/InfoCardFullBgColor';
import Button from '../../elements/buttons/Button';
import { Link } from 'react-router-dom';

const props = [
  {
    color: 'emerald',
    icon: 'fas fa-magnifying-glass fa-xl',
    title: 'Stellen-Angebote suchen',
    description: 'Schnell und einfach alle passenden Stellen-Angebote finden',
    gradient: true,
  },
  {
    color: 'teal',
    icon: 'fas fa-wand-magic-sparkles fa-xl',
    title: 'Magic-Match',
    description:
      'Durch den Magic-Match von medus.work verpassen Sie keine passenden Stellen-Angebote mehr',
    gradient: true,
  },
  {
    color: 'primary',
    icon: 'fas fa-user-doctor fa-xl',
    title: 'Lass dich finden',
    description:
      'Mit einem medus.work Konto sind Sie für jedes interessierte Unternehmen einfach zu finden und dies jederzeit anonym',
    gradient: true,
  },
  {
    color: 'primary',
    icon: 'fas fa-star fa-xl',
    title: 'Persönliche Favoriten',
    description:
      'Die interessanten Stellen-Angebote können Sie einfach und bequem in ihre persönliche Favoritenliste eintragen',
    gradient: false,
  },
];

export default function InfoServices() {
  return (
    <>
      <h1 className="text-center text-3xl text-blueGray-700 font-bold mt-8">
        Effiziente Stellen-Suche mit einem persönlichen medus.work Konto
      </h1>
      <div className="container mx-auto mb-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:p-0 p-4 md:gap-6 gap-4">
          {props.map((item) => (
            <InfoCardFullBgColor key={item.description} {...item} />
          ))}
        </div>
      </div>

      <div className="container mx-auto text-center mb-10 border-b-[0.5px] pb-10 border-blueGray-300 ">
        <Link
          to={'/register'}
          className="bg-gradient-to-r from-emerald-300 to-primary-regular rounded-full px-6 py-2 text-white font-semibold text-[14px] place-self-end"
        >
          Profil erstellen
        </Link>
      </div>
    </>
  );
}
