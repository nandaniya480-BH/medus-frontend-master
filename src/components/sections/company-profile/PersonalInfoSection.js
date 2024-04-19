import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const PersonalInfoSection = ({
  isCompanyLoaded = false,
  company,
  categoryType,
}) => {
  const genders = {
    male: 'Herr',
    female: 'Frau',
  };

  const textSkeletonLoader = (width = 12) => (
    <div role="status" className="w-12/12 animate-pulse mt-2">
      <div className="flex justify-start items-center">
        <div
          className={`w-${
            width === 12 ? 'full' : width + '/12'
          }  h-2 bg-gray-300 rounded-full dark:bg-gray-300`}
        ></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      <div className="w-full mt-6 rounded-lg shadow-lg p-4 font-semibold text-blueGray-700">
        <div className="flex md:flex-row flex-row justify-between">
          <h2 className="text-lg font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Unternehmensdaten
          </h2>
          <Link
            to={'/company/profile/edit/company-info'}
            className="text-blueGray-500 font-semibold text-[16px]"
          >
            <i className="fa-solid fa-pen-to-square"></i> Profil Bearbeiten
          </Link>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12 break-words">Name: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded ? company?.name || 'leer' : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12 break-words">Art: </span>
          <span className="w-8/12 md:w-9/12">
            {isCompanyLoaded
              ? company?.category?.name || 'leer'
              : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12 break-words">Größe: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded ? company?.size || 'leer' : textSkeletonLoader(2)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Adresse / Nr.: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded
              ? company?.address || 'leer'
              : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">PLZ/Ort: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded
              ? (company?.plz?.plz || 'leer') + ' / ' + (company?.ort || 'leer')
              : textSkeletonLoader(6)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Kanton: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded
              ? company?.kantone?.name || 'leer'
              : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Website: </span>
          {isCompanyLoaded ? (
            company?.page_url ? (
              <a
                href={company.page_url}
                target="_blank"
                className="md:w-9/12 w-8/12 text-primary-500"
              >
                <i className="fas fa-link"></i> {company?.page_url}
              </a>
            ) : (
              'leer'
            )
          ) : (
            textSkeletonLoader(6)
          )}
        </div>
        <div className="w-full flex flex-col justify-start font-semibold text-blueGray-700">
          <span className="w-full">Unternehmensbeschreibung: </span>
          <blockquote className="w-full italic font-normal text-[14px] border-l-2 border-blueGray-800 px-2 my-1">
            {isCompanyLoaded ? (
              company?.description || 'leer'
            ) : (
              <>
                {textSkeletonLoader()}
                {textSkeletonLoader()}
                {textSkeletonLoader()}
              </>
            )}
          </blockquote>
        </div>
      </div>

      <div className="w-full mt-6 rounded-lg shadow-lg p-4 font-semibold text-blueGray-700">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-2 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Kontaktdaten
          </h2>
          <Link
            to={'/company/profile/edit/company-info'}
            className="text-blueGray-500 font-semibold text-[16px]"
          >
            <i className="fa-solid fa-pen-to-square"></i> Profil Bearbeiten
          </Link>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Geschlecht: </span>
          <span className="w-8/12 md:w-9/12">
            {isCompanyLoaded
              ? genders[company?.c_p_gender] || 'leer'
              : textSkeletonLoader(2)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Vorname: </span>
          <span className="kd:w-9/12 w-8/12">
            {isCompanyLoaded
              ? company?.c_p_name || 'leer'
              : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Nachname: </span>
          <span className="mdw-9/12 w-8/12">
            {isCompanyLoaded
              ? company?.c_p_surname || 'leer'
              : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">E-mail: </span>
          <span className="md:w-9/12 w-8/12 flex flex-col gap-1 last:mb-2">
            {/* Needs to be discussed where where and which emails to show */}
            <span>
              {isCompanyLoaded
                ? company?.email || 'leer'
                : textSkeletonLoader(2)}{' '}
            </span>
            <span>
              {isCompanyLoaded
                ? company?.c_p_email || 'leer'
                : textSkeletonLoader(2)}
            </span>
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Telefon: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded
              ? company?.c_p_phone || 'leer'
              : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Fax: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded
              ? company?.c_p_fax || 'leer'
              : textSkeletonLoader(4)}
          </span>
        </div>
      </div>

      <div className="w-full mt-6 rounded-lg shadow-lg p-4 font-semibold text-blueGray-700">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Rechnungsadresse
          </h2>
          <Link
            to={'/company/profile/edit/company-info'}
            className="text-blueGray-500 font-semibold text-[16px]"
          >
            <i className="fa-solid fa-pen-to-square"></i> Profil Bearbeiten
          </Link>
        </div>

        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Team E-mail: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded
              ? company?.team_email || 'leer'
              : textSkeletonLoader(6)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Telefon: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded ? company?.phone || 'leer' : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start">
          <span className="md:w-3/12 w-4/12">Fax: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded ? company?.fax || 'leer' : textSkeletonLoader(4)}
          </span>
        </div>
      </div>

      <div className="w-full mt-6 rounded-lg shadow-lg p-4 font-semibold text-blueGray-700">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Job Beneftis
          </h2>
          <Link
            to={'/company/profile/edit/company-info'}
            className="text-blueGray-500 font-semibold text-[16px]"
          >
            <i className="fa-solid fa-pen-to-square"></i> Profil Bearbeiten
          </Link>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start mb-2">
          <span className="md:w-3/12 w-4/12">Ferientage: </span>
          <span className="md:w-9/12 w-8/12">
            {isCompanyLoaded
              ? company?.holidays || 'leer'
              : textSkeletonLoader(2)}
          </span>
        </div>
        <div className="w-full flex flex-col justify-start font-semibold text-blueGray-700">
          <span className="w-full">Benefits: </span>
          <blockquote className="w-full italic font-normal text-[14px] border-l-2 border-blueGray-800 px-2 my-1">
            {isCompanyLoaded
              ? company?.benefits || 'leer'
              : textSkeletonLoader(10)}
          </blockquote>
        </div>
        <div className="w-full flex flex-col justify-start font-semibold text-blueGray-700">
          <span className="w-full">Mutterschaftsentschädigung: </span>
          <blockquote className="w-full italic font-normal text-[14px] border-l-2 border-blueGray-800 px-2 my-1">
            {isCompanyLoaded
              ? company?.maternity_benefits || 'leer'
              : textSkeletonLoader(10)}
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoSection;
