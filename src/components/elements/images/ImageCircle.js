import React from 'react';
import PropTypes from 'prop-types';

export default function ImageTooltip({ image, className, sizes, alt }) {
  return (
    <>
      <div className={`mx-auto mb-4 ${sizes}`}>
        <img
          alt={`${alt}`}
          className={`w-full h-full ${className}`}
          src={image}
        />
      </div>
    </>
  );
}

ImageTooltip.defaultProps = {
  className: 'object-cover rounded-full',
  alt: 'Image',
};
ImageTooltip.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  sizes: PropTypes.string,
  alt: PropTypes.string,
};
