import React from 'react';
import { Link } from 'react-router-dom';
import { languageLevels } from '../../../pages/auth/user-profile/utilities';

const PersonalInfoSection = ({ isUserLoaded = false, user, categoryType }) => {
  const textSkeletonLoader = (width) => (
    <div role="status" className="w-10/12 animate-pulse py-auto self-center">
      <div className="flex justify-start items-center">
        <div
          className={`w-${width}/12  h-2 bg-gray-300 rounded-full dark:bg-gray-300`}
        ></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
  const genders = {
    male: 'Herr',
    female: 'Frau',
  };

  const workTimeOptions = [
    'leer',
    'Regelmässig',
    'unregelmässig',
    'Regelmässig und unregelmässig',
  ];
  const positionOptions = [
    'leer',
    'mit Führungsaufgaben',
    'ohne Führungsaufgaben',
    'mit Führungsaufgaben und ohne Führungsaufgaben',
  ];

  return (
    <>
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      <p className="text-sm text-center">
        Die Profil-Daten sind nur für Dich ersichtlich. Ein Arbeitgeber erhält
        erst nach Deiner Zustimmung zu einer Anfrage Einsicht in dein Profil.
      </p>
      <div className="w-full mt-6 rounded-lg shadow-lg p-4">
        <div className="flex md:flex-row flex-row justify-between">
          <h2 className="text-lg font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Meine Personalien
          </h2>
          <Link
            to={'/user/profile/edit/personal-info'}
            className="text-blueGray-500 font-semibold text-[16px]"
          >
            <i className="fa-solid fa-pen-to-square"></i> Bearbeiten
          </Link>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Vorname: </span>
          <span className="md:w-9/12 w-8/12 flex">
            {isUserLoaded ? user?.name : textSkeletonLoader(2)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Nachname: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded ? user?.last_name : textSkeletonLoader(2)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Geschlecht: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded ? genders[user?.gender] : textSkeletonLoader(2)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Geburtsdatum: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded ? user?.age || 'leer' : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">E-mail: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded ? user?.email : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Adresse / Nr.: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded ? user?.address || 'leer' : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">PLZ/Ort: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded
              ? (user?.plz?.plz || 'leer') + ' / ' + (user?.ort || 'leer')
              : textSkeletonLoader(6)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Kanton: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded
              ? user?.kantone?.name || 'leer'
              : textSkeletonLoader(6)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Telefon: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded ? user?.phone || 'leer' : textSkeletonLoader(6)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Mobile: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded ? user?.mobile || 'leer' : textSkeletonLoader(8)}
          </span>
        </div>
        <div className="w-full flex flex-col justify-start font-semibold text-blueGray-700">
          <span className="w-full">Mein Kurzprofil: </span>
          <blockquote className="w-full italic font-normal text-[14px] border-l-2 border-blueGray-800 px-2 my-1">
            {isUserLoaded
              ? user?.description || 'leer'
              : textSkeletonLoader(10)}
          </blockquote>
        </div>
      </div>

      <div className="w-full mt-6 rounded-lg shadow-lg p-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-2 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Meine Job Präfeerenzen
          </h2>
          <Link
            to={'/user/profile/edit/preferences'}
            className="text-blueGray-500 font-semibold text-[16px]"
          >
            <i className="fa-solid fa-pen-to-square"></i> Bearbeiten
          </Link>
        </div>
        <div className="flex flex-row justify-between">
          <small className="text-blueGray-700 text-[12px] font-semibold leading-tight">
            <i className="fa-solid fa-circle-info fa-lg"></i> Diese
            Informationen dienen dazu dir passende Stellen-Inserate zu empfehlen
            so wie dein anonymes Profil den Arbeitgebern zu prasentieren.
          </small>
        </div>

        <div className="w-full flex flex-row gap-2 mt-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Job Kategorie: </span>
          <span className="w-8/12 md:w-9/12 flex flex-col last:mb-4 text-[15px]">
            {isUserLoaded
              ? user?.job_sub_categories?.map((item) => (
                  <span key={item?.id} className="">
                    ● {item?.name}
                  </span>
                ))
              : textSkeletonLoader(6)}
            {!user?.job_sub_categories?.length && 'leer'}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Anstellungsart: </span>
          <span className="w-8/12 md:w-9/12 flex flex-col last:mb-4 text-[15px]">
            {isUserLoaded
              ? user?.contract_types?.map((item) => (
                  <span key={item?.id}>● {item?.name}</span>
                ))
              : textSkeletonLoader(6)}
            {!user?.contract_types?.length && 'leer'}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Pensum: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded
              ? (user?.workload_from || '0 ') +
                '%' +
                ' - ' +
                (user?.workload_to || '100 ') +
                '%'
              : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Arbeitsdistanz: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded
              ? (user?.prefered_distance || 'distanz ') + ' km'
              : textSkeletonLoader(4)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Arbeitszeiten: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded
              ? workTimeOptions[user?.work_time] || 'leer'
              : textSkeletonLoader(8)}
          </span>
        </div>
        <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-700">
          <span className="md:w-3/12 w-4/12">Position: </span>
          <span className="w-8/12 md:w-9/12 flex">
            {isUserLoaded
              ? positionOptions[user?.position] || 'leer'
              : textSkeletonLoader(8)}
          </span>
        </div>
      </div>

      <div className="w-full mt-6 rounded-lg shadow-lg p-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Berufserfahrung
          </h2>
        </div>
        {isUserLoaded
          ? user?.work_experiences?.map((item, index) => (
              <div
                key={item?.position_title + index}
                className="border-b-[0.5px] border-blueGray-300 pb-4"
              >
                <div className="w-full text-right">
                  <Link
                    to={'/user/profile/edit/work-experience'}
                    state={{ workExperienceItem: item }}
                    className="text-blueGray-500 font-semibold text-[16px] place-self-end self-end"
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Bearbeiten
                  </Link>
                </div>
                <div className="w-full">
                  <span className="font-semibold text-blueGray-800 text-lg">
                    {item?.position_title}
                  </span>
                </div>

                <div className="w-full flex flex-row gap-2 justify-start font-semibold text-blueGray-800 mt-1">
                  <span className="underline">{item?.employer_name} </span>
                </div>
                <div className="w-full flex flex-row gap-2 justify-start text-sm mt-2 font-semibold text-blueGray-700">
                  <span className="w-full">
                    <i className="fa-solid fa-calendar-days"></i>{' '}
                    {item?.start_date} -{' '}
                    {item?.end_date ? item?.end_date : 'aktuell'}
                  </span>
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: item?.activitites }}
                  className="w-full gap-2 justify-start text-sm mt-2 font-semibold text-blueGray-700"
                />
              </div>
            ))
          : textSkeletonLoader(6)}
        {!user?.work_experiences?.length && isUserLoaded && (
          <small className="text-sm">
            keine Berufserfahrungen vorhanden...
          </small>
        )}
        <div className="flex flex-row justify-end pt-3">
          <Link
            to={'/user/profile/edit/work-experience'}
            className="text-primary-500 font-semibold text-[14px]"
          >
            <i className="fa-solid fa-add"></i>{' '}
            {user?.work_experiences?.length !== 0 && 'Weiteres'} Berufserfahrung
            hinzufügen
          </Link>
        </div>
      </div>
      <div className="w-full mt-6 rounded-lg shadow-lg p-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Kompetenzen / Fähigkeiten
          </h2>
          <Link
            to={'/user/profile/edit/soft-skills'}
            className="text-blueGray-500 font-semibold text-[16px]"
          >
            <i className="fa-solid fa-pen-to-square"></i> Bearbeiten
          </Link>
        </div>

        <div className="w-full flex flex-wrap gap-2 justify-start font-semibold">
          {isUserLoaded
            ? user?.soft_skills?.map((item) => (
                <span
                  key={item?.name}
                  className="bg-gradient-to-r from-primary-200 to-primary-regular text-white py-1 px-3 text-xs rounded-full"
                >
                  {item?.name}
                </span>
              ))
            : textSkeletonLoader(6)}
          {!user?.soft_skills?.length && isUserLoaded && (
            <small className="text-sm font-medium">
              keine Kompetenzen vorhanden...
            </small>
          )}
        </div>
      </div>

      <div className="w-full mt-6 rounded-lg shadow-lg p-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Aus- und Weiterbildung
          </h2>
        </div>

        {isUserLoaded
          ? user?.educations?.map((item) => (
              <div
                key={item?.name}
                className="border-b-[0.5px] border-blueGray-300 mt-4 pb-4"
              >
                <div className="w-full text-right">
                  <Link
                    to={'/user/profile/edit/education'}
                    state={{ educationItem: item }}
                    className="text-blueGray-500 font-semibold text-[16px]"
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Bearbeiten
                  </Link>
                </div>

                <div className="w-full ">
                  <span className="font-semibold text-blueGray-800 text-lg text-wrap">
                    {item?.name}
                  </span>
                </div>
                <div className="w-full flex flex-row gap-2 justify-start text-sm mt-2 font-semibold text-blueGray-700">
                  <span className="w-full">
                    <i className="fa-solid fa-calendar-days"></i>{' '}
                    {item?.start_date} -{' '}
                    {item?.end_date ? item?.end_date : 'aktuell'}
                  </span>
                </div>
              </div>
            ))
          : textSkeletonLoader(6)}
        {!user?.educations?.length && isUserLoaded && (
          <small className="text-sm font-medium">
            keine Aus- und Weiterbildung vorhanden...
          </small>
        )}
        <div className="flex flex-row justify-end pt-3">
          <Link
            to={'/user/profile/edit/education'}
            className="text-primary-500 font-semibold text-[14px]"
          >
            <i className="fa-solid fa-add"></i>{' '}
            {user?.educations?.length !== 0 && 'Weiteres'} Aus- und
            Weiterbildung hinzufügen
          </Link>
        </div>
      </div>

      <div className="w-full mt-6 rounded-lg shadow-lg p-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2">
            Sprachkenntnisse
          </h2>
          <Link
            to={'/user/profile/edit/languages'}
            className="text-blueGray-500 font-semibold text-[16px]"
          >
            <i className="fa-solid fa-pen-to-square"></i> Bearbeiten
          </Link>
        </div>

        <div className="w-full flex flex-col border-blueGray-300 pt-4 pb-4">
          {isUserLoaded
            ? user?.languages?.map((item) => (
                <div
                  key={item?.name}
                  className="w-full flex flex-row gap-4 justify-start font-semibold text-blueGray-700"
                >
                  <span className="underline">{item?.name} : </span>
                  <span className="">
                    {languageLevels[item?.level]?.label}
                  </span>{' '}
                  <br />
                </div>
              ))
            : textSkeletonLoader(6)}
          {!user?.languages?.length && isUserLoaded && (
            <small className="text-sm">keine Sprachen vorhanden...</small>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonalInfoSection;
