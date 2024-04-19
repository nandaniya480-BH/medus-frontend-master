import React from 'react';
import userImagePlaceholder from '../../../assets/img/user_placeholder.png';
import ImageTooltip from '../images/ImageCircle';

const CompanyProfileCandidateCard = ({
  jobId = null,
  type,
  extraCardClasses,
  candidate = {},
  contactedEmployeeInfo,
  handleContactEmployee,
  handleAnnonymousProfile,
}) => {
  const userImageProps = {
    image: userImagePlaceholder,
    text: false,
    alt: 'Kandidat Bild',
  };
  const contactRequestStatus =
    contactedEmployeeInfo?.find(
      (el) => el?.pivot?.employee_id === candidate?.id
    )?.pivot?.employee_response || undefined;
  const status = {
    pending: 'Anstehende anfrage...',
    accepted: 'Akzeptiert',
    declined: 'Abgelehnt',
  };

  return (
    <div className={'shadow-lg rounded-lg px-4 py-2 ' + extraCardClasses}>
      <div className="w-full flex flex-row justify-between border-b-[0.5px] border-blueGray-300">
        <span className="font-bold text-blueGray-800 text-md">{type}</span>
        {/* <button className="font-bold text-sm ">
          <i className="fa-solid fa-times text-red-500"></i>
        </button> */}
      </div>
      <div className="w-full flex flex-col gap-3.5 py-4 justify-center items-center text-center">
        {type === 'Empfehlung' && (
          <div className="w-8/12 flex flex-col items-center mb-4">
            <h2 className="text-xl text-blueGray-700 font-semibold">
              Match:{' '}
              <span className="font-bold text-blueGray-700">
                {candidate.magicMatchValue || '84%'}
              </span>
            </h2>
            <div className="h-1 w-10/12 bg-blueGray-300 rounded-full">
              <div
                className="h-1 bg-gradient-to-r from-primary-200 to-primary-regular rounded-full"
                style={{ width: '84%' }}
              ></div>
            </div>
          </div>
        )}

        {!contactRequestStatus && (
          <>
            <div
              className={`w-4/12 text-center ${
                !contactRequestStatus ? 'blur-md' : ''
              }`}
            >
              <ImageTooltip {...userImageProps} />
            </div>

            <h2 className="font-bold text-md text-blueGray-700 blur-sm ">
              xxxxxxxxxx
            </h2>

            <h2 className="font-bold text-md text-blueGray-700 blur-sm ">
              xxxxx
            </h2>

            <h2 className="font-bold text-md text-blueGray-700 blur-sm ">
              xxxxxxxxxx
            </h2>
          </>
        )}

        {contactRequestStatus && (
          <>
            <div className="w-4/12 text-center">
              <ImageTooltip {...userImageProps} />
            </div>

            <h2 className="font-bold text-md text-blueGray-700">
              {candidate?.name || 'Granit Sejdiu'}
            </h2>

            <h2 className="font-bold text-md text-blueGray-700">
              {candidate?.jobCategory || 'Anasthesie'}
            </h2>

            <h2 className="font-bold text-md text-blueGray-700">
              {candidate?.email || 'granit.sejdiu@gmail.com'}
            </h2>
          </>
        )}

        <button
          onClick={() =>
            handleAnnonymousProfile(candidate?.user_id, contactRequestStatus)
          }
          className="w-8/12 px-3 py-1.5 text-white text-sm font-semibold bg-blueGray-600 rounded-full"
        >
          Profil Anschauen
        </button>

        {!contactRequestStatus && (
          <button
            onClick={() =>
              handleContactEmployee(jobId, candidate?.pivot?.employee_id)
            }
            className="w-8/12 px-3 py-1.5 text-white text-sm font-semibold bg-gradient-to-r from-primary-200 to-primary-regular rounded-full"
          >
            Kontaktieren
          </button>
        )}
        {contactRequestStatus && (
          <>
            {contactRequestStatus === 'pending' && (
              <span className="w-full px-3 py-1.5 text-blueGray-700 text-sm font-bold">
                {status[contactRequestStatus]}{' '}
                <i className="fas fa-hourglass-start animate-pulse"></i>
              </span>
            )}
            {contactRequestStatus === 'accepted' && (
              <span className="w-full px-3 py-1.5 text-primary-500 text-sm font-bold">
                {status[contactRequestStatus]}{' '}
                <i className="fas fa-check-circle"></i>
              </span>
            )}
            {contactRequestStatus === 'declined' && (
              <span className="w-full px-3 py-1.5 text-red-500 text-sm font-bold">
                {status['declined']} <i className="fas fa-times-circle"></i>
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyProfileCandidateCard;
