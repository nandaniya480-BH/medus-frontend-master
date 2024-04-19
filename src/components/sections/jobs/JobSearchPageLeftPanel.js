import React, { useEffect, useState } from 'react';
import { selectPickerClassNames } from '../../elements/input/select/utilities';
import Select from 'react-tailwindcss-select';
// import { categories } from "./utilities";
import Checkbox from '../../elements/input/Checkbox';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import {
  useGetCategoriesQuery,
  useGetLocationsQuery,
  useGetContractTypesQuery,
  useGetEmployerCategoriesQuery,
} from '../../../features/api/apiSlice';
import ListSkeleton from '../../elements/skeleton/list';
import InputSkeleton from '../../elements/skeleton/input';
import MultiRangeSlider from 'multi-range-slider-react';
import Button from '../../elements/buttons/Button';

const MOBILE_BREAKPOINT = 768;

function JobSearchPageLeftPanel() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selects, setSelects] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [distance, setDistance] = useState(0);
  const [empType, setEmpType] = useState(null);
  const [compType, setCompType] = useState(null);
  const [minValue, set_minValue] = useState(20);
  const [maxValue, set_maxValue] = useState(80);
  const { data: categories } = useGetCategoriesQuery();
  const { data: locations } = useGetLocationsQuery();
  const { data: employementType } = useGetContractTypesQuery();
  const { data: companyType } = useGetEmployerCategoriesQuery();
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelectChange = (value, name) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [name]: value,
    }));
  };

  const handleDistanceChange = (e) => {
    setDistance(e?.target?.value);
  };

  useEffect(() => {
    const newSelects = categories?.map(({ value, label, subcategories }) => (
      <Select
        value={selectedOptions[label]}
        placeholder={label}
        onChange={(value) => handleSelectChange(value, label)}
        key={value + label}
        isMultiple={true}
        isClearable={true}
        options={subcategories}
        classNames={selectPickerClassNames}
        noOptionsMessage="Keine weiteren Optionen"
      />
    ));
    setSelects(newSelects);
  }, [selectedOptions, categories]);

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item?.plz + ' , ' + item?.ort}
        </span>
      </>
    );
  };

  useEffect(() => {
    const autocompleteInput = (
      <ReactSearchAutocomplete
        items={locations?.data}
        fuseOptions={{ keys: ['plz', 'ort'] }}
        resultStringKeyName="ort"
        maxResults={5}
        showNoResultsText="Keine Ergebnisse"
        placeholder="Plz/Ort"
        styling={{ fontFamily: "Titillium Web', sans-serif", fontSize: '14px' }}
        formatResult={formatResult}
      />
    );

    setAutocomplete(autocompleteInput);
  }, [locations]);

  const renderFilters = () => {
    return (
      <>
        <div className="w-full mb-2">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Anstellungsart
          </h3>
          <Select
            value={empType}
            placeholder="ANSTELLUNGSART"
            onChange={(value) => setEmpType(value)}
            isMultiple={true}
            isClearable={true}
            options={employementType}
            classNames={selectPickerClassNames}
          />
        </div>
        <div className="w-full mb-2">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Unternehmensart
          </h3>
          <Select
            value={compType}
            placeholder="UNTERNEHMENSART"
            onChange={(value) => setCompType(value)}
            isMultiple={true}
            isClearable={true}
            options={companyType}
            classNames={selectPickerClassNames}
          />
        </div>
        <div className="w-full mb-4">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Pensum
          </h3>
          <div className="flex justify-between w-full">
            <span className="justify-self-start text-sm">{minValue} %</span>
            <span></span>
            <span className="justify-self-end text-sm">{maxValue} %</span>
          </div>
          <MultiRangeSlider
            min={0}
            max={100}
            step={10}
            stepOnly={true}
            minCaption={false}
            label={false}
            ruler={false}
            baseClassName=""
            style={{ border: 'none', boxShadow: 'none', padding: '15px 0 0 0' }}
            barLeftColor="#e5e7eb"
            barRightColor="linear-gradient(60deg, #26c6da, #0097a7)"
            barInnerColor="#0097a7"
            thumbLeftColor="#0097a7"
            thumbRightColor="#0097a7"
            minValue={minValue}
            maxValue={maxValue}
            onInput={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <div className="flex flex-col items-left">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Distanz
          </h3>
          {autocomplete ? autocomplete : <InputSkeleton />}
          <div className="flex flex-col justify-center py-2">
            <div className="flex justify-between w-full">
              <span className="justify-self-start text-sm">{distance} km</span>
              <span></span>
              <span className="justify-self-end text-sm">100 km</span>
            </div>
            <input
              type="range"
              value={distance}
              step={5}
              onChange={(e) => handleDistanceChange(e)}
              className="w-full h-0.5 bg-blueGray-500 rounded outline-none slider-thumb mt-2 mb-2 accent-primary-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-left">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Arbeitszeiten:
          </h3>
          <Checkbox className="text-left" {...{ label: '  Regelmässig' }} />
          <Checkbox className="text-left" {...{ label: '  Unregelmässig' }} />

          <h3 className="text-base font-semibold text-blueGray-800 mb-2 mt-2">
            Position:
          </h3>
          <Checkbox
            className="text-left"
            {...{ label: '  mit Führungsaufgaben' }}
          />
          <Checkbox
            className="text-left"
            {...{ label: '  ohne Führungsaufgaben' }}
          />
        </div>
        <div className="grid grid-col mt-4">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2 mt-2">
            Kategorien:
          </h3>
          {selects ? selects : <ListSkeleton />}
        </div>
      </>
    );
  };

  return (
    <fieldset>
      <div className="mt-2 mx-auto">
        <div className="flex md:flex-col flex-col gap-4">
          {isMobile && (
            <div className="w-full text-right -ml-2">
              <button
                className="text-lg font-semibold "
                onClick={() => setShowModal(true)}
              >
                Filters <i className="fa-solid fa-sliders text-primary-500"></i>
              </button>
            </div>
          )}
          {showModal && (
            <>
              <div className="justify-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full">
                  <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-6 py-4 pb-8">
                    {isMobile && (
                      <>
                        <div className="w-full text-right mb-4 mt-4">
                          <button
                            className="text-lg font-bold text-red-500"
                            onClick={() => setShowModal(false)}
                          >
                            <i className="fa-solid fa-times"></i> Schliessen
                          </button>
                        </div>
                        {renderFilters()}

                        <div className="w-full text-center mt-4">
                          <Button
                            {...{ size: 'lg', fullWidth: true }}
                            onClick={() => setShowModal(false)}
                          >
                            <i className="fa-solid fa-search"></i> Jetzt finden
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          )}

          {!isMobile && renderFilters()}
        </div>
      </div>
    </fieldset>
  );
}

export default JobSearchPageLeftPanel;
