import React from 'react';
import PropTypes from 'prop-types';

export default function Alert({ color, title, description, icon }) {
  const alertColors = {
    light: 'text-blueGray-800 bg-blueGray-200',
    dark: 'text-blueGray-200 bg-blueGray-800',
    blueGray: 'text-white bg-blueGray-500',
    red: 'text-white bg-red-500',
    orange: 'text-white bg-orange-500',
    amber: 'text-white bg-amber-500',
    emerald: 'text-white bg-emerald-500',
    teal: 'text-white bg-teal-500',
    lightBlue: 'text-white bg-lightBlue-500',
    indigo: 'text-white bg-indigo-500',
    purple: 'text-white bg-purple-500',
    pink: 'text-white bg-pink-500',
    primary: 'text-white bg-primary-500',
  };
  return (
    <>
      <div
        className={
          'px-4 py-2 border-0 rounded-full relative mb-4 ' + alertColors[color]
        }
      >
        <p className="font-bold">
          <i className={icon}></i> {title}
        </p>{' '}
        <br />
        <p>{description}</p>
      </div>
    </>
  );
}
Alert.defaultProps = {
  color: 'blueGray',
};
Alert.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
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
  icon: PropTypes.string,
};
