import React, { useState } from 'react';
import FileInput from '../../elements/input/FileInput';
import Button from '../../elements/buttons/Button';
import {
  useGetUserDocumentsQuery,
  useAddUserDocumentsMutation,
  useDeleteUserDocumentMutation,
} from '../../../features/auth/userApiSlice';
import { useForm, Controller } from 'react-hook-form';
import { Document, Page, pdfjs } from 'react-pdf';

// Specify the path to the worker source file
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyDocumentsSection = ({ categoryType }) => {
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    document: null,
  });
  const [showViewModal, setShowViewModal] = useState({
    show: false,
    document: null,
  });
  const { data, isLoading: isDocumentsLoading } = useGetUserDocumentsQuery();
  const documents = data?.data;
  const [addDocuments, { isLoading, isSuccess, isError }] =
    useAddUserDocumentsMutation();
  const [
    deleteDocument,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
    },
  ] = useDeleteUserDocumentMutation();

  const {
    control,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    const { documents } = data;
    for (let key in documents) {
      formData.append('documents[]', documents[key]);
    }
    addDocuments(formData);
    setValue('documents', []);
  };

  const RenderDeleteJobModal = () => {
    return (
      <>
        <div className="justify-center opacity-95 flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-auto md:w-8/12 w-full p-4">
            <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-white outline-none focus:outline-none px-6 py-2 pb-6  bg-gradient-to-r from-red-700 to-red-600 text-white">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className="font-semibold pb-2">{'Dokument Löschen'}</h5>
                <button
                  className="font-semibold -mt-1"
                  onClick={() =>
                    setShowDeleteModal({ show: false, document: null })
                  }
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <h5 className="font-bold text-xl">
                  Wollen Sie wirklich dieses Dokument entfernen ?
                </h5>
                <div className="w-full flex flex-col gap-2 mt-4">
                  <span className="font-bold text-lg">
                    <i className="fa-solid fa-file-pdf"></i>{' '}
                    {showDeleteModal?.document?.file_name}
                  </span>
                  <hr className="mt-4" />
                </div>
                <button
                  onClick={() => {
                    deleteDocument(showDeleteModal?.document?.id);
                    setShowDeleteModal({ show: false, job: null });
                  }}
                  className="bg-white rounded-full px-6 py-2 text-red-500 font-semibold text-[14px] place-self-end"
                >
                  <i className="fa-solid fa-trash"></i> Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-30 fixed inset-0 z-40 bg-black blur-md"></div>
      </>
    );
  };

  const DokumentPreviewModal = () => {
    return (
      <>
        <div
          className={`justify-center flex fixed inset-0 z-50 overflow-x-hidden`}
        >
          <div className="relative my-auto w-11/12 min-h-screen py-8">
            <div className="rounded-lg relative flex flex-col place-self-center w-full bg-white px-6 py-2 pb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className="font-semibold pb-2">{`${showViewModal?.document?.file_name} | Vorschau`}</h5>
                <button
                  className="font-semibold -mt-1 text-red-500"
                  onClick={() =>
                    setShowViewModal({ show: false, document: null })
                  }
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              {/* <div className="w-full flex flex-col gap-4 justify-center items-center">
                <Document file={`https://cors-anywhere.herokuapp.com/https://medus.work/storage/${showViewModal.document?.url}`}>
                  <Page pageNumber={1} />
                </Document>
              </div> */}
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <embed
                  src={`https://medus.work/storage/${showViewModal.document?.url}`}
                  className="w-full h-screen rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="opacity-50 fixed inset-0 z-40 bg-black blur-md"></div> */}
      </>
    );
  };

  return (
    <>
      {showDeleteModal.show && <RenderDeleteJobModal />}
      {showViewModal.show && <DokumentPreviewModal />}
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      <h5 className="text-lg font-bold mb-4 text-left ">
        Laden Sie ihre Dokumente auf ihr Profil
        <small className="text-blueGray-500">
          {' '}
          (Lebenslauf, Arbeitszeugnisse,Diplome/Zertifikate usv.)
        </small>
      </h5>
      {(isError || isDeleteError) && (
        <div className="w-full h-full text-center pt-2">
          <span className="text-red-500 font-semibold text-lg">
            <i className="fa-solid fa-circle-xmark" /> Etwas is schief gelaufen.
          </span>
        </div>
      )}
      {(isDocumentsLoading || isLoading || isDeleteLoading) && (
        <div className="w-full py-10 flex flex-col">
          <div className="mx-auto my-auto flex flex-col items-center container gap-4">
            <div
              className="w-12 h-12 rounded-full animate-spin
                      border-[2px] border-dashed border-primary-500 border-t-transparent"
            ></div>
            <span className="font-semibold text-sm">wird geladen...</span>
          </div>
        </div>
      )}
      {!isDocumentsLoading && !isLoading && !isDeleteLoading && (
        <>
          <div className="w-full border-b-[0.5px] mb-6">
            {isSuccess && (
              <div className="w-full h-full text-center pt-2">
                <span className="text-primary-500 font-semibold text-lg">
                  <i className="fa-solid fa-circle-check" /> Daten erfolgreich
                  gespeichert!
                </span>
              </div>
            )}
            {isDeleteSuccess && (
              <div className="w-full h-full text-center pt-2">
                <span className="text-primary-500 font-semibold text-lg">
                  <i className="fa-solid fa-circle-check" /> Dokument
                  erfolgreich gelöscht!
                </span>
              </div>
            )}
            {!documents?.length && (
              <div className="w-full flex flex-col gap-8 items-end py-8">
                <h2 className="mx-auto font-bold text-blueGray-700 text-xl">
                  <i className="fas fa-folder-open mr-1"></i> Es sind noch keine
                  Dokumente vorhanden!
                </h2>
              </div>
            )}

            {documents?.length !== 0 && (
              <>
                <h2 className="mx-auto font-bold text-blueGray-700 text-lg">
                  Dokumente:
                </h2>
                {documents.map((item, index) => {
                  return (
                    <div
                      key={item.file_name + index}
                      className="w-full flex flex-row p-2 border-b-[0.5px] justify-between"
                    >
                      <a
                        onClick={() =>
                          setShowViewModal({ show: true, document: item })
                        }
                        className="w-8/12 text-primary-500 font-bold"
                      >
                        <i className="fa-solid fa-file-pdf"></i>{' '}
                        {item.file_name} <br />
                      </a>
                      <button
                        onClick={() =>
                          setShowDeleteModal({ show: true, document: item })
                        }
                        className="w-4/12 text-md text-right font-bold text-red-500 cursor-pointer"
                      >
                        <i className="fa-solid fa-times"></i> Entfernen
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              key={'documents'}
              rules={{ required: 'Bitte Dokumente auswählen' }}
              name={`documents`}
              control={control}
              render={({ field: { value = [], name, onChange } }) => {
                return (
                  <FileInput
                    selectedFile={value}
                    setSelectedFile={(item) => {
                      onChange(item);
                      clearErrors('documents');
                    }}
                    name={name}
                  />
                );
              }}
            />
            {errors?.documents && (
              <p role="alert" className="text-red-500 text-xs font-semibold">
                *{errors?.documents.message}
              </p>
            )}

            <div className="w-full flex flex-row justify-end py-8 text-right text-blueGray-700">
              <Button {...{ type: 'submit', children: 'Speichern' }} />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default MyDocumentsSection;
