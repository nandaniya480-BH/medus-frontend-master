import React from 'react';
import PropTypes from 'prop-types';
// components

export default function InfoCardFullBgColor({
  icon,
  color,
  gradient,
  title,
  description,
  extraStyle,
}) {
  let bgColor = {
    'light-gradient':
      'bg-gradient-to-r from-blueGray-100 to-blueGray-300 bg-blueGray-200',
    light: 'bg-blueGray-200',
    'dark-gradient':
      'bg-gradient-to-r from-blueGray-700 to-blueGray-900  bg-blueGray-800',
    dark: 'bg-blueGray-800',
    'blueGray-gradient':
      'bg-gradient-to-r from-blueGray-400 to-blueGray-500 bg-blueGray-500',
    blueGray: 'bg-blueGray-500',
    'red-gradient': 'bg-gradient-to-r from-red-400 to-red-500 bg-red-500',
    red: 'bg-red-500',
    'orange-gradient':
      'bg-gradient-to-r from-orange-400 to-orange-500 bg-orange-500',
    orange: 'bg-orange-500',
    'amber-gradient':
      'bg-gradient-to-r from-amber-400 to-amber-500 bg-amber-500',
    amber: 'bg-amber-500',
    'emerald-gradient':
      'bg-gradient-to-r from-emerald-400 to-emerald-500 bg-emerald-500',
    emerald: 'bg-emerald-500',
    'teal-gradient': 'bg-gradient-to-r from-teal-400 to-teal-500 bg-teal-500',
    teal: 'bg-teal-500',
    'lightBlue-gradient':
      'bg-gradient-to-r from-lightBlue-400 to-lightBlue-500 bg-lightBlue-500',
    lightBlue: 'bg-lightBlue-500',
    'indigo-gradient':
      'bg-gradient-to-r from-indigo-400 to-indigo-500 bg-indigo-500',
    indigo: 'bg-indigo-500',
    'purple-gradient':
      'bg-gradient-to-r from-purple-400 to-purple-500 bg-purple-500',
    purple: 'bg-purple-500',
    'pink-gradient': 'bg-gradient-to-r from-pink-400 to-pink-500 bg-pink-500',
    pink: 'bg-pink-500',
    primary: 'bg-primary-500',
    'primary-gradient': 'bg-gradient-to-r from-primary-200 to-primary-regular',
  };

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
  let textColor = {
    light: 'text-blueGray-700',
    dark: 'text-blueGray-100',
    blueGray: 'text-white',
    red: 'text-white',
    orange: 'text-white',
    amber: 'text-white',
    emerald: 'text-white',
    teal: 'text-white',
    lightBlue: 'text-white',
    indigo: 'text-white',
    purple: 'text-white',
    pink: 'text-white',
    primary: 'text-white',
  };
  let gradientText = gradient ? '-gradient' : '';
  return (
    <>
      <div
        className={
          bgColor[color + gradientText] +
          ' mt-8 rounded-lg text-left p-6 flex items-start ' +
          extraStyle
        }
      >
        <div className="flex-1">
          <div
            className={
              iconColor[color] +
              ' bg-white shadow-lg rounded rounded-full justify-center items-center text-center p-2 mx-auto mb-5 inline-flex w-12 h-12'
            }
          >
            <i className={icon + ' text-xl'}></i>
          </div>
          <h4
            className={
              'text-2xl font-semibold leading-normal ' + textColor[color]
            }
          >
            {title}
          </h4>
          <p className={'mt-2 ' + textColor[color]}>{description}</p>
        </div>
      </div>
    </>
  );
}
InfoCardFullBgColor.defaultProps = {
  gradient: true,
  color: 'blueGray',
  extraStyle: '',
};

InfoCardFullBgColor.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'light',
    'dark',
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
  gradient: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  extraStyle: PropTypes.string,
};
