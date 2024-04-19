import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageTooltip from '../images/ImageCircle';
import {
  useAddOrDeleteFavoriteJobMutation,
  useGetUserDetailsQuery,
} from '../../../features/auth/userApiSlice';
import { useSelector } from 'react-redux';
import ToastMessage from '../toast/ToastMessage';

export default function JobTeaserFullWidth({
  jobId,
  image,
  color,
  location,
  date,
  employementType,
  pensum,
  description,
  title,
  link,
  showImage,
  isSponsored,
}) {
  let iconColor = {
    blueGray: 'text-blueGray-500',
    red: 'text-red-500',
    orange: 'text-orange-500',
    amber: 'text-amber-500',
    emerald: 'text-emerald-500',
    teal: 'text-teal-500',
    lightBlue: 'text-lightBlue-500',
    indigo: 'text-indigo-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500',
    primary: 'text-primary-500',
  };
  if (isSponsored) iconColor = 'white';
  const { role } = useSelector((state) => state.auth);
  const [
    addOrDeleteFavorites,
    { data: addOrDeleteResponse, isSuccess, isError },
  ] = useAddOrDeleteFavoriteJobMutation();
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: userDetails } = useGetUserDetailsQuery(null, {
    skip: role === 'employeradmin' || role === 'employer' || !role,
  });

  useEffect(() => {
    if (
      userDetails?.data &&
      userDetails.data?.favourites?.find((el) => el?.id === jobId)
    ) {
      setIsFavorite(true);
    }
  }, [userDetails]);

  const handleFavoritesEvent = (id) => {
    addOrDeleteFavorites(id);
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <ToastMessage
        isSuccess={isSuccess}
        isError={isError}
        successMessage={addOrDeleteResponse?.data || 'Erfolgreich gespeichert'}
      />
      <div className="md:px-8 px-2">
        <Link
          {...link}
          className={`
        hover:scale-[1.01] w-full
        ${
          !isSponsored
            ? 'bg-white'
            : 'bg-gradient-to-r from-primary-500 from-10% to-emerald-500 to-90% text-white'
        } 
         rounded-lg overflow-hidden relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg`}
        >
          <div className="flex flex-col md:py-4 md:px-2 p-2">
            <div
              className={`${
                showImage ? 'md:w-10/12 place-self-end' : 'w-full'
              } md:px-4 px-2 pb-2 flex flex-row justify-end`}
            >
              {/* {isSponsored && (
                <span className="text-sm font-bold">TOP-JOB</span>
              )} */}
              {role &&
                role !== 'employeradmin' &&
                role !== 'employer' &&
                jobId && (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      handleFavoritesEvent(jobId);
                    }}
                    className="flex place-self-end z-99"
                  >
                    {isFavorite ? (
                      <>
                        <span
                          className={`text-sm font-bold ${
                            !isSponsored ? 'text-primary-500' : ''
                          }`}
                        >
                          gespeichert
                        </span>
                        <i
                          className={`fas fa-bookmark hover:animate-pulse text-lg ml-2 ${
                            !isSponsored ? 'text-primary-500' : ''
                          }`}
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-bold">speichern</span>
                        <i className="far fa-bookmark hover:animate-pulse text-lg ml-2" />
                      </>
                    )}
                  </button>
                )}
            </div>

            <div className="flex md:flex-row flex-col">
              {showImage && (
                <div className="md:w-2/12 content-left">
                  <div className="md:w-full w-4/12 mx-auto h-full">
                    <ImageTooltip {...image} />
                  </div>
                </div>
              )}

              <div
                className={`${
                  showImage ? 'md:w-10/12' : 'w-full'
                } md:px-4 px-2 pb-2 flex-auto`}
              >
                <div className="grid grid-cols-1 justify-between">
                  <h4
                    className={`w-full md:text-xl text-lg font-bold leading-tight mt-0 mb-2 my-4 ${
                      !isSponsored ? 'text-blueGray-700' : ''
                    }`}
                  >
                    {title}
                  </h4>
                  <div className="grid grid-cols-2">
                    <h6
                      className={
                        iconColor[color] +
                        ' font-bold md:text-[14px] text-sm mb-2'
                      }
                    >
                      <i className={'fas fa-location-pin mr-1 opacity-75'}></i>{' '}
                      {location || 'location'}
                      <br />
                      <i
                        className={'fa-solid fa-calendar-days mr-1 opacity-75'}
                      ></i>{' '}
                      {new Date(date).toLocaleDateString('de-DE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h6>
                    <h6
                      className={
                        iconColor[color] +
                        ' font-bold md:text-[14px] text-sm mb-2 text-right'
                      }
                    >
                      {employementType || 'Employement Type'} <br />
                      {pensum || 'x% - x%'}
                    </h6>
                  </div>

                  <p className="text-blueGray-500 leading-relaxed text-sm">
                    {description}
                  </p>

                  <div className="w-full flex justify-end align-items-end leading-tight mt-2">
                    <h6
                      className={`md:text-[16px] text-sm font-bold leading-tight text-right  ${
                        !isSponsored ? 'text-primary-500' : ''
                      }`}
                    ></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

JobTeaserFullWidth.defaultProps = {
  jobId: null,
  link: {},
  color: 'blueGray',
  showImage: true,
  isSponsored: false,
};

JobTeaserFullWidth.propTypes = {
  jobId: PropTypes.number,
  image: PropTypes.object,
  icon: PropTypes.string,
  color: PropTypes.oneOf([
    'blueGray',
    'red',
    'orange',
    'amber',
    'emerald',
    'teal',
    'lightBlue',
    'indigo',
    'purple',
    'pink',
    'primary',
  ]),
  location: PropTypes.string,
  date: PropTypes.string,
  employementType: PropTypes.string,
  pensum: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.object,
  showImage: PropTypes.bool,
  isSponsored: PropTypes.bool,
};
