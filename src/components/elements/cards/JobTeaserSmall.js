import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageTooltip from '../images/ImageCircle';
import {
  useAddOrDeleteFavoriteJobMutation,
  useGetUserJobFavoritesQuery,
} from '../../../features/auth/userApiSlice';

export default function JobTeaserSmall({
  image,
  color,
  location,
  date,
  employementType,
  pensum,
  description,
  title,
  link,
  showImage = true,
  isSponsored,
  jobId,
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
  const [isFavorite, setIsFavorite] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const { data } = useGetUserJobFavoritesQuery(null, {
    skip: role === 'employeradmin' || role === 'employer' || !role,
  });
  const [addOrDeleteFavorites] = useAddOrDeleteFavoriteJobMutation();

  useEffect(() => {
    if (data?.data && data?.data?.find((el) => el.id === jobId)) {
      setIsFavorite(true);
    }
  }, [data, jobId]);

  const handleFavoritesEvent = (id) => {
    addOrDeleteFavorites(id);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="p-[5px]">
      <div className="shadow-lg shadow-top rounded-lg overflow-hidden border border-blueGray-100 relative flex flex-col min-w-0 break-words bg-white w-full mb-6">
        {!role && role !== 'employeradmin' && role !== 'employer' && jobId && (
          <>
            <button
              onClick={() => handleFavoritesEvent(jobId)}
              className="text-right mr-2 mt-2"
            >
              {isFavorite ? (
                <>
                  <span className="font-bold">gespeichert</span>
                  <i className="fas fa-bookmark ml-2"></i>
                </>
              ) : (
                <>
                  <span className="font-bold">speichern</span>
                  <i className="far fa-bookmark ml-2"></i>
                </>
              )}
            </button>
          </>
        )}
        <div className="p-6">
          {showImage && (
            <div className="w-6/12 mx-auto">
              <ImageTooltip {...image} />
            </div>
          )}
        </div>
        <div className="px-6 pb-6 flex-auto">
          <div className="flex flex-col justify-between">
            <h6 className={iconColor[color] + ' font-bold text-sm mb-2'}>
              <i className={'fas fa-location-pin mr-1 opacity-75'}></i>{' '}
              {location}
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
            <h6 className={iconColor[color] + ' font-bold text-sm mb-2'}>
              {employementType} <br />
              {pensum}
            </h6>
          </div>

          <h4 className="text-xl font-semibold leading-tight mt-0 mb-2 my-4">
            {link && link.to ? (
              <Link {...link} className="">
                {title}
              </Link>
            ) : (
              <a {...link} className="">
                {title}
              </a>
            )}
          </h4>
          <p className="text-blueGray-500 leading-relaxed text-sm">
            {description}
          </p>

          <h6 className="text-sm font-semibold leading-tight text-primary-regular text-right mt-2">
            {link && link.to ? (
              <Link {...link} className="">
                Mehr erfahren <i className="fa-solid fa-arrow-right"></i>
              </Link>
            ) : (
              <a {...link} className="">
                Mehr erfahren <i className="fa-solid fa-arrow-right"></i>
              </a>
            )}
          </h6>
        </div>
      </div>
    </div>
  );
}

JobTeaserSmall.defaultProps = {
  link: {},
  color: 'blueGray',
  showImage: true,
  isSponsored: false,
};

JobTeaserSmall.propTypes = {
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
  jobId: PropTypes.string, // Add this prop for jobId
};
