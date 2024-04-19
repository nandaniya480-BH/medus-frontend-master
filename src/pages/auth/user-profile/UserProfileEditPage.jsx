import React, { useState, useEffect } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import Input from '../../../components/elements/input/Input';
import Datepicker from 'react-tailwindcss-datepicker';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Button from '../../../components/elements/buttons/Button';
import { useGetLocationsQuery } from '../../../features/api/apiSlice';
import {
  useUpdateUserProfileMutation,
  useGetUserDetailsQuery,
} from '../../../features/auth/userApiSlice';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import { useNavigate } from 'react-router-dom';

const UserProfileEditPage = () => {
  const { data: locations } = useGetLocationsQuery();
  const { data: result, isLoading: userDataStillLoading } =
    useGetUserDetailsQuery();
  const user = result?.data;
  const [updateUserProfile, { isLoading, isSuccess, isError }] =
    useUpdateUserProfileMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/user/profile');
    }
  }, [isSuccess, navigate]);
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

  const onSubmit = (data) => {
    console.log(data);
    let hasErros = false;
    if (data?.plz === '') {
      setError('plz', { type: 'custom', message: 'Bitte Plz/Ort eingeben' });
      hasErros = true;
    } else if (data?.plz !== '' && (data.ort === '' || data.ort === null)) {
      setError('plz', {
        type: 'custom',
        message: 'Bitte Plz/Ort von der emfpehlungsliste wählen',
      });
      hasErros = true;
    } else if (data.age.startDate === null) {
      setError('age', {
        type: 'custom',
        message: 'Bitte Geburtsdatum eingeben',
      });
      hasErros = true;
    }

    if (!hasErros) {
      const transformedData = {
        ...data,
        age: data.age.startDate,
        plz: data.plz?.plz,
        plz_id: data.plz?.id,
        kantone_id: data.plz.kantone_id,
        phone: data.mobile,
        address: data.address || 'n/a',
      };
      updateUserProfile(transformedData);
    }
  };

  const formatResult = (item) => {
    return (
      <>
        <span
          key={item?.plz + item?.ort}
          style={{ display: 'block', textAlign: 'left' }}
        >
          {item?.plz + ' , ' + item?.ort}
        </span>
      </>
    );
  };

  return (
    <>
      <Page>
        <PageContent>
          <div className="w-full pt-10 pb-10 bg-radial-gradient flex-1">
            <ToastMessage isSuccess={isSuccess} isError={isError} />
            <div className="w-full flex flex-col text-center items-center text-blueGray-700 md:p-0 p-4">
              <div
                className={`md:w-8/12 w-full md:p-0 p-4 flex flex-row mx-auto`}
              >
                <Link
                  to={'/user/profile'}
                  className="text-primary-500 font-semibold"
                >
                  <i className="fa-solid fa-arrow-left"></i> zurück zum Profil
                </Link>
              </div>
              <h2 className="text-3xl font-bold text-blueGray-800 mb-10">
                Meine Personalien
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
                  className="md:w-8/12 w-full p-4 md:px-10 flex flex-col items-center text-left gap-1 text-[14px]  bg-white rounded-xl shadow-lg drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]"
                >
                  <div className=" w-full flex justify-start">
                    <h5 className="font-bold text-lg text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-4">
                      Meine Personalien
                    </h5>
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">Vorname*:</label>
                    <Controller
                      key={'name'}
                      name={`name`}
                      control={control}
                      defaultValue={user?.name}
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
                      Nachname*:
                    </label>
                    <Controller
                      key={'last_name'}
                      name={`last_name`}
                      control={control}
                      defaultValue={user?.last_name}
                      rules={{ required: 'Bitte Nachname eingeben' }}
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
                    {errors.last_name && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.last_name.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <span className="text-base font-semibold">Geschlecht:</span>
                    <div className="w-full flex flex-row gap-2 align-items-middle">
                      <Controller
                        key={'gender'}
                        name={`gender`}
                        control={control}
                        defaultValue={user?.gender}
                        rules={{ required: 'Bitte Geschlecht eingeben' }}
                        render={({ field: { value, name, onChange } }) => {
                          return (
                            <>
                              {genderInputArray.map((item) => (
                                <div
                                  key={`${item.label}-container`}
                                  className="flex"
                                >
                                  <label
                                    htmlFor={item?.label}
                                    className="text-blueGray-500 mr-1 my-auto"
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
                                    className="h-4 w-4  accent-primary-500 my-auto"
                                  />
                                </div>
                              ))}
                            </>
                          );
                        }}
                      />

                      {errors.gender && (
                        <p
                          role="alert"
                          className="text-red-500 text-xs font-semibold -mt-3"
                        >
                          *{errors.gender.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className=" w-full flex flex-col gap-1 text-left mt-1">
                    <label className="text-base font-semibold">
                      Geburtsdatum*:
                    </label>
                    <Controller
                      key={'age'}
                      name={`age`}
                      control={control}
                      defaultValue={{
                        startDate: user?.age || null,
                        endDate: user?.age || null,
                      }}
                      rules={{ required: 'Bitte Geburtsdatum eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Datepicker
                            inputClassName={
                              'relative transition-all duration-300 py-1.5 pl-4 pr-14 w-full border-gray-400 border-[0.5px] rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-primary-500 focus:ring-primary-500/20'
                            }
                            primaryColor={'teal'}
                            asSingle={true}
                            useRange={false}
                            value={value}
                            i18n={'de'}
                            onChange={onChange}
                            displayFormat="DD.MM.YYYY"
                            name={name}
                          />
                        );
                      }}
                    />

                    {errors?.age && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors?.age.message}
                      </p>
                    )}
                  </div>

                  <div className="disabled w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">E-mail*:</label>
                    <Controller
                      key={'email'}
                      name={`email`}
                      control={control}
                      defaultValue={user?.email}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            type="email"
                            placeholder="E-mail"
                            value={value}
                            readOnly={true}
                            isDisabled
                            name={name}
                          />
                        );
                      }}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Adresse / Nr.:
                    </label>
                    <Controller
                      key={'address'}
                      name={`address`}
                      control={control}
                      defaultValue={
                        user?.address === 'n/a' ? '' : user?.address
                      }
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
                            rules={{ required: 'Bitte Plz/Ort eingeben' }}
                            defaultValue={locations?.data[user?.plz_id] ?? ''}
                            render={({ field: { value, name, onChange } }) => {
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
                          defaultValue={user?.ort || ''}
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
                        defaultValue={user?.kantone?.name}
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
                    <label className="text-base font-semibold">Mobile*:</label>
                    <Controller
                      key={'mobile'}
                      name={`mobile`}
                      control={control}
                      defaultValue={user?.mobile}
                      rules={{ required: 'Bitte Mobilnummer eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            type="text"
                            placeholder="Mobile"
                            onChange={onChange}
                            value={value}
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors.mobile && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors.mobile.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Mein kurz Profil*:
                    </label>
                    <Controller
                      key={'description'}
                      name={`description`}
                      control={control}
                      defaultValue={user?.description || ''}
                      rules={{ required: 'Bitte Ein Kurzes Profil eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <textarea
                            name={name}
                            onChange={onChange}
                            value={value}
                            placeholder="Mein kurz Profil"
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

export default UserProfileEditPage;
