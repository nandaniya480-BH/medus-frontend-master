import React, { useState, useEffect } from 'react'; //eslint-disable-line
import Input from '../../elements/input/Input';
import FileInput from '../../elements/input/FileInput';
import SunEditor from 'suneditor-react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-tailwindcss-select';
import { selectPickerClassNames } from '../../elements/input/select/utilities';
import { inseratTypeOptions } from './utilities';

export default function StellenInserat({ form, setForm }) {
  let defaultView = 1;
  if (!form?.job_url && form.job_file_url) {
    defaultView = 2;
  } else if (!form.job_url && !form.job_file_url && form.job_content) {
    defaultView = 3;
  }
  const [jobMethod, setJobMethod] = useState(defaultView);

  const {
    control,
    formState: { errors },
    clearErrors,
    setError,
    handleSubmit,
    watch,
  } = useForm({});

  const watchJobFile = watch('job_file');

  const onSubmit = (data) => {
    const inseratData = {
      job_url: data?.job_url || '',
      job_file: data?.job_file || '',
      job_content: data?.job_content || '',
      apply_form_url: data?.apply_form_url || '',
    };
    let hasErros = false;

    if (
      inseratData.job_url === '' &&
      inseratData.job_file === '' &&
      form.job_file_url === '' &&
      inseratData.job_content === ''
    ) {
      setError('job_method', {
        type: 'custom',
        message: 'Bitte fügen Sie eine der Versionen für Ihr Stelleninserat!',
      });
      hasErros = true;
    }

    if (!hasErros) {
      setForm({
        ...form,
        ...inseratData,
        step_wizard: form?.step_wizard + 1,
      });
    }
  };

  const customButtonList = [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike'],
    ['fontColor', 'hiliteColor'],
    ['outdent', 'indent'],
    ['align', 'list', 'table'],
    ['link'],
    ['fullScreen', 'showBlocks'],
  ];

  const urlMethod = () => {
    return (
      <div className="w-full py-2">
        <h2 className="text-xl" onClick={() => setJobMethod(1)}>
          URL <i className="fa-solid fa-link fa-xl"></i>
        </h2>
        <div className="md:w-10/12 w-full flex flex-col gap-1 text-left mx-auto">
          <label className="text-base font-semibold text-blueGray-700">
            URL:
          </label>
          <Controller
            key={'job_url'}
            name={`job_url`}
            control={control}
            defaultValue={form?.job_url || ''}
            rules={{
              pattern: {
                value:
                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                message: 'Bitte geben Sie eine gültige URL ein',
              },
            }}
            render={({ field: { value, name, onChange } }) => {
              return (
                <Input
                  type="text"
                  placeholder="Job URL"
                  onChange={(item) => {
                    onChange(item);
                    clearErrors('job_method');
                  }}
                  value={value}
                  name={name}
                />
              );
            }}
          />

          {errors.job_url && (
            <p
              role="alert"
              className="text-red-500 text-xs font-semibold -mt-3"
            >
              *{errors.job_url.message}
            </p>
          )}
        </div>
        <div className="md:w-10/12 w-full flex flex-col gap-1 text-left mx-auto">
          <label className="text-base font-semibold text-blueGray-700">
            Bewerbungs-URL:
          </label>
          <Controller
            key={'apply_form_url'}
            name={`apply_form_url`}
            control={control}
            defaultValue={form?.apply_form_url || ''}
            rules={{
              pattern: {
                value:
                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                message: 'Bitte geben Sie eine gültige URL ein',
              },
            }}
            render={({ field: { value, name, onChange } }) => {
              return (
                <Input
                  type="text"
                  placeholder="Bewerbungs-URL"
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              );
            }}
          />

          {errors.apply_form_url && (
            <p
              role="alert"
              className="text-red-500 text-xs font-semibold -mt-3"
            >
              *{errors.apply_form_url.message}
            </p>
          )}
        </div>
      </div>
    );
  };

  const pdfMethod = () => {
    return (
      <div className="md:w-10/12 mx-auto w-full py-4 text-left">
        <div className="w-full text-center mb-4">
          <h2 className="text-xl" onClick={() => setJobMethod(1)}>
            PDF Dokument <i className="fa-solid fa-file-pdf fa-xl"></i>
          </h2>
        </div>
        <Controller
          key={'job_file'}
          name={`job_file`}
          control={control}
          defaultValue={form?.job_file || ''}
          render={({ field: { value, name, onChange } }) => {
            return (
              <FileInput
                selectedFile={value}
                setSelectedFile={(item) => {
                  onChange(item);
                  clearErrors('job_method');
                }}
                description="Stelleninseart als .PDF Format Hochladen"
                isMultiple={false}
                name={name}
              />
            );
          }}
        />
        {!watchJobFile?.length && form.job_file_url !== '' && (
          <div className="w-full flex flex-row p-2 border-b-[0.5px] justify-between">
            <span className="w-8/12 text-primary-500 font-bold">
              <i className="fa-solid fa-file-pdf"></i> {form.job_file_url}{' '}
              <br />
            </span>
          </div>
        )}
        {errors?.job_content && (
          <p role="alert" className="text-red-500 text-xs font-semibold">
            *{errors?.job_content.message}
          </p>
        )}
      </div>
    );
  };

  const platformMethod = () => {
    return (
      <>
        <div className="md:w-10/12 mx-auto w-full flex flex-col py-4 text-left">
          <div className="w-full text-center mb-4">
            <h2 className="text-xl" onClick={() => setJobMethod(1)}>
              medus.work Stelleninserat formular{' '}
              <i className="fa-solid fa-font fa-xl"></i>
            </h2>
          </div>
          <label className="w-full mb-2 text-base font-semibold text-left">
            Stelleninserat beschreibung:
          </label>
          <Controller
            key={'job_content'}
            name={`job_content`}
            control={control}
            defaultValue={form?.job_content || ''}
            render={({ field: { value, name, onChange } }) => {
              return (
                <SunEditor
                  lang="de"
                  height="500px"
                  placeholder="Stelleninserat beschreibung"
                  setContents={value}
                  value={value}
                  onChange={(item) => {
                    onChange(item);
                    clearErrors('job_method');
                  }}
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
          {errors?.job_content && (
            <p role="alert" className="text-red-500 text-xs font-semibold">
              *{errors?.job_content.message}
            </p>
          )}
        </div>
      </>
    );
  };

  const renderMethod = () => {
    switch (jobMethod) {
      case 1:
        return <>{urlMethod()}</>;
      case 2:
        return <>{pdfMethod()}</>;
      case 3:
        return <>{platformMethod()}</>;
      default:
        return urlMethod;
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-8 text-blueGray-600 font-semibold text-[16px]">
        <div className="md:w-4/12 mx-auto w-full text-left mb-3">
          <Controller
            name={`inserat_option`}
            rules={{ required: 'Bitte Anstellungsart wählen' }}
            defaultValue={inseratTypeOptions[jobMethod - 1]}
            control={control}
            render={({ field: { value, name, onChange } }) => {
              return (
                <Select
                  isMultiple={false}
                  options={inseratTypeOptions}
                  onChange={(e) => {
                    onChange(e);
                    setJobMethod(e.value);
                    clearErrors('job_method');
                  }}
                  value={value}
                  classNames={selectPickerClassNames}
                  placeholder={'Stelleninserat'}
                  name={name}
                />
              );
            }}
          />
        </div>

        <div className="md:w-4/12 mx-auto w-full text-center mb-3">
          {errors.job_method && (
            <p
              role="alert"
              className="text-red-500 text-xs font-semibold -mt-3"
            >
              *{errors.job_method.message}
            </p>
          )}
        </div>

        {/* <button
          className={`hover:text-primary-500 ${
            jobMethod === 1 && 'text-primary-500'
          }`}
          type="button"
          onClick={() => setJobMethod(1)}
        >
          URL <i className="fa-solid fa-link fa-xl"></i>
        </button>
        <button
          className={`hover:text-primary-500 ${
            jobMethod === 2 && 'text-primary-500'
          }`}
          type="button"
          onClick={() => setJobMethod(2)}
        >
          .PDF Dokument <i className="fa-solid fa-file-pdf fa-xl"></i>
        </button>
        <button
          className={`hover:text-primary-500 ${
            jobMethod === 3 && 'text-primary-500'
          }`}
          type="button"
          onClick={() => setJobMethod(3)}
        >
          medus.work Stelleninserat formular{' '}
          <i className="fa-solid fa-font fa-xl"></i>
        </button> */}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8 justify-center text-blueGray-600 font-semibold text-[16px]"
      >
        {renderMethod()}

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
