import React, { useState } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import Button from '../../../components/elements/buttons/Button';
import Datepicker from 'react-tailwindcss-datepicker';
import { selectPickerClassNames } from '../../../components/elements/input/select/utilities';
import { Link, useLocation } from 'react-router-dom';
import {
  useAddUserEducationMutation,
  useEditUserEducationMutation,
  useDeleteUserEducationMutation,
} from '../../../features/auth/userApiSlice';
import { useGetEducationsQuery } from '../../../features/api/apiSlice';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-tailwindcss-select';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import { useNavigate } from 'react-router-dom';

const UserProfileEditEducations = () => {
  const { data: educations } = useGetEducationsQuery();
  const location = useLocation();
  let educationItem = location.state?.educationItem || null;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState({
    startDate: educationItem?.start_date || null,
    endDate: educationItem?.end_date || null,
  });

  const [
    addEducation,
    {
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      isError: isAddError,
      error: addError,
    },
  ] = useAddUserEducationMutation();
  const [
    editEducation,
    {
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      isError: isEditError,
      error: editError,
    },
  ] = useEditUserEducationMutation();
  const [
    deleteEducation,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteUserEducationMutation();

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();

  const onDeleteSubmit = (e) => {
    e.preventDefault();
    deleteEducation(educationItem?.id);
    setShowModal(false);
  };

  const onSubmit = (data) => {
    let hasErrors = false;
    if (!data.start_date.startDate) {
      setError('start_date', {
        type: 'required',
        message: 'Bitte Beginnsdatum eingeben',
      });
      hasErrors = true;
    }

    if (!hasErrors) {
      const transformedData = {
        education_id: data.education.value,
        start_date: data.start_date.startDate,
        end_date: data.end_date.startDate || '',
        id: educationItem?.id,
      };

      if (educationItem) {
        editEducation(transformedData);
        window.history.replaceState({}, document.title);
      } else {
        addEducation(transformedData);
      }
    }
  };

  React.useEffect(() => {
    if (isAddSuccess || isEditSuccess || isDeleteSuccess) {
      navigate('/user/profile');
    }
  }, [isAddSuccess, isEditSuccess, isDeleteSuccess, navigate]);

  const RenderModal = () => {
    return (
      <>
        {showModal && (
          <>
            <div className="justify-center opacity-85 flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-auto md:w-6/12 w-full p-4">
                <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-white outline-none focus:outline-none px-6 py-2 pb-6  bg-gradient-to-r from-red-700 to-red-600 text-white">
                  <div className="w-full flex flew-row justify-between mb-2 mt-2">
                    <h5 className="font-semibold pb-2">
                      {'Aus- und Weiterbildung'}
                    </h5>
                    <button
                      className="font-semibol -mt-1"
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-times"></i> Schliessen
                    </button>
                  </div>
                  {isDeleteLoading && (
                    <div className="w-full h-full text-center pt-4 pb-4">
                      <div
                        className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                              border-[2px] border-dashed border-white-500 border-t-transparent"
                      ></div>
                    </div>
                  )}
                  {!isDeleteLoading && (
                    <form
                      onSubmit={onDeleteSubmit}
                      className="w-full flex flex-col gap-4 justify-center items-center"
                    >
                      <h5 className="font-bold text-xl">
                        Diese Aus- Weiterbilung löschen ?
                      </h5>
                      <div className="w-full flex flex-col items-start text-sm border-b border-white pb-4">
                        <span className="font-bold">{educationItem?.name}</span>
                        <span className="font-semibold text-sm">
                          <i className="fa-solid fa-calendar-days"></i>{' '}
                          {educationItem?.start_date} -
                          {educationItem?.end_date !== null
                            ? educationItem?.end_date
                            : ' aktuell'}
                        </span>
                        <span className="font-semibold underline">
                          {educationItem?.employer_name}
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="bg-white rounded-full px-6 py-2 text-red-500 font-semibold text-[14px] place-self-end"
                      >
                        <i className="fa-solid fa-trash"></i> Löschen
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            <div className="opacity-15 fixed inset-0 z-40 bg-black blur-md"></div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Page>
        <PageContent>
          <ToastMessage isSuccess={isAddSuccess} isError={isAddError} />
          <ToastMessage isSuccess={isEditSuccess} isError={isEditError} />
          <ToastMessage
            isSuccess={isDeleteSuccess}
            successMessage="Aus- und Weiterbildungs eintrag erfolgreich gelöscht"
          />
          <div className={`w-full pt-10 pb-10 bg-radial-gradient`}>
            <div
              className={`md:w-8/12 w-11/12 md:p-0 p-4 flex flex-row mx-auto justify-between ${
                showModal && 'blur-sm'
              }`}
            >
              <Link
                to={'/user/profile'}
                className="text-primary-500 font-semibold"
              >
                <i className="fa-solid fa-arrow-left"></i> zurück zum Profil
              </Link>
              {educationItem && !isDeleteSuccess && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-red-500 font-semibold text-[16px]"
                >
                  <i className="fa-solid fa-trash"></i> Löschen
                </button>
              )}
            </div>

            {educationItem && <RenderModal />}
            <div
              className={`w-full flex flex-col text-center items-center text-blueGray-700 md:p-0 p-4  ${
                showModal && 'blur-sm'
              }`}
            >
              <h2 className="text-3xl font-bold text-blueGray-800 mb-10">
                Aus- und Weiterbildung{' '}
                {educationItem ? 'bearbeiten' : 'hinzufügen'}
              </h2>
              {isDeleteSuccess && (
                <>
                  <div className="w-full h-full text-center pt-4">
                    <span className="text-primary-500 font-semibold text-lg">
                      <i className="fa-solid fa-circle-check" /> Daten eintrag
                      erfolgreich gelöscht
                    </span>
                  </div>
                </>
              )}

              {(isAddLoading || isEditLoading) && (
                <div className="w-full h-full text-center pt-8">
                  <div
                    className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                          border-[2px] border-dashed border-primary-500 border-t-transparent"
                  ></div>
                </div>
              )}

              {(isAddError || isEditError) && (
                <div className="w-full h-full text-center pt-2 flex flex-col gap-2 mb-2">
                  <span className="text-red-500 font-semibold text-lg">
                    <i className="fa-solid fa-circle-xmark" /> Etwas is schief
                    gelaufen.
                  </span>
                  <span className="text-red-500 font-semibold text-lg">
                    {isAddError && addError?.data?.errors}
                    {isEditError && editError?.data?.errors}
                  </span>
                </div>
              )}

              {!isAddLoading && !isEditLoading && !isDeleteSuccess && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={`md:w-8/12 w-full p-4 md:px-10 flex flex-col items-center text-left gap-1 pt-4 text-[14px]  bg-white rounded-xl shadow-lg drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]`}
                >
                  <div className=" w-full flex justify-start">
                    <h5 className="font-bold text-lg text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-4">
                      Aus- und Weiterbildung
                    </h5>
                  </div>
                  <div className="w-full flex flex-col gap-1 text-left mt-1 mb-2">
                    <label className="text-base font-semibold">Von*:</label>
                    <Controller
                      key={'start_date'}
                      name={`start_date`}
                      control={control}
                      defaultValue={{
                        startDate: educationItem?.start_date,
                        endDate: educationItem?.start_date,
                      }}
                      rules={{ required: 'Bitte Beginnsdatum eingeben' }}
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
                            displayFormat="DD.MM.YYYY"
                            onChange={(value) => {
                              setStartDate(value);
                              onChange(value);
                            }}
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors?.start_date && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors?.start_date.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-1 text-left mt-1 mb-2">
                    <label className="text-base font-semibold">Bis:</label>
                    <Controller
                      key={'end_date'}
                      name={`end_date`}
                      control={control}
                      defaultValue={{
                        startDate: educationItem?.end_date || null,
                        endDate: educationItem?.end_date || null,
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
                            value={value}
                            i18n={'de'}
                            displayFormat="DD.MM.YYYY"
                            minDate={startDate.startDate}
                            onChange={onChange}
                            name={name}
                          />
                        );
                      }}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Aus- und Weiterbildung:
                    </label>
                    {educations && (
                      <Controller
                        name={`education`}
                        rules={{ required: 'Bitte eine Option wählen' }}
                        defaultValue={
                          educations[educationItem?.education_id - 1] || null
                        }
                        control={control}
                        render={({ field: { value, name, onChange } }) => {
                          return (
                            <Select
                              value={value}
                              placeholder="Aus- und Weiterbildung"
                              onChange={onChange}
                              isMultiple={false}
                              isClearable={true}
                              isSearchable={true}
                              searchInputPlaceholder="Suchen"
                              noOptionsMessage="Keine Ergebnise gefunden"
                              options={educations || []}
                              classNames={selectPickerClassNames}
                              name={name}
                            />
                          );
                        }}
                      />
                    )}

                    {errors.education && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors.education.message}
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

export default UserProfileEditEducations;
