/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

// components
import DropdownNavbar from '../../elements/dropdowns/DropdownNavbar';

export default function NavbarLinks({
  leftLinks,
  rightLinks,
  logoImage,
  logoText,
  logoLink,
  socials,
  color,
  type,
}) {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseStyle, setCollapseStyle] = React.useState(undefined);
  const [animation, setAnimation] = React.useState(false);
  const collapseRef = React.useRef(null);
  const startAnitmation = () => {
    if (!animation) {
      setAnimation(true);
      if (collapseOpen) {
        setTimeout(function () {
          setAnimation(false);
          setCollapseOpen(false);
        }, 100);
      } else {
        setCollapseOpen(true);
        setTimeout(function () {
          setAnimation(false);
        }, 100);
      }
    }
  };
  let brand = (
    <>
      <img
        src={logoImage}
        className="rounded-full mr-2"
        style={{ width: '130px' }}
      />
      <span>{logoText}</span>
    </>
  );
  const navBg = {
    dark: 'bg-blueGray-800 shadow-md',
    transparent: 'lg:bg-transparent bg-white',
    white: 'bg-white shadow-md',
    primary: 'bg-primary-500 shadow-md',
  };
  const linkColors = {
    dark: 'text-white',
    transparent: 'lg:text-white text-blueGray-500',
    white: 'text-primary-regular',
    primary: 'text-white',
  };
  return (
    <>
      <nav
        className={
          type +
          ' w-full z-50 flex flex-wrap items-center justify-between px-2 py-2 ' +
          navBg[color]
        }
      >
        <div className="flex container mx-auto flex flex-wrap items-center justify-between px-0 lg:px-4">
          {logoLink && logoLink.to ? (
            <Link
              {...logoLink}
              className={
                'text-sm font-bold leading-relaxed inline-flex items-center mr-4 py-2 whitespace-nowrap ' +
                linkColors[color]
              }
            >
              {brand}
            </Link>
          ) : logoLink ? (
            <a
              {...logoLink}
              className={
                'text-sm font-bold leading-relaxed inline-flex items-center mr-4 py-2 whitespace-nowrap ' +
                linkColors[color]
              }
            >
              {brand}
            </a>
          ) : null}

          <button
            className="ml-auto cursor-pointer text-xl leading-none px-3 py-1 pr-5 rounded bg-transparent block outline-none focus:outline-none text-primary-regular lg:hidden"
            type="button"
            onClick={startAnitmation}
          >
            {!collapseOpen ? (
              <i className="fas fa-bars"></i>
            ) : (
              <i className="fas fa-times text-red-500"></i>
            )}
          </button>

          <div
            className={classnames(`w-full lg:flex lg:w-auto flex-grow`, {
              'transition duration-300 ease-in min-h-screen flex flex-col items-center bg-radial-gradient pb-20':
                collapseOpen,
              hidden: !collapseOpen,
              'overflow-hidden ': animation,
            })}
            ref={collapseRef}
          >
            <ul
              className={`lg:items-center flex flex-col uppercase list-none list-none lg:flex-row ${
                collapseOpen ? 'w-8/12 my-auto' : ''
              }`}
            >
              {leftLinks.map((prop, key) => {
                if (prop.to) {
                  return (
                    <li key={key}>
                      <Link
                        {...prop}
                        className={
                          'hover:opacity-75 px-3 py-4 lg:py-2 flex items-center text-center text-xs font-bold transition-all duration-150 ease-in-out ' +
                          linkColors[color] +
                          ' ' +
                          prop.extraclass
                        }
                      />
                    </li>
                  );
                } else if (prop.dropdown) {
                  return (
                    <li className="relative" key={key}>
                      <DropdownNavbar {...prop} navColor={color} />
                    </li>
                  );
                } else {
                  return (
                    <li key={key}>
                      <a
                        {...prop}
                        className={
                          'hover:opacity-75 px-3 py-4 lg:py-2 flex items-center text-xs font-bold transition-all duration-150 ease-in-out ' +
                          linkColors[color] +
                          ' ' +
                          prop.extraclass
                        }
                      />
                    </li>
                  );
                }
              })}
            </ul>

            <ul
              className={`lg:items-center uppercase lg:ml-auto flex flex-wrap list-none flex flex-col list-none lg:flex-row ${
                collapseOpen ? 'w-8/12 my-auto' : ''
              } `}
            >
              {rightLinks.map((prop, key) => {
                if (prop.to) {
                  return (
                    <li key={key}>
                      <Link
                        {...prop}
                        className={
                          'hover:opacity-75 px-3 py-4 lg:py-2 flex items-center text-xs font-bold transition-all duration-150 ease-in-out ' +
                          linkColors[color] +
                          ' ' +
                          prop.extraclass
                        }
                      >
                        <i className={prop.icon}></i> {prop.children}
                      </Link>
                    </li>
                  );
                } else if (prop.dropdown) {
                  return (
                    <li className="relative" key={key}>
                      <DropdownNavbar {...prop} navColor={color} />
                    </li>
                  );
                } else {
                  return (
                    <li key={key}>
                      <a
                        {...prop}
                        className={
                          'hover:opacity-75 px-3 py-4 lg:py-2 flex items-center text-xs font-bold transition-all duration-150 ease-in-out ' +
                          linkColors[color] +
                          ' ' +
                          prop.extraclass
                        }
                      />
                    </li>
                  );
                }
              })}
              {socials.map((prop, key) => {
                return (
                  <li key={key}>
                    <a
                      className={
                        'px-3 py-2 flex items-center text-xs font-bold leading-snug hover:opacity-75 transition-all duration-150 ease-in-out ' +
                        linkColors[color]
                      }
                      href={prop.link}
                      target="_blank"
                    >
                      <i
                        className={
                          'fab fa-' +
                          prop.icon +
                          ' text-lg leading-lg opacity-75 hover:opacity-50 ' +
                          linkColors[color]
                        }
                      ></i>
                      <span className="lg:hidden lg:ml-0 ml-2">
                        {prop.text}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
NavbarLinks.defaultProps = {
  leftLinks: [],
  rightLinks: [],
  socials: [],
  type: 'sticky top-0',
};
NavbarLinks.propTypes = {
  logoImage: PropTypes.string,
  logoText: PropTypes.string,
  logoLink: PropTypes.object,
  color: PropTypes.oneOf(['dark', 'transparent', 'white', 'primary']),
  type: PropTypes.oneOf(['absolute', 'fixed', 'relative', 'sticky top-0', '']),
  leftLinks: PropTypes.arrayOf(PropTypes.object),
  rightLinks: PropTypes.arrayOf(PropTypes.object),
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOf([
        'facebook',
        'twitter',
        'instagram',
        'dribbble',
        'github',
      ]),
      link: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};
