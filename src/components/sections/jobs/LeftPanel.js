import React, { useState, useEffect } from 'react';
import Select from 'react-tailwindcss-select';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../elements/buttons/Button';
import Checkbox from '../../elements/input/Checkbox';
import {
  useGetCategoriesQuery,
  useGetLocationsQuery,
  useGetContractTypesQuery,
  useGetEmployerCategoriesQuery,
} from '../../../features/api/apiSlice';
import MultiRangeSlider from 'multi-range-slider-react';
import ListSkeleton from '../../elements/skeleton/list';
import InputSkeleton from '../../elements/skeleton/input';
import { selectPickerClassNames } from '../../elements/input/select/utilities';
import { useDispatch } from 'react-redux';
import { jobsApi } from '../../../features/jobs/jobsApiSlice';

const formatResult = (item) => {
  return (
    <>
      <span style={{ display: 'block', textAlign: 'left' }}>
        {item?.plz + ' , ' + item?.ort}
      </span>
    </>
  );
};
const MOBILE_BREAKPOINT = 768;
const LeftPanel = ({ setParams }) => {
  const [workloadFrom, setWorkloadFrom] = useState(0);
  const [workloadTo, setWorkloadTo] = useState(100);
  const [distance, setDistance] = useState(0);
  const [plz, setPlz] = useState(null);
  const [filterData, setFilterData] = useState('');
  const [debouncedFilterData, setDebouncedFilterData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setDebouncedFilterData(filterData);
      },
      !isMobile ? 100 : 3000
    );

    return () => {
      clearTimeout(timer);
    };
  }, [filterData]);

  const updateData = () => {
    setParams(filterData);
  };
  useEffect(() => {
    if (debouncedFilterData !== '') {
      updateData();
    }
  }, [debouncedFilterData]);
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

  const onSubmit = (data) => {
    const work_time =
      +data.work_time_regular * 1 + +data.work_time_non_regular * 2;
    const position =
      +data.position_with_lead * 1 + +data.position_without_lead * 2;
    const employer_category_id = data?.company_type?.map((ct) => {
      return ct.value;
    });
    const contract_type_id = data?.contract_type?.map((item) => {
      return item.value;
    });
    const job_subcategories = data?.categories
      ?.filter((item) => {
        return item != undefined;
      })
      .reduce((prev, next) => {
        // console.log('next..:', next);
        return [
          ...prev,
          ...next?.map((ctg) => {
            return ctg.value;
          }),
        ];
      }, []);
    const job_categories = '';
    const job_regions = '';
    const job_title = '';
    const ort = '';

    const d = {
      work_time,
      plz,
      position,
      job_title,
      ort,
      distance,
      workload_from: workloadFrom,
      workload_to: workloadTo,
      employer_category_id,
      contract_type_id,
      job_categories,
      job_subcategories,
      job_regions,
      perPage: 5,
    };
    setFilterData(d);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
    control,
  } = useForm();
  const {
    data: locations = [],
    isLoading: locLoading,
    isError: locerror,
  } = useGetLocationsQuery();
  const {
    data: categories = [],
    isLoading: ctLoading,
    isError: ctError,
  } = useGetCategoriesQuery();
  const {
    data: employementType = [],
    isLoading: etLoading,
    isError: etError,
  } = useGetContractTypesQuery();
  const {
    data: companyType = [],
    isLoading: cmptLoading,
    isError: cmtError,
  } = useGetEmployerCategoriesQuery();

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [workloadFrom, workloadTo, distance, plz]);

  const renderFilters = () => {
    return (
      <form>
        <div className="w-full mb-2">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Anstellungsart
          </h3>
          {etLoading ? (
            <InputSkeleton />
          ) : (
            <Controller
              name={'contract_type'}
              control={control}
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <Select
                    isMultiple
                    options={employementType}
                    noOptionsMessage="Keine weiteren Optionen"
                    onChange={(options) => {
                      onChange(options);
                      handleSubmit(onSubmit)();
                    }}
                    onBlur={onBlur}
                    value={value}
                    classNames={selectPickerClassNames}
                    placeholder={'ANSTELLUNGSART'}
                  />
                );
              }}
            />
          )}
        </div>
        <div className="w-full mb-2">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Unternehmensart
          </h3>
          {cmptLoading ? (
            <InputSkeleton />
          ) : (
            <Controller
              name={'company_type'}
              control={control}
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <Select
                    isMultiple
                    options={companyType}
                    noOptionsMessage="Keine weiteren Optionen"
                    onChange={(options) => {
                      onChange(options);
                      handleSubmit(onSubmit)();
                    }}
                    onBlur={onBlur}
                    value={value}
                    classNames={selectPickerClassNames}
                    placeholder={'UNTERNEHMENSART'}
                  />
                );
              }}
            />
          )}
        </div>

        <div className="w-full mb-4">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Pensum
          </h3>
          <div className="flex justify-between w-full">
            <span className="justify-self-start text-sm">{workloadFrom} %</span>
            <span></span>
            <span className="justify-self-end text-sm">{workloadTo} %</span>
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
            style={{
              border: 'none',
              boxShadow: 'none',
              padding: '15px 0 0 0',
            }}
            barLeftColor="#e5e7eb"
            barRightColor="linear-gradient(60deg, #26c6da, #0097a7)"
            barInnerColor="#0097a7"
            thumbLeftColor="#0097a7"
            thumbRightColor="#0097a7"
            minValue={workloadFrom}
            maxValue={workloadTo}
            onInput={(e) => {
              setWorkloadFrom(e.minValue);
              setWorkloadTo(e.maxValue);
            }}
          />
        </div>

        <div className="flex flex-col items-left">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Distanz
          </h3>
          {!locLoading ? (
            <ReactSearchAutocomplete
              className="cursor-pointer"
              items={locations?.data}
              fuseOptions={{ keys: ['plz', 'ort'] }}
              onSelect={(v) => {
                setPlz(v.plz);
              }}
              onClear={() => {
                dispatch(jobsApi.util.resetApiState());
                setPlz(null);
                setDistance(0);
              }}
              resultStringKeyName="ort"
              maxResults={5}
              showNoResultsText="Keine Ergebnisse"
              placeholder="Plz/Ort"
              styling={{
                fontFamily: "Titillium Web', sans-serif",
                fontSize: '14px',
              }}
              formatResult={formatResult}
            />
          ) : (
            <InputSkeleton />
          )}
          <div className="flex flex-col justify-center py-2">
            <div className="flex justify-between w-full">
              <span className="justify-self-start text-sm">{distance} km</span>
              <span></span>
              <span className="justify-self-end text-sm">100 km</span>
            </div>
            <input
              type="range"
              step={5}
              value={distance}
              disabled={plz ? false : true}
              onChange={(e) => {
                setDistance(e?.target?.value);
                handleSubmit(onSubmit)();
              }}
              className="w-full h-0.5 bg-blueGray-500 rounded outline-none slider-thumb mt-2 mb-2 accent-primary-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-left">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2">
            Arbeitszeiten:
          </h3>
          <Checkbox
            className="text-left"
            {...{ label: '  Regelmässig' }}
            {...register('work_time_regular', {
              onChange: (e) => {
                handleSubmit(onSubmit)();
              },
            })}
          />
          <Checkbox
            className="text-left"
            {...{ label: '  Unregelmässig' }}
            {...register('work_time_non_regular', {
              onChange: (e) => {
                handleSubmit(onSubmit)();
              },
            })}
          />

          <h3 className="text-base font-semibold text-blueGray-800 mb-2 mt-2">
            Position:
          </h3>
          <Checkbox
            className="text-left"
            {...{ label: '  mit Führungsaufgaben' }}
            {...register('position_with_lead', {
              onChange: (e) => {
                handleSubmit(onSubmit)();
              },
            })}
          />
          <Checkbox
            className="text-left"
            {...{ label: '  ohne Führungsaufgaben' }}
            {...register('position_without_lead', {
              onChange: (e) => {
                handleSubmit(onSubmit)();
              },
            })}
          />
        </div>
        <div className="grid grid-col mt-4">
          <h3 className="text-base font-semibold text-blueGray-800 mb-2 mt-2">
            Kategorien:
          </h3>

          {categories?.map(({ value, label, subcategories }, i) => {
            return (
              <Controller
                name={`categories.${i}`}
                key={label + i}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <Select
                      key={i}
                      isMultiple
                      noOptionsMessage="Keine weiteren Optionen"
                      options={subcategories}
                      onChange={(options) => {
                        onChange(options);
                        handleSubmit(onSubmit)();
                      }}
                      onBlur={onBlur}
                      value={value}
                      classNames={selectPickerClassNames}
                      placeholder={label}
                    />
                  );
                }}
              />
            );
          })}
        </div>
      </form>
    );
  };
  return (
    <fieldset>
      <div className="mt-2 mx-auto">
        <div className="flex md:flex-col flex-col gap-4">
          {isMobile && (
            <div className="w-full align-items-end text-right -ml-2 mb-4">
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
};
export default LeftPanel;
