import React, { useState } from 'react';
import { selectPickerClassNames } from '../../elements/input/select/utilities';
import Select from 'react-tailwindcss-select';
import Input from '../../elements/input/Input';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Button from '../../elements/buttons/Button';
import {
  useSendSupportEmailMutation,
  useGetCompanyDetailsQuery,
} from '../../../features/auth/companyApiSlice';
import { useForm, Controller } from 'react-hook-form';

const SupportSection = ({ categoryType }) => {
  const [supportType, setSupportType] = useState(null);
  const [editorValue, setEditorValue] = useState([]); // eslint-disable-line
  const [sendSupportEmail, { isLoading, isSuccess, isError }] =
    useSendSupportEmailMutation();
  const { data } = useGetCompanyDetailsQuery();
  const companyDetails = data?.data;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const customButtonList = [
    ['undo', 'redo'],
    ['bold', 'underline', 'italic', 'strike'],
    ['outdent', 'indent'],
    ['align', 'list'],
    ['link'],
  ];

  const handleEditorChange = (e) => {
    setEditorValue(e);
  };

  const supportTypes = [
    {
      value: 1,
      label: 'Anfrage',
    },
    {
      value: 2,
      label: 'Support',
    },
  ];

  const onSubmit = (data) => {
    const transformedData = {
      ...data,
      type: data.type.label,
      employer_id: companyDetails?.id,
    };

    console.log(transformedData);
    sendSupportEmail(transformedData);
  };

  return (
    <>
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      {isSuccess && (
        <div className="w-full h-full text-center pt-2">
          <span className="text-primary-500 font-semibold text-lg">
            <i className="fa-solid fa-circle-check" /> E-mail wurde erfolgreich
            versendet!
          </span>{' '}
          <br />
        </div>
      )}
      {isLoading && (
        <div className="w-full py-10 flex flex-col">
          <div className="mx-auto my-auto flex flex-col items-center container gap-4">
            <div
              className="w-12 h-12 rounded-full animate-spin
                        border-[2px] border-dashed border-primary-500 border-t-transparent"
            ></div>
            <span className="font-semibold text-sm">
              E-mail wird versendet...
            </span>
          </div>
        </div>
      )}
      {isError && (
        <div className="w-full h-full text-center pt-2">
          <span className="text-red-500 font-semibold text-lg">
            <i className="fa-solid fa-times-circle" /> Etwas ist schief
            gelaufen!
          </span>{' '}
          <br />
        </div>
      )}
      {!isSuccess && !isLoading && !isError && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center text-left gap-1 pt-10 text-[14px]"
        >
          <div className="md:w-10/12 w-full flex flex-col gap-1 text-left">
            <label className="text-base font-semibold">Art*:</label>
            <Controller
              name={`type`}
              rules={{ required: 'Bitte Art wählen' }}
              control={control}
              render={({ field: { value, name, onChange } }) => {
                return (
                  <Select
                    value={value}
                    placeholder="Art wählen"
                    isMultiple={false}
                    isClearable={false}
                    options={supportTypes}
                    classNames={selectPickerClassNames}
                    onChange={onChange}
                    name={name}
                  />
                );
              }}
            />
            {errors['type'] && (
              <p
                role="alert"
                className="w-full text-left text-red-500 text-xs font-semibold"
              >
                *{errors['type'].message}
              </p>
            )}
          </div>

          <div className="md:w-10/12 flex flex-col py-4 justify-center">
            <label className="w-full mb-2 text-base font-semibold">
              Beschreibung:
            </label>
            <Controller
              key={'message'}
              name={`message`}
              rules={{ required: 'Bitte Nachricht eingeben...' }}
              control={control}
              render={({ field: { value, name, onChange } }) => {
                return (
                  <SunEditor
                    lang="de"
                    height="500px"
                    placeholder="Schreiben Sie uns eine Nachricht..."
                    setContents={value}
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
            {errors?.message && (
              <p role="alert" className="text-red-500 text-xs font-semibold">
                *{errors?.message.message}
              </p>
            )}
          </div>
          <div className="md:w-10/12 flex flex-row justify-end py-8 text-right text-blueGray-700">
            <Button {...{ type: 'submit', children: 'Absenden' }} />
          </div>
        </form>
      )}
    </>
  );
};

export default SupportSection;
