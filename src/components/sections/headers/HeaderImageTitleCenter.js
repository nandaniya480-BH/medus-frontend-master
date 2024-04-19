import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// components
import Input from '../../elements/input/Input';
import Button from '../../elements/buttons/Button';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import {
  useGetSubCategoriesQuery,
  useGetLocationsQuery,
} from '../../../features/api/apiSlice';
import { Link } from 'react-router-dom';

export default function HeaderImageTitleCenter({
  bgImage,
  title,
  titleProps,
  locationProps,
  button,
}) {
  const { data: jobTitles } = useGetSubCategoriesQuery(true);
  const { data: locations } = useGetLocationsQuery();
  const [searchParams, setSearchParams] = useState({
    job_title: '',
    job_location: '',
  });

  const formatResultLocation = (item) => {
    return (
      <>
        <span
          key={item.plz + item.ort}
          className="z-99"
          style={{ display: 'block', textAlign: 'left' }}
        >
          {item?.plz + ' , ' + item?.ort}
        </span>
      </>
    );
  };

  return (
    <>
      <div
        className="flex items-center bg-bottom px-10 lg:px-32 py-32 lg:py-64 bg-cover"
        style={{ backgroundImage: "url('" + bgImage + "')" }}
      >
        <div className="container bg-white opacity-95 rounded-lg p-6 md:p-10 w-full shadow-lg mx-auto">
          <h1 className="text-xl font-bold ml-4 mb-4 leading-tight text-blueGray-800">
            {title}
          </h1>
          <div className="flex md:flex-row flex-col items-start">
            <div className="w-full md:w-5/12 px-3 mb-6 md:mb-0 z-2">
              {jobTitles ? (
                <ReactSearchAutocomplete
                  key={'job_title'}
                  items={jobTitles?.data}
                  maxResults={5}
                  showNoResultsText="Keine Ergebnisse"
                  placeholder="Title"
                  styling={{
                    fontFamily: "Titillium Web', sans-serif",
                    fontSize: '14px',
                    borderRadius: '5px',
                    placeholderColor: '#acb8c7',
                    height: '38px',
                    border: '1px solid #d1d9e4',
                    zIndex: 1,
                  }}
                  onSelect={(item) => {
                    setSearchParams((prevState) => ({
                      ...prevState,
                      job_title: item?.name,
                    }));
                  }}
                  onClear={(item) => {
                    setSearchParams((prevState) => ({
                      ...prevState,
                      job_title: null,
                    }));
                  }}
                  onSearch={(item) => {
                    setSearchParams((prevState) => ({
                      ...prevState,
                      job_title: item,
                    }));
                  }}
                />
              ) : (
                <Input {...titleProps} />
              )}
            </div>
            <div className="w-full md:w-5/12 px-3 mb-6 md:mb-0 z-1">
              {locations ? (
                <ReactSearchAutocomplete
                  key={'job_location'}
                  items={locations?.data}
                  fuseOptions={{ keys: ['plz', 'ort'] }}
                  resultStringKeyName="ort"
                  maxResults={5}
                  showNoResultsText="Keine Ergebnisse"
                  placeholder="Ort"
                  styling={{
                    fontFamily: "Titillium Web', sans-serif",
                    fontSize: '14px',
                    borderRadius: '5px',
                    placeholderColor: '#acb8c7',
                    height: '38px',
                    border: '1px solid #d1d9e4',
                    zIndex: 1,
                  }}
                  onSelect={(item) => {
                    setSearchParams((prevState) => ({
                      ...prevState,
                      job_location: item?.ort,
                    }));
                  }}
                  onClear={(item) => {
                    setSearchParams((prevState) => ({
                      ...prevState,
                      job_location: null,
                    }));
                  }}
                  onSearch={(item) => {
                    setSearchParams((prevState) => ({
                      ...prevState,
                      job_location: item,
                    }));
                  }}
                  formatResult={formatResultLocation}
                />
              ) : (
                <Input {...locationProps} />
              )}
            </div>
            <div className="w-full md:w-2/12 px-3 text-center">
              <Link
                to={'/jobs'}
                className={
                  'bg-gradient-to-r from-primary-200 to-primary-regular text-white font-bold px-4 py-2 rounded-lg inline-block w-full'
                }
                state={{
                  job_title: searchParams.job_title,
                  ort: searchParams.job_location,
                  filters:
                    (searchParams.job_title
                      ? 'Titel: ' + searchParams.job_title + ' | '
                      : '') +
                    (searchParams.job_location
                      ? ' Ort: ' + searchParams.job_location
                      : ''),
                }}
              >
                Suche
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

HeaderImageTitleCenter.defaultProps = {
  button: {},
  input: {},
};

HeaderImageTitleCenter.propTypes = {
  bgImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // it is represented by the props
  // that can be passed to the Button,
  // so please check that one out
  button: PropTypes.object,
  // it is represented by the props
  // that can be passed to the Input,
  // so please check that one out
  titleProps: PropTypes.object,
  locationProps: PropTypes.object,
};
