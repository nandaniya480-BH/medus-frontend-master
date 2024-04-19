import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function FooterLarge({
  title,
  description,
  links,
  socials,
  contacts,
  copyright,
}) {
  const { userToken, role } = useSelector((state) => state.auth);
  return (
    <>
      <footer>
        <div className="w-full bg-white pt-8 pb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap text-center lg:text-left">
              <div className="w-full lg:w-5/12 px-4">
                <h4 className="text-2xl mt-4 font-bold text-primary-500">
                  {title}
                </h4>
                <h5 className="mt-1 mb-2 text-blueGray-500 font-semibold">
                  {description}
                </h5>
                <div className="mt-6 lg:mb-0 mb-6 flex flex-wrap justify-between gap-6 text-sm">
                  {contacts.map((prop, key) => {
                    return (
                      <span
                        key={key}
                        className="inline-flex font-semibold text-blueGray-600"
                      >
                        <i className={prop.icon}></i> {prop.text}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-6 lg:mb-0 mb-6">
                  {socials.map((prop, key) => {
                    return (
                      <a
                        key={key}
                        href={prop.link}
                        target="_blank"
                        className={
                          'bg-white text-' +
                          prop.icon +
                          '-regular shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-flex'
                        }
                        type="button"
                      >
                        <i className={'fab fa-' + prop.icon}></i>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="w-full lg:w-7/12 px-4">
                <div className="flex flex-wrap items-top mb-6">
                  {links.map((prop, key) => {
                    return (
                      <div className="w-full lg:w-5/12 px-4 ml-auto" key={key}>
                        <span className="block uppercase text-xs font-bold text-primary-500 mb-2">
                          {prop.name}
                        </span>
                        <ul className="list-unstyled">
                          {(prop.items || []).map((itemProp, itemKey) => {
                            if (itemProp.to) {
                              return (
                                <Link
                                  {...itemProp}
                                  key={itemKey}
                                  className="text-blueGray-500 hover:text-blueGray-700 block pb-2 text-sm font-semibold"
                                />
                              );
                            } else {
                              return (
                                <a
                                  {...itemProp}
                                  key={itemKey}
                                  className="text-blueGray-500 hover:text-blueGray-700 block pb-2 text-sm font-semibold"
                                />
                              );
                            }
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <hr className="my-6 border-blueGray-200" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 py-1 font-semibold">
                  {copyright}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

FooterLarge.defaultProps = {
  links: [],
  socials: [],
  contacts: [],
};
FooterLarge.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  copyright: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.object),
    })
  ),
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
    })
  ),
};
