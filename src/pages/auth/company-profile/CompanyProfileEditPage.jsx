import React, { useState, useEffect } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import companyImgPlaceholder from '../../../assets/img/company_placeholder.png';
import Input from '../../../components/elements/input/Input';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { selectPickerClassNames } from '../../../components/elements/input/select/utilities';
import { companySizes } from './utilities';
import Button from '../../../components/elements/buttons/Button';
import Select from 'react-tailwindcss-select';
import Checkbox from '../../../components/elements/input/Checkbox';
import {
  useGetLocationsQuery,
  useGetEmployerCategoriesQuery,
} from '../../../features/api/apiSlice';
import { useForm, Controller } from 'react-hook-form';
import {
  useGetCompanyDetailsQuery,
  useUpdateCompanyProfileMutation,
} from '../../../features/auth/companyApiSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../../../components/elements/toast/ToastMessage';

const CompanyProfileEditPage = () => {
  const { data: locations } = useGetLocationsQuery();
  const { data: companyTypes } = useGetEmployerCategoriesQuery();
  const navigate = useNavigate();
  const { data: result, isLoading: userDataStillLoading } =
    useGetCompanyDetailsQuery();
  const company = result?.data;
  const [updateCompanyProfile, { isLoading, isSuccess, isError }] =
    useUpdateCompanyProfileMutation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
    setError,
    handleSubmit,
  } = useForm({
    defaultValues: {
      invoice_data_same_as_contact_data: false,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/company/profile');
    }
  }, [isSuccess]);

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

    if (!hasErros) {
      const transformedData = {
        ...data,
        category_id: data.category_id.value,
        size: data.size.label,
        plz: data.plz.plz,
        plz_id: data.plz.id,
        kantone_id: data.plz.kantone_id,
      };
      // console.log(transformedData);
      updateCompanyProfile(transformedData);
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
      <Page>
        <PageContent>
          <ToastMessage isSuccess={isSuccess} isError={isError} />
          <div className="w-full pt-10 pb-10 bg-radial-gradient flex-1">
            <div className="w-full flex flex-col text-center items-center text-blueGray-700">
              <div
                className={`md:w-9/12 w-11/12 md:p-0 p-4 flex flex-row mx-auto`}
              >
                <Link
                  to={'/company/profile'}
                  className="text-primary-500 font-semibold"
                >
                  <i className="fa-solid fa-arrow-left"></i> zurück zum Profil
                </Link>
              </div>
              <h2 className="text-2xl font-bold text-blueGray-800 mb-10">
                Bearbeiten Sie ihr Unternehmensprofil{' '}
              </h2>
              {(isLoading || userDataStillLoading) && (
                <div className="w-full h-full text-center pt-8">
                  <div
                    className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                          border-[2px] border-dashed border-primary-500 border-t-transparent"
                  ></div>
                </div>
              )}

              {!isLoading && !userDataStillLoading && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:w-9/12 w-11/12 p-4 md:px-10 flex flex-col items-center text-left gap-1 text-[14px]  bg-white rounded-xl shadow-lg drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]"
                >
                  <div className="w-full flex justify-start">
                    <h5 className="font-bold text-xl text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-10">
                      Unternehmensdaten
                    </h5>
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Unternehmensname*:
                    </label>
                    <Controller
                      key={'name'}
                      name={`name`}
                      control={control}
                      defaultValue={company?.name || ''}
                      rules={{ required: 'Bitte Unternehmensname eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            type="text"
                            placeholder="Unternehmensname"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors.name && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Unternehmensart*:
                    </label>
                    {companyTypes && (
                      <Controller
                        name={`category_id`}
                        rules={{ required: 'Bitte Unternehmensart wählen' }}
                        defaultValue={companyTypes[company?.category_id - 1]}
                        control={control}
                        render={({ field: { value, name, onChange } }) => {
                          return (
                            <Select
                              isMultiple={false}
                              isClearable={true}
                              options={companyTypes}
                              onChange={onChange}
                              value={value}
                              classNames={selectPickerClassNames}
                              placeholder={'Unternehmensart'}
                              name={name}
                            />
                          );
                        }}
                      />
                    )}

                    {errors?.category_id && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors?.category_id.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left mt-2">
                    <label className="text-base font-semibold">
                      Unternehmensgröße*:
                    </label>
                    <Controller
                      name={`size`}
                      rules={{ required: 'Bitte Unternehmensgröße wählen' }}
                      defaultValue={companySizes?.find(
                        (el) => el.label === company?.size
                      )}
                      control={control}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Select
                            isMultiple={false}
                            isClearable={true}
                            options={companySizes}
                            onChange={onChange}
                            value={value}
                            classNames={selectPickerClassNames}
                            placeholder={'Unternehmensgröße'}
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors?.size && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors?.size.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 mt-2 text-left">
                    <label className="text-base font-semibold">
                      Adresse / Nr. *:
                    </label>
                    <Controller
                      key={'address'}
                      name={`address`}
                      control={control}
                      defaultValue={company?.address || ''}
                      rules={{ required: 'Bitte Addresse eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            type="text"
                            placeholder="Adress / Nr."
                            onChange={onChange}
                            value={value}
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors.address && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Plz / Ort. *:
                    </label>
                    <div className="w-full flex md:flex-row flex-col gap-2">
                      <div className="w-full">
                        {locations && (
                          <Controller
                            key={'plz'}
                            name={`plz`}
                            control={control}
                            defaultValue={locations?.data[company?.plz_id]}
                            render={({
                              field: {
                                value = locations?.data[company?.plz_id],
                                name,
                                onChange,
                              },
                            }) => {
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
                          defaultValue={company?.ort || ''}
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
                      <label className="text-base font-semibold">
                        Kanton*:
                      </label>
                      <Controller
                        key={'kantone'}
                        name={`kantone`}
                        control={control}
                        defaultValue={company?.kantone?.name || ''}
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

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold text-blueGray-800">
                      Website:
                    </label>
                    <Controller
                      key={'page_url'}
                      name={`page_url`}
                      control={control}
                      defaultValue={company?.page_url || ''}
                      rules={{ required: 'Bitte Website eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            type="text"
                            placeholder="Website"
                            onChange={onChange}
                            value={value}
                            name={name}
                          />
                        );
                      }}
                    />

                    {errors.page_url && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.page_url.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Unternehmensbeschreibung*:
                    </label>
                    <Controller
                      key={'description'}
                      name={`description`}
                      control={control}
                      defaultValue={company?.description || ''}
                      rules={{
                        required: 'Bitte Unternehmensbeschreibung eingeben',
                      }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <textarea
                            name={name}
                            onChange={onChange}
                            value={value}
                            placeholder="Unternehmensbeschreibung"
                            className="resize rounded-md border-[0.5px] border-gray-400 px-2 py-1 max-w-full"
                            rows={10}
                          ></textarea>
                        );
                      }}
                    />

                    {errors.description && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex justify-start">
                    <h5 className="font-bold text-xl text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-10">
                      Kontaktdaten
                    </h5>
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">Anrede:</label>
                    <div className="w-full flex flex-row gap-2">
                      <Controller
                        key={'c_p_gender'}
                        name={`c_p_gender`}
                        control={control}
                        defaultValue={company?.c_p_gender}
                        rules={{ required: 'Bitte Geschlecht eingeben' }}
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
                    {errors.c_p_gender && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-1"
                      >
                        *{errors.c_p_gender.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 mt-2 text-left">
                    <label className="text-base font-semibold">Vorname*:</label>
                    <Controller
                      key={'c_p_name'}
                      name={`c_p_name`}
                      control={control}
                      defaultValue={company?.c_p_name || ''}
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
                    {errors.c_p_name && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.c_p_name.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Nachname*:
                    </label>
                    <Controller
                      key={'c_p_surname'}
                      name={`c_p_surname`}
                      control={control}
                      defaultValue={company?.c_p_surname || ''}
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
                    {errors.c_p_surname && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.c_p_surname.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">E-mail*:</label>
                    <Controller
                      key={'c_p_email'}
                      name={`c_p_email`}
                      control={control}
                      defaultValue={company?.c_p_email || ''}
                      rules={{
                        required: {
                          value: true,
                          message: 'Bitte E-mail eingeben',
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message:
                            'Bitte geben Sie eine gültige E-mail Adresse ein',
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
                    {errors.c_p_email && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.c_p_email.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold text-blueGray-800">
                      Telefon*:
                    </label>
                    <Controller
                      key={'c_p_phone'}
                      name={`c_p_phone`}
                      control={control}
                      defaultValue={company?.c_p_phone || ''}
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
                    {errors.c_p_phone && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.c_p_phone.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">Fax:</label>
                    <Controller
                      key={'c_p_fax'}
                      name={`c_p_fax`}
                      control={control}
                      defaultValue={company?.c_p_fax || ''}
                      rules={{ required: 'Bitte Faxnummer eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            type="text"
                            placeholder="Fax"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors.c_p_fax && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.c_p_fax.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex justify-start">
                    <h5 className="font-bold text-xl text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-10">
                      Rechnungsadresse
                    </h5>
                  </div>

                  <div className="w-full flex justify-start">
                    <Controller
                      name={`invoice_data_same_as_contact_data`}
                      control={control}
                      defaultValue={
                        getValues('invoice_data_same_as_contact_data') || false
                      }
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Checkbox
                            onChange={(newValue) => {
                              setValue(
                                'invoice_data_same_as_contact_data',
                                !getValues('invoice_data_same_as_contact_data')
                              );
                              if (newValue) {
                                setValue('team_email', getValues('c_p_email'));
                                setValue('phone', getValues('c_p_phone'));
                                setValue('fax', getValues('c_p_fax'));
                              }
                            }}
                            checked={value}
                            className="text-left"
                            {...{
                              label:
                                ' Kontaktadresse entspricht der Rechnungsadresse',
                            }}
                            name={name}
                          />
                        );
                      }}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1 mt-4 text-left">
                    <label className="text-base font-semibold">
                      Team E-mail*:
                    </label>
                    <Controller
                      key={'team_email'}
                      name={`team_email`}
                      control={control}
                      defaultValue={company?.team_email || ''}
                      rules={{ required: 'Bitte Team E-mail eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            type="text"
                            placeholder="Team E-mail"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors.team_email && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.team_email.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold text-blueGray-800">
                      Telefon*:
                    </label>
                    <Controller
                      key={'phone'}
                      name={`phone`}
                      control={control}
                      defaultValue={company?.phone || ''}
                      rules={{ required: 'Bitte Team Telefonnumer eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            type="text"
                            placeholder="Telefonnnumer"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors.phone && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">Fax:</label>
                    <Controller
                      key={'fax'}
                      name={`fax`}
                      control={control}
                      defaultValue={company?.fax || ''}
                      rules={{ required: 'Bitte Faxnummer eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            type="text"
                            placeholder="Fax"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors.fax && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.fax.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex justify-start">
                    <h5 className="font-bold text-xl text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-10">
                      Job Beneftis
                    </h5>
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">Benefits:</label>
                    <Controller
                      key={'benefits'}
                      name={`benefits`}
                      control={control}
                      defaultValue={company?.benefits || ''}
                      // rules={{ required: 'Bitte Benefits eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <textarea
                            name={name}
                            onChange={onChange}
                            value={value}
                            placeholder="Benefits"
                            className="resize rounded-md border-[0.5px] border-gray-400 px-2 py-1 max-w-full"
                            rows={10}
                          ></textarea>
                        );
                      }}
                    />

                    {errors.benefits && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors.benefits.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Ferientage:
                    </label>
                    <Controller
                      key={'holidays'}
                      name={`holidays`}
                      control={control}
                      defaultValue={company?.holidays || ''}
                      // rules={{ required: 'Bitte Ferientage eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            type="text"
                            placeholder="Ferientage"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors.holidays && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.holidays.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Mutterschaftsentschädigung:
                    </label>
                    <Controller
                      key={'maternity_benefits'}
                      name={`maternity_benefits`}
                      control={control}
                      defaultValue={company?.maternity_benefits || ''}
                      // rules={{ required: 'Bitte Mutterschaftsentschädigungen eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <textarea
                            name={name}
                            onChange={onChange}
                            value={value}
                            placeholder="Mutterschaftsentschädigung"
                            className="resize rounded-md border-[0.5px] border-gray-400 px-2 py-1 max-w-full"
                            rows={10}
                          ></textarea>
                        );
                      }}
                    />

                    {errors.maternity_benefits && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors.maternity_benefits.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-row justify-end py-8 text-right">
                    <Button {...{ type: 'submit', children: 'Speichern' }} />
                  </div>
                </form>
              )}
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default CompanyProfileEditPage;
