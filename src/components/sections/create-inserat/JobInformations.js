import React, { useState, useEffect } from 'react'; //eslint-disable-line
import Input from '../../elements/input/Input';
import { selectPickerClassNames } from '../../elements/input/select/utilities';
import Select from 'react-tailwindcss-select';
import {
  useGetCategoriesQuery,
  useGetLocationsQuery,
  useGetContractTypesQuery,
} from '../../../features/api/apiSlice';
import Checkbox from '../../elements/input/Checkbox';
import MultiRangeSlider from 'multi-range-slider-react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Datepicker from 'react-tailwindcss-datepicker';
import { useForm, Controller } from 'react-hook-form';

export default function JobInformations({ form, setForm }) {
  const { data: categories, isLoading: areCategoriesLoading } =
    useGetCategoriesQuery();
  const { data: locations, isLoading: areLocationsLoading } =
    useGetLocationsQuery();
  const { data: employementType, isLoading: areEmploymentTypesLoading } =
    useGetContractTypesQuery();

  const {
    control,
    setValue,
    formState: { errors },
    clearErrors,
    setError,
    handleSubmit,
  } = useForm({});

  const genderInputArray = [
    {
      value: 'male',
      label: 'Herr',
    },
    {
      value: 'female',
      label: 'Frau',
    },
  ];

  const generateWorktimeAndPositionValue = (first, second) => {
    let value = 0;
    if (first && !second) {
      value = 1;
    }
    if (!first && second) {
      value = 2;
    }
    if (first && second) {
      value = 3;
    }
    return value;
  };

  const onSubmit = (data) => {
    let hasErros = false;
    if (data?.plz === '') {
      setError('plz', { type: 'custom', message: 'Bitte Plz/Ort eingeben' });
      hasErros = true;
    } else if (data?.plz !== '' && data?.ort === '') {
      setError('plz', {
        type: 'custom',
        message: 'Bitte Plz/Ort von der emfpehlungsliste wählen',
      });
      hasErros = true;
    }
    if (!data?.start_date?.startDate && !data?.by_arrangement) {
      setError('start_date', {
        type: 'custom',
        message: 'Bitte Stelleneintrit eingeben',
      });
      hasErros = true;
    }

    if (!hasErros) {
      const transformedData = {
        ...data,
        by_arrangement: data?.by_arrangement ? 1 : 0,
        start_date: data?.start_date?.startDate,
        contract_type: data?.contract_type_id,
        contract_type_id: data?.contract_type_id?.value,
        job_category_id: data?.job_category_id?.value,
        job_subcategory_id: data?.job_subcategory_id?.value,
        work_time: generateWorktimeAndPositionValue(
          data?.work_time_regular,
          data?.work_time_non_regular
        ),
        position: generateWorktimeAndPositionValue(
          data?.position_with_lead,
          data?.position_without_lead
        ),
        workload_from: data?.pensum?.workload_from,
        workload_to: data?.pensum?.workload_to,
        plz: data?.plz?.plz,
        plz_id: data?.plz?.id,
        kantone_id: data?.plz?.kantone_id,
        step_wizard: 2,
      };

      setForm({
        ...form,
        ...transformedData,
      });
    }
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item?.plz + ' , ' + item?.ort}
        </span>
      </>
    );
  };

  return (
    <>
      {(areCategoriesLoading ||
        areLocationsLoading ||
        areEmploymentTypesLoading) && (
        <div className="w-full h-full text-center pt-8">
          <div
            className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                  border-[2px] border-dashed border-primary-500 border-t-transparent"
          ></div>
        </div>
      )}
      {!areCategoriesLoading &&
        !areLocationsLoading &&
        !areEmploymentTypesLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left">
              <label className="text-base font-semibold text-blueGray-700">
                Arbeitgeber*:
              </label>
              <Input
                type="text"
                placeholder="Arbeitgeber"
                value={form?.name}
                disabled
              />
            </div>
            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left mt-1 mb-2">
              <label className="text-base font-semibold text-blueGray-700">
                Job Kategorie*:
              </label>
              {categories && (
                <Controller
                  name={`job_category_id`}
                  rules={{ required: 'Bitte Job Kategorie wählen' }}
                  defaultValue={categories[form?.job_category_id - 1] || null}
                  control={control}
                  render={({ field: { value, name } }) => {
                    return (
                      <Select
                        isMultiple={false}
                        isClearable={true}
                        options={categories}
                        onChange={(item) => {
                          if (item) {
                            const newSubCategories = item
                              ? categories[item.value]?.subcategories
                              : [];
                            setValue('job_category_id', item);
                            setValue('job_subcategory_id', null);
                            setForm({
                              ...form,
                              job_subcategories: newSubCategories,
                              is_subcategory_disabled: false,
                            });
                            clearErrors('job_category_id');
                          } else {
                            setValue('job_category_id', null);
                            setValue('job_subcategory_id', null);
                            setForm({
                              ...form,
                              job_subcategories: [],
                              is_subcategory_disabled: true,
                            });
                          }
                        }}
                        value={value}
                        classNames={selectPickerClassNames}
                        placeholder={'Job Kategorie'}
                        name={name}
                      />
                    );
                  }}
                />
              )}

              {errors?.job_category_id && (
                <p role="alert" className="text-red-500 text-xs font-semibold">
                  *{errors?.job_category_id.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left mt-1 mb-2">
              <label className="text-base font-semibold text-blueGray-700">
                Unterkategorie*:
              </label>
              {form.job_subcategories && (
                <Controller
                  name={`job_subcategory_id`}
                  rules={{ required: 'Bitte Unterkategorie wählen' }}
                  defaultValue={form?.job_subcategories?.find(
                    (el) => el.value === form?.job_subcategory_id
                  )}
                  control={control}
                  render={({ field: { value, name, onChange } }) => {
                    return (
                      <Select
                        isMultiple={false}
                        isDisabled={form?.is_subcategory_disabled}
                        isSearchable={true}
                        isClearable={true}
                        options={form?.job_subcategories}
                        onChange={onChange}
                        value={value}
                        classNames={selectPickerClassNames}
                        placeholder="Unterkategorie (Wählen Sie erstmals eine Kategorie)"
                        name={name}
                      />
                    );
                  }}
                />
              )}
              {errors?.job_subcategory_id && (
                <p role="alert" className="text-red-500 text-xs font-semibold">
                  *{errors?.job_subcategory_id.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left mb-3">
              <h3 className="text-base font-semibold text-blueGray-700 ">
                Anstellungsart:
              </h3>
              {employementType && (
                <Controller
                  name={`contract_type_id`}
                  rules={{ required: 'Bitte Anstellungsart wählen' }}
                  defaultValue={employementType[form?.contract_type_id - 1]}
                  control={control}
                  render={({ field: { value, name, onChange } }) => {
                    return (
                      <Select
                        isMultiple={false}
                        isClearable={true}
                        options={employementType}
                        onChange={onChange}
                        value={value}
                        classNames={selectPickerClassNames}
                        placeholder={'Anstellungsart'}
                        name={name}
                      />
                    );
                  }}
                />
              )}

              {errors?.contract_type_id && (
                <p role="alert" className="text-red-500 text-xs font-semibold">
                  *{errors?.contract_type_id.message}
                </p>
              )}
            </div>
            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left">
              <label className="text-base font-semibold text-blueGray-700">
                Stellenbezeichnung (Titel):
              </label>
              <Controller
                key={'job_title'}
                name={`job_title`}
                control={control}
                defaultValue={form?.job_title || ''}
                rules={{ required: 'Bitte Job Titel eingeben' }}
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value}
                      type="text"
                      placeholder="Job Titel"
                      name={name}
                    />
                  );
                }}
              />
              {errors.job_title && (
                <p
                  role="alert"
                  className="text-red-500 text-xs font-semibold -mt-3"
                >
                  *{errors.job_title.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 mb-3 px-2 text-left">
              <label className="text-base font-semibold text-blueGray-700">
                Pensum :
              </label>
              <Controller
                name={`pensum`}
                control={control}
                defaultValue={{
                  workload_from: form?.workload_from,
                  workload_to: form?.workload_to,
                }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <>
                      <div className="flex justify-between w-full">
                        <span className="justify-self-start text-sm">
                          {value.workload_from} %
                        </span>
                        <span></span>
                        <span className="justify-self-end text-sm">
                          {value.workload_to} %
                        </span>
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
                          padding: '15px 10px 0 10px',
                        }}
                        barLeftColor="#e5e7eb"
                        barRightColor="linear-gradient(60deg, #26c6da, #0097a7)"
                        barInnerColor="#0097a7"
                        thumbLeftColor="#0097a7"
                        thumbRightColor="#0097a7"
                        minValue={value.workload_from}
                        maxValue={value.workload_to}
                        onInput={(e) => {
                          setValue('pensum', {
                            workload_from: e.minValue,
                            workload_to: e.maxValue,
                          });
                        }}
                        onChange={(e) => {
                          setValue('pensum', {
                            workload_from: e.minValue,
                            workload_to: e.maxValue,
                          });
                        }}
                      />
                    </>
                  );
                }}
              />
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left">
              <label className="text-base font-semibold text-blueGray-700">
                Plz / Ort. *:
              </label>

              <div className="w-full flex md:flex-row flex-col gap-2">
                <div className="w-full">
                  {locations && (
                    <Controller
                      key={'plz'}
                      name={`plz`}
                      control={control}
                      defaultValue={locations?.data[form?.plz_id]}
                      render={({ field: { value, name } }) => {
                        return (
                          <ReactSearchAutocomplete
                            items={locations?.data}
                            fuseOptions={{ keys: ['plz', 'ort'] }}
                            resultStringKeyName="plz"
                            maxResults={5}
                            inputSearchString={parseInt(value?.plz) || ''}
                            showNoResultsText="Keine Ergebnisse"
                            placeholder="Plz/Ort"
                            styling={{
                              fontFamily: "Titillium Web', sans-serif",
                              fontSize: '14px',
                              height: '36px',
                              borderRadius: '5px',
                              zIndex: 1,
                            }}
                            autoFocus={false}
                            showItemsOnFocus={false}
                            onSelect={(item) => {
                              if (item) {
                                setValue('plz', item);
                                setValue('ort', item?.ort);
                                setValue('kantone', item?.kantone?.name);
                                clearErrors('plz');
                              }
                            }}
                            onClear={() => {
                              setValue('plz', '');
                              clearErrors('plz');
                              setValue('ort', '');
                              setValue('kantone', '');
                            }}
                            onSearch={(string, result) => {
                              clearErrors('plz');
                              setValue('plz', string);
                            }}
                            formatResult={formatResult}
                            name={name}
                          />
                        );
                      }}
                    />
                  )}
                </div>
                <div className="w-full">
                  <Controller
                    key={'ort'}
                    name={`ort`}
                    control={control}
                    defaultValue={form?.ort || ''}
                    render={({ field: { value, name, onChange } }) => {
                      return (
                        <Input
                          value={value}
                          type="text"
                          placeholder="Ort"
                          extraclass="disabled"
                          isDisabled={true}
                          readOnly={true}
                          onChange={onChange}
                          name={name}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className=" w-full flex flex-col text-left">
                {errors.plz && (
                  <p
                    role="alert"
                    className="text-red-500 text-xs font-semibold -mt-3"
                  >
                    *{errors.plz.message}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col gap-1 text-left">
                <label className="text-base font-semibold">Kanton*:</label>
                <Controller
                  key={'kantone'}
                  name={`kantone`}
                  control={control}
                  defaultValue={form?.kantone?.name || ''}
                  render={({ field: { value, name, onChange } }) => {
                    return (
                      <Input
                        value={value}
                        type="text"
                        placeholder="Kanton"
                        extraclass="disabled"
                        isDisabled={true}
                        readOnly={true}
                        onChange={onChange}
                        name={name}
                      />
                    );
                  }}
                />
              </div>
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left mt-1">
              <label className="text-base font-semibold text-blueGray-700">
                Stellenantritt:
              </label>
              <div className="w-full flex flex-row gap-4">
                <div className="w-8/12">
                  <Controller
                    key={'start_date'}
                    name={`start_date`}
                    control={control}
                    defaultValue={{
                      startDate: form?.start_date,
                      endDate: form?.start_date,
                    }}
                    render={({ field: { value, name, onChange } }) => {
                      return (
                        <Datepicker
                          inputClassName={
                            'relative transition-all duration-300 py-1.5 pl-4 pr-14 w-full border-gray-400 border-[0.5px] rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-primary-500 focus:ring-primary-500/20'
                          }
                          primaryColor={'teal'}
                          asSingle={true}
                          useRange={false}
                          disabled={form?.by_arrangement}
                          value={value}
                          i18n={'de'}
                          displayFormat="DD.MM.YYYY"
                          onChange={onChange}
                          name={name}
                        />
                      );
                    }}
                  />
                </div>
                <div className="w-4/12 text-blueGray-700 pt-2">
                  <Controller
                    name={`by_arrangement`}
                    control={control}
                    defaultValue={form?.by_arrangement === 1 ? true : false}
                    render={({ field: { value, name } }) => {
                      return (
                        <Checkbox
                          onChange={() => {
                            setForm({
                              ...form,
                              by_arrangement: !form?.by_arrangement,
                            });
                            setValue('by_arrangement', !form?.by_arrangement);
                            setValue('start_date', {
                              startDate: null,
                              endDate: null,
                            });
                            clearErrors('start_date');
                          }}
                          checked={value}
                          className="text-left"
                          {...{ label: '  nach Vereinbarung' }}
                          name={name}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              {errors?.start_date && (
                <p role="alert" className="text-red-500 text-xs font-semibold">
                  *{errors?.start_date.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-2 mt-2 text-left">
              <label className="text-base font-semibold text-blueGray-700">
                Arbeitszeiten :
              </label>
              <Controller
                name={`work_time_regular`}
                control={control}
                defaultValue={
                  form?.work_time === 1 || form?.work_time === 3 ? true : false
                }
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Checkbox
                      onChange={onChange}
                      checked={value}
                      className="text-left"
                      {...{ label: '  Regelmässig' }}
                      name={name}
                    />
                  );
                }}
              />
              <Controller
                name={`work_time_non_regular`}
                control={control}
                defaultValue={
                  form?.work_time === 2 || form?.work_time === 3 ? true : false
                }
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Checkbox
                      onChange={onChange}
                      checked={value}
                      className="text-left"
                      {...{ label: '  Unregelmässig' }}
                      name={name}
                    />
                  );
                }}
              />

              <h3 className="text-base font-semibold mt-2 text-blueGray-700">
                Position:
              </h3>
              <Controller
                name={`position_with_lead`}
                control={control}
                defaultValue={
                  form?.position === 1 || form?.position === 3 ? true : false
                }
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Checkbox
                      onChange={onChange}
                      checked={value}
                      className="text-left"
                      {...{ label: '  mit Führungsaufgaben' }}
                      name={name}
                    />
                  );
                }}
              />
              <Controller
                name={`position_without_lead`}
                control={control}
                defaultValue={
                  form?.position === 2 || form?.position === 3 ? true : false
                }
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Checkbox
                      onChange={onChange}
                      checked={value}
                      className="text-left"
                      {...{ label: '  ohne Führungsaufgaben' }}
                      name={name}
                    />
                  );
                }}
              />
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left">
              <h3 className="font-semibold text-lg mt-4 text-blueGray-700">
                Inserat Ansprechspartner:
              </h3>
              <label className="text-base font-semibold text-blueGray-700">
                Anrede:
              </label>
              <div className="w-full flex flex-row gap-2">
                <Controller
                  key={'c_person_gender'}
                  name={`c_person_gender`}
                  control={control}
                  defaultValue={form?.c_person_gender}
                  rules={{ required: 'Bitte Anrede eingeben' }}
                  render={({ field: { value, name, onChange } }) => {
                    return (
                      <>
                        {genderInputArray.map((item) => (
                          <div key={`${item?.label}-container`}>
                            <label
                              htmlFor={`${item?.name}`}
                              className="text-blueGray-500 my-auto mr-1"
                            >
                              {item?.label}
                            </label>
                            <input
                              id={item?.label}
                              name={name}
                              onChange={onChange}
                              type="radio"
                              value={item?.value}
                              checked={value === item?.value}
                              className="h-4 w-4  accent-primary-500 mt-1"
                            />
                          </div>
                        ))}
                      </>
                    );
                  }}
                />
              </div>
              {errors.c_person_gender && (
                <p
                  role="alert"
                  className="text-red-500 text-xs font-semibold -mt-1"
                >
                  *{errors.c_person_gender.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 mt-2 text-left">
              <label className="text-base font-semibold">Vorname*:</label>
              <Controller
                key={'c_person_name'}
                name={`c_person_name`}
                control={control}
                defaultValue={form?.c_person_name || ''}
                rules={{ required: 'Bitte Vornamen eingeben' }}
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value}
                      type="text"
                      placeholder="Vorname"
                      name={name}
                    />
                  );
                }}
              />
              {errors.c_person_name && (
                <p
                  role="alert"
                  className="text-red-500 text-xs font-semibold -mt-3"
                >
                  *{errors.c_person_name.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left">
              <label className="text-base font-semibold">Nachname*:</label>
              <Controller
                key={'c_person_last_name'}
                name={`c_person_last_name`}
                control={control}
                defaultValue={form?.c_person_last_name || ''}
                rules={{ required: 'Bitte Nachname eingeben' }}
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value}
                      type="text"
                      placeholder="Nachname"
                      name={name}
                    />
                  );
                }}
              />
              {errors.c_person_last_name && (
                <p
                  role="alert"
                  className="text-red-500 text-xs font-semibold -mt-3"
                >
                  *{errors.c_person_last_name.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left">
              <label className="text-base font-semibold">E-mail*:</label>
              <Controller
                key={'c_person_email'}
                name={`c_person_email`}
                control={control}
                defaultValue={form?.c_person_email || ''}
                rules={{
                  required: {
                    value: true,
                    message: 'Bitte E-mail eingeben',
                  },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Bitte geben Sie eine gültige E-mail Adresse ein',
                  },
                }}
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value}
                      type="text"
                      placeholder="E-mail"
                      name={name}
                    />
                  );
                }}
              />
              {errors.c_person_email && (
                <p
                  role="alert"
                  className="text-red-500 text-xs font-semibold -mt-3"
                >
                  *{errors.c_person_email.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left">
              <label className="text-base font-semibold text-blueGray-800">
                Telefon*:
              </label>
              <Controller
                key={'c_person_phone'}
                name={`c_person_phone`}
                control={control}
                defaultValue={form?.c_person_phone}
                rules={{ required: 'Bitte Telefonnummer eingeben' }}
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value}
                      type="text"
                      placeholder="Telefonnumer"
                      name={name}
                    />
                  );
                }}
              />
              {errors.c_person_phone && (
                <p
                  role="alert"
                  className="text-red-500 text-xs font-semibold -mt-3"
                >
                  *{errors.c_person_phone.message}
                </p>
              )}
            </div>

            <div className="md:w-8/12 w-full flex flex-col gap-1 text-left mt-3">
              <label className="text-base font-semibold text-blueGray-700">
                Unternehmensbeschreibung:
              </label>
              <Controller
                key={'employer_description'}
                name={`employer_description`}
                control={control}
                defaultValue={form?.employer_description}
                rules={{ required: 'Bitte Unternehmensbeschreibung eingeben' }}
                render={({ field: { value, name, onChange } }) => {
                  return (
                    <textarea
                      name={name}
                      onChange={onChange}
                      value={value}
                      placeholder="Unternehmensbeschreibung"
                      className="resize rounded-md border-[0.5px] border-gray-400 px-2 py-1 max-w-full text-sm"
                      rows={10}
                    ></textarea>
                  );
                }}
              />

              {errors.employer_description && (
                <p role="alert" className="text-red-500 text-xs font-semibold">
                  *{errors.employer_description.message}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none font-bold py-2 px-4 rounded-full"
                type="submit"
              >
                Weiter <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        )}
    </>
  );
}
