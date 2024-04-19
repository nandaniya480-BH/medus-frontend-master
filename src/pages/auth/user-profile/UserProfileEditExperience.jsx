import React, { useState, useCallback, useEffect } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import Button from '../../../components/elements/buttons/Button';
import Input from '../../../components/elements/input/Input';
import Datepicker from 'react-tailwindcss-datepicker';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { Link, useLocation } from 'react-router-dom';
import {
  useAddUserWorkExperienceMutation,
  useEditUserWorkExperienceMutation,
  useDeleteUserWorkExperienceMutation,
} from '../../../features/auth/userApiSlice';
import { useForm, Controller } from 'react-hook-form';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import { useNavigate } from 'react-router-dom';

const customButtonList = [
  ['font', 'fontSize', 'formatBlock'],
  ['bold', 'underline', 'italic', 'strike'],
  ['align', 'list'],
  ['link'],
  ['fullScreen'],
];

const UserProfileEditExperience = () => {
  const location = useLocation();
  let workExperienceItem = location.state?.workExperienceItem || null;
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [
    addWorkExperience,
    { isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError },
  ] = useAddUserWorkExperienceMutation();
  const [
    editWorkExperience,
    {
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      isError: isEditError,
    },
  ] = useEditUserWorkExperienceMutation();
  const [
    deleteWorkExperience,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
  ] = useDeleteUserWorkExperienceMutation();

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({ defaultValues: { id: workExperienceItem?.id } });

  const onDeleteSubmit = (e) => {
    e.preventDefault();
    deleteWorkExperience(workExperienceItem?.id);
    setShowModal(false);
    window.history.replaceState(null, '');
  };

  const onSubmit = (data) => {
    let hasErros = false;
    if (!data?.start_date?.startDate) {
      setError('start_date', {
        type: 'custom',
        message: 'Bitte Startdatum eingeben',
      });
      hasErros = true;
    }

    if (!hasErros) {
      const transformedData = {
        id: data.id,
        start_date: data?.start_date?.startDate,
        end_date: data?.end_date?.startDate,
        position_title: data?.position_title,
        employer_name: data?.employer_name,
        activitites: data?.activitites,
      };

      if (data.id) {
        editWorkExperience(transformedData);
        window.history.replaceState({}, document.title);
      } else {
        addWorkExperience(transformedData);
      }
    }
  };

  useEffect(() => {
    if (isEditSuccess || isAddSuccess) {
      navigate('/user/profile');
    }
  }, [isEditSuccess, isAddSuccess, navigate]);

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
                      {workExperienceItem?.position_title || 'Job title'}
                    </h5>
                    <button
                      className="font-semibold -mt-1"
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
                        Diese berurfserfahrung löschen ?
                      </h5>
                      <div className="w-full flex flex-col items-start text-sm border-b border-white pb-4">
                        <span className="font-bold">
                          {workExperienceItem?.position_title}
                        </span>
                        <span className="font-semibold text-sm">
                          <i className="fa-solid fa-calendar-days"></i>{' '}
                          {workExperienceItem?.start_date} -
                          {workExperienceItem?.end_date !== null
                            ? workExperienceItem?.end_date
                            : ' aktuell'}
                        </span>
                        <span className="font-semibold underline">
                          {workExperienceItem?.employer_name}
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
            successMessage="Berufserfahrungs eintrag erfolgreich gelöscht"
          />
          <div className={`w-full pt-10 pb-10 bg-radial-gradient flex-1`}>
            {workExperienceItem && <RenderModal />}
            <div
              className={`w-full flex flex-col text-center items-center text-blueGray-700 md:p-0 p-4  ${
                showModal && 'blur-sm'
              }`}
            >
              <div
                className={`md:w-8/12 w-full md:p-0 p-4 flex flex-row mx-auto justify-between ${
                  showModal && 'blur-sm'
                }`}
              >
                <Link
                  to={'/user/profile'}
                  className="text-primary-500 font-semibold"
                >
                  <i className="fa-solid fa-arrow-left"></i> zurück zum Profil
                </Link>
                {workExperienceItem && !isDeleteSuccess && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-red-500 font-semibold text-[16px]"
                  >
                    <i className="fa-solid fa-trash"></i> Löschen
                  </button>
                )}
              </div>
              <h2 className="text-3xl font-bold text-blueGray-800 mb-10">
                Berufserfahrung{' '}
                {workExperienceItem ? 'bearbeiten' : 'hinzufügen'}
              </h2>
              {isDeleteSuccess && (
                <>
                  <div className="w-full h-full text-center pt-4">
                    <span className="text-primary-500 font-semibold text-lg">
                      <i className="fa-solid fa-circle-check" />{' '}
                      Berufserfahrungs eintrag erfolgreich gelöscht
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

              {!isAddLoading && !isEditLoading && !isDeleteSuccess && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={`md:w-8/12 w-full p-4 md:px-10 flex flex-col items-center text-left gap-1 pt-4 text-[14px]  bg-white rounded-xl shadow-lg drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]`}
                >
                  <div className=" w-full flex justify-start">
                    <h5 className="font-bold text-lg text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-4">
                      Berufserfahrung
                    </h5>
                  </div>
                  <div className="w-full flex flex-col gap-1 text-left mt-1 mb-2">
                    <label className="text-base font-semibold">Von*:</label>
                    <Controller
                      key={'start_date'}
                      name={`start_date`}
                      control={control}
                      defaultValue={{
                        startDate: workExperienceItem?.start_date || null,
                        endDate: workExperienceItem?.start_date || null,
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
                            maxDate={new Date()}
                            onChange={(value) => {
                              onChange(value);
                              setStartDate(value);
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
                        startDate: workExperienceItem?.end_date || null,
                        endDate: workExperienceItem?.end_date || null,
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
                            minDate={startDate?.startDate}
                            onChange={onChange}
                            name={name}
                          />
                        );
                      }}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Position (Rolle, Funktion, Titel):
                    </label>
                    <Controller
                      key={'position_title'}
                      name={`position_title`}
                      control={control}
                      defaultValue={workExperienceItem?.position_title || ''}
                      rules={{ required: 'Bitte Position eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            type="text"
                            placeholder="Position"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors?.position_title && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors?.position_title.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-1 text-left">
                    <label className="text-base font-semibold">
                      Unternehmen:
                    </label>
                    <Controller
                      key={'employer_name'}
                      name={`employer_name`}
                      control={control}
                      defaultValue={workExperienceItem?.employer_name || ''}
                      rules={{ required: 'Bitte Unternehmen eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <Input
                            onChange={onChange}
                            value={value}
                            type="text"
                            placeholder="Unternehmen"
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors?.employer_name && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold -mt-3"
                      >
                        *{errors?.employer_name.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col py-8 justify-center">
                    <label className="w-full mb-2 text-base font-semibold">
                      Beschreibe deine Tätigkeiten:
                    </label>
                    <Controller
                      key={'activitites'}
                      name={`activitites`}
                      control={control}
                      defaultValue={workExperienceItem?.activitites || ''}
                      rules={{ required: 'Bitte Tätigkeiten eingeben' }}
                      render={({ field: { value, name, onChange } }) => {
                        return (
                          <SunEditor
                            lang="de"
                            height="500px"
                            placeholder="Tätigkeiten..."
                            // setContents={value}
                            defaultValue={value}
                            value={value}
                            onChange={onChange}
                            setDefaultStyle="font-family: 'Montserrat', sans-serif;"
                            setOptions={{
                              buttonList: customButtonList,
                              height: '500px',
                            }}
                            name={name}
                          />
                        );
                      }}
                    />
                    {errors?.activitites && (
                      <p
                        role="alert"
                        className="text-red-500 text-xs font-semibold"
                      >
                        *{errors?.activitites.message}
                      </p>
                    )}
                  </div>

                  {!isAddSuccess && (
                    <div className="w-full flex flex-row justify-end py-8 text-right">
                      <Button {...{ type: 'submit', children: 'Speichern' }} />
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default UserProfileEditExperience;
