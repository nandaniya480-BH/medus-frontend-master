import { useState, useEffect } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import Button from '../../../components/elements/buttons/Button';
import Select from 'react-tailwindcss-select';
import { selectPickerClassNames } from '../../../components/elements/input/select/utilities';
import { languageLevels } from './utilities';
import { useGetLanguagesQuery } from '../../../features/api/apiSlice';
import { useForm, Controller } from 'react-hook-form';
import {
  useAddUserLanguagesMutation,
  useGetUserDetailsQuery,
} from '../../../features/auth/userApiSlice';
import { Link } from 'react-router-dom';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import { useNavigate } from 'react-router-dom';

const UserProfileEditLanguages = () => {
  const [showModal, setShowModal] = useState(false);
  const [languageIndex, setLangugageIndex] = useState(null);
  const { data: languages } = useGetLanguagesQuery();
  const [addLanguages, { isLoading, isSuccess, isError }] =
    useAddUserLanguagesMutation();
  const {
    data: result = {},
    isLoading: userDataStillLoading,
    isSuccess: userDataSuccessfullyLoaded,
  } = useGetUserDetailsQuery();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    unregister,
    clearErrors,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (result?.data && userDataSuccessfullyLoaded) {
      if (!result?.data?.languages?.length) {
        setUser({ languages: [{ id: null, name: '', level: '' }] });
      } else {
        setUser(result.data);
      }
    }
  }, [userDataSuccessfullyLoaded]);

  const handleAddLanguage = () => {
    setUser((prevState) => ({
      ...prevState,
      languages: [...prevState.languages, { name: '', level: '' }],
    }));
    setError(`language[${user.languages.length}]`, {
      type: 'required',
      message: 'Bitte Sprache wählen',
    });
    setError(`level[${user.languages.length}]`, {
      type: 'required',
      message: 'Bitte Niveau wählen',
    });
    clearErrors('form');
  };
  const handleRemoveLanguage = (languageIndex) => {
    const languagesArray = watch('language');
    const levelsArray = watch('level');
    unregister(['language', 'level']);
    const filteredLevels = levelsArray.filter(
      (el, index) => index !== languageIndex
    );
    const transformedData = languagesArray
      .filter((el, index) => index !== languageIndex)
      .map((lang, index) => {
        return {
          id: lang?.value || null,
          name: lang?.label || '',
          level: filteredLevels[index]?.value || '',
        };
      });

    setUser((prevState) => ({
      ...prevState,
      languages: transformedData,
    }));
  };
  const onSubmit = (data) => {
    const transformedData = data.language
      ?.filter((el) => el !== undefined)
      .map((lang, index) => {
        if (lang !== undefined) {
          return {
            id: lang.value,
            level: data.level[index].value,
          };
        }
      });
    if (transformedData) {
      addLanguages({ languages: transformedData });
    } else {
      setError('form', {
        type: 'custom',
        message: 'Form ist leer! Bitte eine Sprache hinzufügen',
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/user/profile');
    }
  }, [isSuccess]);

  const RenderControl = ({ languageObject = {}, index }) => {
    return (
      <div
        key={languageObject?.name + index}
        className="w-full flex md:flex-row flex-col justify-between gap-2 mt-2"
      >
        <div className={`md:w-5/12 w-full`}>
          <Controller
            name={`language[${index}]`}
            rules={{ required: 'Bitte Sprache wählen' }}
            defaultValue={languages[languageObject?.id - 1]}
            control={control}
            render={({ field: { value, name } }) => {
              return (
                <Select
                  value={value}
                  placeholder="Sprache"
                  onChange={(newValue) => {
                    setValue(`${name}`, newValue);
                    clearErrors(`${name}`);
                  }}
                  isMultiple={false}
                  isClearable={true}
                  isSearchable={true}
                  searchInputPlaceholder="Suchen"
                  noOptionsMessage="Keine sprache gefunden"
                  options={languages || []}
                  classNames={selectPickerClassNames}
                  name={name}
                />
              );
            }}
          />

          {errors.language && errors.language[index] && (
            <p role="alert" className="text-red-500 text-xs font-semibold">
              *{errors.language[index].message}
            </p>
          )}
        </div>
        <div className={`md:w-5/12 w-full`}>
          <Controller
            name={`level[${index}]`}
            rules={{ required: 'Bitte Niveau wählen' }}
            defaultValue={languageLevels[languageObject?.level]}
            control={control}
            render={({ field: { value, name } }) => {
              return (
                <Select
                  value={value}
                  placeholder="Niveau"
                  onChange={(newValue) => {
                    setValue(`${name}`, newValue);
                    clearErrors(`${name}`);
                  }}
                  isMultiple={false}
                  isClearable={true}
                  isSearchable={false}
                  options={languageLevels || []}
                  classNames={selectPickerClassNames}
                  name={name}
                />
              );
            }}
          />
          {errors.level && errors.level[index] && (
            <p role="alert" className="text-red-500 text-xs font-semibold">
              *{errors.level[index].message}
            </p>
          )}
        </div>

        <div className="md:w-2/12 w-full flex flex-row md:justify-center justify-end">
          <button
            type="button"
            className="text-red-500 text-center font-semibold text-[14px]"
            onClick={() => {
              setShowModal(true);
              setLangugageIndex(index);
            }}
          >
            <i className="fa-solid fa-trash fa-lg"></i> Entfernen
          </button>
        </div>
      </div>
    );
  };

  const RenderModal = () => {
    return (
      <>
        {showModal && (
          <>
            <div className="justify-center opacity-85 flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-auto md:w-6/12 w-full p-4">
                <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-white outline-none focus:outline-none px-6 py-2 pb-6  bg-gradient-to-r from-red-700 to-red-600 text-white">
                  <div className="w-full flex flew-row justify-between mb-2 mt-2">
                    <h5 className="font-semibold pb-2">{'Aktion'}</h5>
                    <button
                      className="font-semibold -mt-1"
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-times"></i> Schliessen
                    </button>
                  </div>
                  <div className="w-full flex flex-col gap-4 justify-center items-center">
                    <h5 className="font-bold text-xl">Sprache entfernen ?</h5>
                    <button
                      onClick={() => {
                        handleRemoveLanguage(languageIndex);
                        setShowModal(false);
                      }}
                      className="bg-white rounded-full px-6 py-2 text-red-500 font-semibold text-[14px] place-self-end"
                    >
                      <i className="fa-solid fa-trash"></i> Löschen
                    </button>
                  </div>
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
          <ToastMessage isSuccess={isSuccess} isError={isError} />
          <div className="w-full pt-10 pb-10 bg-radial-gradient flex-1">
            <div className="w-full flex flex-col text-center items-center text-blueGray-700">
              <div
                className={`md:w-8/12 w-11/12 md:p-0 p-4 flex flex-row mx-auto`}
              >
                <Link
                  to={'/user/profile'}
                  className="text-primary-500 font-semibold"
                >
                  <i className="fa-solid fa-arrow-left"></i> zurück zum Profil
                </Link>
              </div>
              <h2 className="text-3xl font-bold text-blueGray-800 mb-10">
                Sprachkenntnisse bearbeiten
              </h2>
            </div>
            <RenderModal />

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
                className={`md:w-8/12 w-11/12 p-4 md:px-10 flex flex-col gap-1 mx-auto text-left mb-4 text-blueGray-700 md:p-0 p-4  bg-white rounded-xl shadow-lg drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)] ${
                  showModal && 'blur-sm'
                }`}
              >
                <div className=" w-full flex justify-start">
                  <h5 className="font-bold text-lg text-blueGray-800 pb-1 mb-2 border-b-[0.5px] border-blueGray-400 mt-4">
                    Sprachkenntnisse
                  </h5>
                </div>
                {user && languages
                  ? user?.languages?.map((languageObject, index) => {
                      return (
                        <RenderControl
                          key={index}
                          languageObject={languageObject}
                          index={index}
                        />
                      );
                    })
                  : null}

                {!errors.language && !errors.level && (
                  <div className="flex flex-row justify-end pt-3">
                    <button
                      onClick={handleAddLanguage}
                      type="button"
                      className="text-primary-500 font-semibold text-[14px]"
                    >
                      <i className="fa-solid fa-add"></i> Weitere Sprache
                      hinzufügen
                    </button>
                  </div>
                )}

                {errors.form && (
                  <p
                    role="alert"
                    className="text-red-500 text-xm font-semibold text-center"
                  >
                    *{errors.form.message}
                  </p>
                )}

                <div className="w-full flex flex-row justify-end py-8 text-right text-blueGray-700">
                  <Button type="submit">Speichern</Button>
                </div>
              </form>
            )}
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default UserProfileEditLanguages;
