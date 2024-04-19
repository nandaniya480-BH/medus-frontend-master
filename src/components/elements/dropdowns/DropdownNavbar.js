import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createPopper } from '@popperjs/core';

const DropdownNavbar = ({ text, items, navColor }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [menuClasses, setMenuClasses] = useState('');
  const [animating, setAntimating] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('origin-top-right');
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const origins = {
    'top-start': 'origin-bottom-left',
    'top-end': 'origin-bottom-right',
    'bottom-start': 'origin-top-left',
    'bottom-end': 'origin-top-right',
    'right-start': 'origin-top-left',
    'right-end': 'origin-top-left',
    'left-start': 'origin-top-right',
    'left-end': 'origin-top-right',
    bottom: 'origin-top',
    top: 'origin-bottom',
    left: 'origin-right',
    right: 'origin-left',
  };

  const startAnimation = () => {
    if (!animating) {
      setAntimating(true);
      if (dropdownPopoverShow) {
        setMenuClasses('');
        setTimeout(function () {
          setDropdownPopoverShow(false);
        }, 310);
      } else {
        let popperObject = createPopper(
          btnDropdownRef.current,
          popoverDropdownRef.current,
          {
            placement: 'bottom-start',
          }
        );
        setTransformOrigin(origins[popperObject.state.placement]);
        setDropdownPopoverShow(true);
        setTimeout(function () {
          setMenuClasses('opacity-100 scale-100 ');
        }, 10);
      }
      setTimeout(function () {
        setAntimating(false);
      }, 350);
    }
  };
  const linkColor = {
    light: 'text-blueGray-800',
    white:
      'text-white bg-gradient-to-r from-primary-200 px-6 to-primary-regular rounded-full',
    transparent: 'lg:text-white text-blueGray-800',
    dark: 'text-white',
    black: 'text-white',
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
  };
  return (
    <>
      <a
        className={
          'hover:opacity-75 px-3 py-4 lg:py-2 flex items-center text-sm font-bold transition-all duration-150 ease-in-out ' +
          linkColor[navColor]
        }
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          startAnimation();
        }}
      >
        {text}{' '}
        <i
          className={
            'ml-1 fas fa-caret-down transition-all duration-200 ease-in-out transform '
          }
        ></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={(dropdownPopoverShow ? 'block w-full' : 'hidden ') + ' z-50'}
      >
        <div
          className={
            transformOrigin +
            ' bg-white float-left md:p-2 p-4 border list-none text-left rounded-lg shadow-lg w-full transition-all duration-100 ease-in-out transform scale-95 opacity-0 absolute ' +
            menuClasses
          }
        >
          {items.map((prop, key) => {
            if (prop.disabled) {
              return (
                <span
                  className="uppercase font-bold text-xs px-3 pt-4 block w-full whitespace-nowrap bg-transparent text-blueGray-400 border-b-[0.5px] border-blueGray-300 last:border-none"
                  key={key}
                >
                  {prop.children}
                </span>
              );
            } else {
              if (prop.to) {
                return (
                  <Link
                    {...prop}
                    key={key}
                    className="text-sm px-3 py-2 block w-full whitespace-nowrap bg-transparent hover:bg-blueGray-100 transition-all duration-100 border-b-[0.5px] border-blueGray-300 last:border-none"
                  />
                );
              } else {
                return (
                  <a
                    {...prop}
                    key={key}
                    className="text-sm px-3 py-2 block w-full whitespace-nowrap bg-transparent hover:bg-blueGray-100 transition-all duration-100 border-b-[0.5px] border-blueGray-300 last:border-none"
                  />
                );
              }
            }
          })}
        </div>
      </div>
    </>
  );
};

DropdownNavbar.defaultProps = {
  items: [],
};

DropdownNavbar.propTypes = {
  text: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  navColor: PropTypes.oneOf([
    'dark',
    'light',
    'transparent',
    'white',
    'black',
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
  ]),
};

export default DropdownNavbar;
