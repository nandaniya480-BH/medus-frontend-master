import React, { useState, useEffect } from 'react';
import { experienceOptions } from './utilities';
import { selectPickerClassNames } from '../../elements/input/select/utilities';
import Select from 'react-tailwindcss-select';
import { languageLevels } from '../../../pages/auth/user-profile/utilities';
import { ReactTags } from 'react-tag-autocomplete';
import {
  useGetSoftSkillsQuery,
  useGetLanguagesQuery,
  useGetEducationsQuery,
} from '../../../features/api/apiSlice';
import { useForm, Controller } from 'react-hook-form';

export default function MagicMatch({ form, setForm }) {
  const { data: soft_skills } = useGetSoftSkillsQuery();
  const { data: languages } = useGetLanguagesQuery();
  const { data: educations } = useGetEducationsQuery();
  const [showModal, setShowModal] = useState(false);
  const [languageIndex, setLangugageIndex] = useState(null);
  const [selected_languages, setSelectedLanguages] = useState(
    form?.languages?.length
      ? form?.languages
      : [{ id: null, name: '', level: '' }]
  );

  const {
    control,
    setValue,
    formState: { errors },
    clearErrors,
    watch,
    setError,
    unregister,
    handleSubmit,
  } = useForm({});

  const handleAddLanguage = () => {
    setSelectedLanguages((prevState) => [
      ...prevState,
      { language: null, level: null },
    ]);
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

    setSelectedLanguages(transformedData);
  };

  const onSubmit = (data) => {
    const transformedLanguages = data.language
      ?.filter((el) => el !== undefined)
      .map((lang, index) => {
        if (lang !== undefined) {
          return {
            id: lang.value,
            level: data.level[index].value,
          };
        }
      });
    const transformedData = {
      selected_soft_skills: data?.selected_soft_skills,
      soft_skills: data?.selected_soft_skills?.map(({ value }) => value),
      selected_educations: data?.selected_educations,
      educations: data?.selected_educations?.map(({ value }) => value),
      work_experience: data?.work_experience?.value,
      languages: transformedLanguages,
    };

    setForm({
      ...form,
      ...transformedData,
      step_wizard: form?.step_wizard + 1,
    });
  };

  const RenderLanguageControls = ({ languageObject = {}, index }) => {
    return (
      <div className="w-full flex md:flex-row flex-col justify-between gap-2 mt-2">
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <RenderModal />
        <div
          tabIndex={0}
          className="md:w-8/12 z-5 w-full flex flex-col justify-start text-sm text-left mb-4"
        >
          <h3 className="text-base font-semibold text-blueGray-700 mb-2 mt-2">
            Kompetenzen / Fähigkeiten:
          </h3>
          <Controller
            name={`selected_soft_skills`}
            // rules={{
            //   required: 'Bitte Kompetenz / Fähigkeiten hinzufügen',
            // }}
            defaultValue={form?.selected_soft_skills || []}
            control={control}
            render={({ field: { value, name, onChange } }) => {
              return (
                <ReactTags
                  labelText={false}
                  allowNew={true}
                  selected={value}
                  newOptionText='Keine ergebnisse. "%value%" hinzufügen ?'
                  suggestions={soft_skills || []}
                  onAdd={(newTag) => {
                    setValue(`${name}`, [...value, newTag]);
                    clearErrors(`${name}`);
                  }}
                  id="soft-skills"
                  onDelete={(tagIndex) => {
                    setValue(
                      `${name}`,
                      value.filter((_, i) => i !== tagIndex)
                    );
                  }}
                  allowResize={true}
                  placeholderText="+ Kompetenz / Fähigkeit hinzufügen"
                  name={name}
                />
              );
            }}
          />
          {errors?.selected_soft_skills && (
            <p role="alert" className="text-red-500 text-xs font-semibold">
              *{errors?.selected_soft_skills.message}
            </p>
          )}
          <em className="text-sm mt-2 text-blueGray-500">
            Drücken Sie die Eingabetaste, um eine neue Kompetenz/Fähigkeit
            hinzuzufügen.
          </em>
        </div>
        <div className="md:w-8/12 w-full flex flex-col text-left mb-4 rounded-full">
          <h3 className="text-base font-semibold text-blueGray-700 mb-2">
            Berufserfahrung:
          </h3>
          {experienceOptions && (
            <Controller
              name={`work_experience`}
              rules={{ required: 'Bitte Berufserfahrung wählen' }}
              defaultValue={experienceOptions?.find(
                (el) => el.value === form?.work_experience
              )}
              control={control}
              render={({ field: { value, name, onChange } }) => {
                return (
                  <Select
                    isMultiple={false}
                    isClearable={true}
                    options={experienceOptions}
                    onChange={onChange}
                    value={value}
                    classNames={selectPickerClassNames}
                    placeholder={'Berufserfahrung (Jahre)'}
                    name={name}
                  />
                );
              }}
            />
          )}

          {errors?.work_experience && (
            <p role="alert" className="text-red-500 text-xs font-semibold">
              *{errors?.work_experience.message}
            </p>
          )}
        </div>
        <div className="md:w-8/12 w-full flex flex-col gap-1 text-left mb-4">
          <label className="text-base font-semibold text-blueGray-700 ">
            Aus- und Weiterbildung <small>(Mehrfachauswahl möglich)</small>:
          </label>
          {educations && (
            <Controller
              name={`selected_educations`}
              // rules={{ required: 'Bitte Aus- und Weiterbildung wählen' }}
              defaultValue={form?.selected_educations}
              control={control}
              render={({ field: { value, name, onChange } }) => {
                return (
                  <Select
                    isMultiple
                    isClearable
                    isSearchable
                    options={educations}
                    onChange={onChange}
                    value={value}
                    classNames={selectPickerClassNames}
                    placeholder={'Aus- und Weiterbildung'}
                    name={name}
                  />
                );
              }}
            />
          )}

          {errors?.selected_educations && (
            <p role="alert" className="text-red-500 text-xs font-semibold">
              *{errors?.selected_educations.message}
            </p>
          )}
        </div>

        <div className="md:w-8/12 w-full flex flex-col gap-1 text-left mt-1 mb-4 text-blueGray-700">
          <label className="text-base font-semibold  ">Sprachkenntnisse:</label>
          {languages &&
            selected_languages?.map((languageObject, index) => {
              return (
                <RenderLanguageControls
                  key={languageObject?.name + index}
                  languageObject={languageObject}
                  index={index}
                />
              );
            })}
          <div className="flex flex-row justify-end pt-3">
            <button
              onClick={handleAddLanguage}
              type="button"
              className="text-primary-500 font-semibold text-[14px]"
            >
              <i className="fa-solid fa-add"></i> Weitere Sprache hinzufügen
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={() =>
              setForm({ ...form, step_wizard: form?.step_wizard - 1 })
            }
          >
            <i className="fa-solid fa-arrow-left"></i> Zurück
          </button>
          <button
            className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Weiter <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </form>
    </>
  );
}
