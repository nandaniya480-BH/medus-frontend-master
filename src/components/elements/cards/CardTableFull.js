/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import PropTypes from 'prop-types';

// components
import DropdownButton from '../../../components/Dropdowns/DropdownButton.js';
import Progress from '../../../components/Elements/Progress.js';
import ImagesOverlap from '../../../components/Images/ImagesOverlap.js';

export default function CardFullTable({ title, head, body, color, children }) {
  const cardColors = {
    white: 'bg-white text-blueGray-700',
    light: 'bg-blueGray-200 text-blueGray-700',
    blueGray: 'bg-blueGray-900 text-white',
    red: 'bg-red-900 text-white',
    orange: 'bg-orange-900 text-white',
    amber: 'bg-amber-900 text-white',
    emerald: 'bg-emerald-900 text-white',
    teal: 'bg-teal-900 text-white',
    lightBlue: 'bg-lightBlue-900 text-white',
    indigo: 'bg-indigo-900 text-white',
    purple: 'bg-purple-900 text-white',
    pink: 'bg-pink-900 text-white',
    primary: 'bg-primary-500 text-white',
  };
  const headColors = {
    white: 'bg-blueGray-100 text-blueGray-500 border-blueGray-200',
    blueGray: 'bg-blueGray-800 text-blueGray-300 border-blueGray-700',
    primary: 'bg-primary-800 text-primary-300 border-primary-500',
  };
  const titleColors = {
    white: 'text-blueGray-700',
    blueGray: 'text-white',
    primary: 'text-white',
  };
  const imageTextColors = {
    white: 'text-blueGray-700',
    blueGray: 'text-white',
    primary: 'text-white',
  };
  const iconColors = {
    white: 'text-white',
    blueGray: 'text-blueGray-500',
    primary: 'text-primary-500',
  };
  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg ' +
          cardColors[color]
        }
      >
        <div className="px-6 py-4 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className={'font-bold text-lg ' + titleColors[color]}>
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {head.map((prop, key) => (
                  <th
                    key={key}
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left ' +
                      headColors[color]
                    }
                  >
                    {prop}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((prop, key) => (
                <tr key={key}>
                  {prop.map((colProp, colKey) => {
                    if (typeof colProp === 'string') {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <div className="flex items-center">{colProp}</div>
                        </td>
                      );
                    } else if (colProp.bold) {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                'ml-3 font-bold ' + +imageTextColors[color]
                              }
                            >
                              {colProp.bold}
                            </span>
                          </div>
                        </td>
                      );
                    } else if (colProp.arrow) {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <div className="flex items-center">
                            <i
                              className={
                                'fas fa-arrow-' +
                                colProp.arrow +
                                ' mr-2 ' +
                                iconColors[colProp.color]
                              }
                            ></i>
                            {colProp.text}
                          </div>
                        </td>
                      );
                    } else if (colProp.images) {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <div className="flex items-center">
                            <ImagesOverlap {...colProp.images} />
                          </div>
                        </td>
                      );
                    } else if (colProp.progress) {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 min-w-140-px"
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{colProp.text}</span>
                            <Progress {...colProp.progress} />
                          </div>
                        </td>
                      );
                    } else if (colProp.color) {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <div className="flex items-center">
                            <i
                              className={
                                'fas fa-circle mr-2 ' +
                                iconColors[colProp.color]
                              }
                            ></i>
                            {colProp.text}
                          </div>
                        </td>
                      );
                    } else if (colProp.image) {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <div className="flex items-center">
                            <img
                              src={colProp.image}
                              className="h-12 w-12 bg-white rounded-full border p-1"
                              alt="..."
                            ></img>{' '}
                            <span
                              className={
                                'ml-3 font-bold ' + +imageTextColors[color]
                              }
                            >
                              {colProp.text}
                            </span>
                          </div>
                        </td>
                      );
                    } else if (colProp.dropdown) {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 pb-6 pl-6 text-right"
                        >
                          <DropdownButton {...colProp.dropdown} />
                        </td>
                      );
                    } else {
                      return (
                        <td
                          key={colKey}
                          className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <div className="flex items-center">{colProp}</div>
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {children && (
          <div className="rounded-b mt-0 px-4 py-3 border-0">{children}</div>
        )}
      </div>
    </>
  );
}

CardFullTable.defaultProps = {
  head: [],
  body: [],
  children: null,
  color: 'white',
};

CardFullTable.propTypes = {
  title: PropTypes.string,
  head: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.oneOf(['white', 'blueGray', 'primary']),
  body: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          bold: PropTypes.string,
        }),
        PropTypes.shape({
          image: PropTypes.string,
          text: PropTypes.string,
        }),
        PropTypes.shape({
          text: PropTypes.string,
          color: PropTypes.oneOf(['white', 'blueGray', 'primary']),
        }),
        PropTypes.shape({
          text: PropTypes.string,
          arrow: PropTypes.oneOf(['up', 'down']),
          color: PropTypes.oneOf(['white', 'blueGray', 'primary']),
        }),
        PropTypes.shape({
          images: PropTypes.object,
        }),
        PropTypes.shape({
          text: PropTypes.string,
          progress: PropTypes.object,
        }),
        PropTypes.shape({
          dropdown: PropTypes.object,
        }),
        PropTypes.node,
      ])
    )
  ),
  children: PropTypes.node,
};
