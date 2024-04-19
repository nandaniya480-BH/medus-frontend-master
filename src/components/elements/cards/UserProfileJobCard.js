import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileJobCard = ({
  type,
  extraCardClasses,
  job = {},
  addOrDeleteFavorites,
  handleRequest,
}) => {
  // const status = {
  //   pending: 'Anstehende anfrage...',
  //   accepted: 'Akzeptiert',
  //   declined: 'Abgelehnt',
  // };

  return (
    <div
      className={'shadow-lg rounded-lg bg-white px-4 py-2 ' + extraCardClasses}
    >
      <div className="w-full flex flex-row justify-between border-b-[0.5px] border-blueGray-300">
        <span className="font-bold text-blueGray-800 text-md">{type}</span>
        {type !== 'Favoriten' && (
          <button
            onClick={() => handleRequest(job?.pivot?.id, 'declined')}
            className="font-bold text-sm "
          >
            <i className="fa-solid fa-times text-red-500"></i>
          </button>
        )}
      </div>
      <div className="w-full grid grid-cols-1 content-around gap-4 py-4 text-center">
        {type === 'Empfehlung' && (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-xl text-blueGray-500">
              Match:{' '}
              <span className="font-bold text-blueGray-800">
                {job?.pivot?.employee_match}%
              </span>
            </h2>
            <div className="h-1 w-10/12 bg-blueGray-300 rounded-full">
              <div
                className="h-1 bg-gradient-to-r from-primary-200 to-primary-regular rounded-full"
                style={{ width: job?.pivot?.employee_match }}
              ></div>
            </div>
          </div>
        )}

        <h2 className="font-bold text-md text-blueGray-800">
          {job.job_title || 'Job Title'}
        </h2>

        <p className="font-semibold text-sm text-blueGray-500">
          {job.ort || 'Kantone'}
        </p>

        <div className="w-full flex flex-col text-center  gap-2">
          <p className="font-bold text-blueGray-700">
            {job?.employer?.name || 'Company Name'}
          </p>
          <p className="font-bold text-xs text-blueGray-400">
            <i className={'fa-solid fa-calendar-days mr-1 opacity-75'}></i>
            {new Date(job?.created_at).toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="font-semibold text-sm text-blueGray-400">
            {job?.contract_type?.name}
          </p>
        </div>

        <div className="w-full gap-4 flex flex-col place-self-stretch items-center text-center">
          {job?.slug && (
            <Link
              to={'/job/' + job?.slug}
              className="w-8/12 px-3 py-1.5 text-white text-sm font-semibold bg-blueGray-600 rounded-full"
            >
              Job Anschauen
            </Link>
          )}

          {type === 'Anfrage' && (
            <>
              {job?.pivot?.employee_response === 'pending' && (
                <button
                  onClick={() => handleRequest(job?.pivot?.id, 'accepted')}
                  className="w-8/12 px-3 py-1.5 text-white text-sm font-semibold bg-gradient-to-r from-primary-200 to-primary-regular rounded-full"
                >
                  Annehmen
                </button>
              )}
              {job?.pivot?.employee_response === 'accepted' && (
                <div className="w-full text-primary-500 font-bold text-md">
                  Akzeptiert <i className="fas fa-check-circle"></i>
                </div>
              )}
              {job?.pivot?.employee_response === 'declined' && (
                <div className="w-full text-red-500 font-bold text-md">
                  Abgelehnt <i className="fas fa-times-circle"></i>
                </div>
              )}
            </>
          )}

          {type === 'Favoriten' && (
            <button
              onClick={() => addOrDeleteFavorites(job?.id)}
              className="w-8/12 px-3 py-1.5 text-white text-sm font-semibold bg-red-500 rounded-full"
            >
              <i className="fa-solid fa-times fon-bold"></i> Entfernen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileJobCard;
