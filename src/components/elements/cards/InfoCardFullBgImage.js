import React from 'react';
import PropTypes from 'prop-types';
// components
import { Link } from 'react-router-dom';

export default function InfoCardFullBgImage({
  bgImage,
  title,
  description,
  link,
}) {
  return (
    <>
      <div className="overflow-hidden mb-12 rounded-lg relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-550-px transition-all duration-15 ease-in-out hover:transform hover:scale-100 group">
        <div
          className="absolute rounded-lg w-full h-full bg-50-center bg-cover transition-all duration-1000 ease-in-out group-hover:transform md:group-hover:scale-110"
          style={{
            backgroundImage: 'url(' + bgImage + ')',
            backfaceVisibility: 'hidden',
          }}
        />
        <div className="absolute rounded-lg w-full h-full bg-black opacity-30"></div>
        <div className="p-10 flex h-full items-end z-1">
          <div>
            <h1 className="text-4xl font-semibold mt-0 mb-2 text-white">
              {title}
            </h1>
            <p className="text-white text-sm mb-4">{description}</p>
            <div className="w-full flex justify-center">
              <Link
                {...link}
                className="bg-white text-primary-500 rounded-full font-semibold px-6 py-2 text-sm mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

InfoCardFullBgImage.defaultProps = {
  link: {},
};

InfoCardFullBgImage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  bgImage: PropTypes.string,
  link: PropTypes.object,
};
