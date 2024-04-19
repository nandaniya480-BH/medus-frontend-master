import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompanyProfileJobCard = ({
  extraCardClasses,
  job = {},
  setShowDeleteModal,
}) => {
  return (
    <div
      className={'w-full shadow-lg rounded-lg px-4 py-4 ' + extraCardClasses}
    >
      <div className="w-full flex flex-row justify-between border-b-[0.5px] border-blueGray-300 pb-1 gap-4">
        <span className="font-bold text-blueGray-600 text-sm">
          <i className={'fa-solid fa-calendar-days mr-1 opacity-75'}></i>{' '}
          {new Date(job?.created_at).toLocaleDateString('de-DE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <div>
          <Link
            to={'/company/job/edit'}
            state={{ slug: job?.slug }}
            className="font-bold text-sm text-primary-500 mr-4"
          >
            <i className="fa-solid fa-edit"></i> Bearbeiten
          </Link>
          <button
            className="font-bold text-sm text-red-500"
            onClick={() =>
              setShowDeleteModal({
                show: true,
                job: job,
              })
            }
          >
            <i className="fa-solid fa-times"></i> löschen
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row gap-4 pt-4 justify-start items-center text-left">
        <h2 className="font-bold text-md text-blueGray-700">
          {job?.job_title ||
            'Kontaktlinsenspezialist/in 100% für die Augenklinik'}
        </h2>
      </div>

      <div className="w-full flex md:flex-row flex-col gap-4 justify-end align-end text-center mt-2">
        <a
          href={`/job/${job?.slug}`}
          target="_blank"
          className="text-primary-500 mt-1 font-semibold text-sm"
        >
          Vollständiges Inserat ansehen{' '}
          <i className="fa-solid fa-up-right-from-square"></i>
        </a>
        <Link
          to={`/company/job-details/${job?.id}`}
          className="px-3 py-1.5 text-white text-sm font-semibold bg-blueGray-600 rounded-full"
        >
          Personal Emfpehlungen & mehr{' '}
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        </Link>
      </div>
    </div>
  );
};

export default CompanyProfileJobCard;
