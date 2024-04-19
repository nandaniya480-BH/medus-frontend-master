import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../elements/buttons/Button';
import { Link } from 'react-router-dom';

export default function HeaderJobDetails({
  job,
  image,
  icon,
  shouldShowApplyButton,
  shouldShowLinkToJobPage,
  shouldShowAnchors,
}) {
  return (
    <>
      <div className="p-0 flex items-center relative md:min-h-screen-75 min-h-screen-60">
        <div
          className="absolute w-full h-full bg-cover bg-50 z-1"
          style={{
            backgroundImage: "url('" + image + "')",
          }}
        ></div>
        <div className="absolute w-full h-full bg-black opacity-40 z-2"></div>
        <div className="container mx-auto px-4 z-3">
          <div className="justify-center text-white flex flex-wrap -mx-4">
            <h1 className="text-4xl font-bold leading-tight mt-0 mb-2 mb-12">
              {job?.job_title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 z-3 -mt-32 relative">
        <div className="justify-center flex flex-wrap -mx-4">
          <div className="bg-white rounded-lg shadow-lg w-full md:mx-0 mx-4 py-4">
            <div className="text-center -mt-6">
              <div
                className={
                  'bg-gradient-to-r from-primary-200 to-primary-regular rounded-full text-white w-16 h-16 inline-flex items-center justify-center -mt-6'
                }
              >
                <i className={'p-1 text-xl ' + icon}></i>
              </div>
            </div>
            <blockquote className="text-xl mx-0 mb-2 block text-center mt-2">
              <small className="text-blueGray-500 font-semibold text-sm">
                <i className={'fa-solid fa-calendar-days mr-1 opacity-75'}></i>
                {job?.created_at
                  ? new Date(job?.created_at).toLocaleDateString('de-DE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : new Date().toLocaleDateString('de-DE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
              </small>
            </blockquote>
            <div className="flex flex-col justify-center text-center mx-4 md:mx-16 gap-2">
              <h6 className={'text-blueGray-700 font-semibold text-lg'}>
                <i className="fa-solid fa-hospital"></i> {job?.employer?.name}
              </h6>
              <h6 className={'ext-blueGray-700 font-semibold text-md'}>
                <i className={'fas fa-location-pin mr-1 opacity-75'}></i>{' '}
                {job?.kantone?.name || job?.kantone}
              </h6>
            </div>
            {shouldShowApplyButton &&
              job?.apply_form_url !== '' &&
              job?.apply_form_url !== null && (
                <div className="mb-0 pt-6 pb-8 px-12 leading-relaxed text-center">
                  <a
                    href={job?.apply_form_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary-500 font-bold cursor-pointer"
                  >
                    Jetzt Bewerben{' '}
                    <i className="fa-solid fa-up-right-from-square ml-1"></i>
                  </a>
                </div>
              )}

            {shouldShowLinkToJobPage && (
              <div className="mb-0 pt-6 pb-4 px-12 leading-relaxed text-center">
                <Link
                  to={`/job/${job?.slug}`}
                  className="text-primary-500 mt-1 font-bold"
                >
                  Vollständiges Inserat ansehen{' '}
                  <i className="fa-solid fa-up-right-from-square"></i>
                </Link>
              </div>
            )}
            {shouldShowAnchors && (
              <div className="w-full flex flex-row justify-center gap-6">
                <a
                  href="#suggestions"
                  className="font-bold bg-white border-none text-blueGray-700"
                >
                  <i className="fa-solid fa-wand-magic-sparkles fa-lg"></i>{' '}
                  Empfehlung
                </a>
                <a
                  href="#interested"
                  className="font-bold bg-white border-none text-blueGray-700"
                >
                  <i className="fa-solid fa-star fa-lg"></i> interessanten
                </a>
                <a
                  href="#requests"
                  className="font-bold bg-white border-none text-blueGray-700"
                >
                  <i className="fa-solid fa-envelope-circle-check fa-lg"></i>{' '}
                  Anfragen
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

HeaderJobDetails.defaultProps = {
  shouldShowApplyButton: true,
  shouldShowLinkToJobPage: false,
  shouldShowAnchors: false,
};

HeaderJobDetails.propTypes = {
  // background image source
  image: PropTypes.string,
  title: PropTypes.string,
  companyName: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  icon: PropTypes.string,
  shouldShowApplyButton: PropTypes.bool,
  shouldShowLinkToJobPage: PropTypes.bool,
  shouldShowAnchors: PropTypes.bool,
};
