import React, { useState } from 'react';
import CompanyProfileJobCard from '../../elements/cards/CompanyProfileJobCard';
import { useGetJobsQuery } from '../../../features/auth/companyApiSlice';
import { Link } from 'react-router-dom';
import { useDeleteJobMutation } from '../../../features/auth/companyApiSlice';

const InseratAndSuggestionSection = ({ categoryType }) => {
  const { data, isLoading } = useGetJobsQuery();
  const jobs = data?.data;
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    job: null,
  });
  const [
    deleteJob,
    { isLoading: isDeleteLoading, isSuccess: isJobSuccesfullyDeleted },
  ] = useDeleteJobMutation();

  const RenderDeleteJobModal = () => {
    return (
      <>
        <div className="justify-center opacity-95 flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-auto md:w-8/12 w-full p-4">
            <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-white outline-none focus:outline-none px-6 py-2 pb-6  bg-gradient-to-r from-red-700 to-red-600 text-white">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className="font-semibold pb-2">{'Inserat Löschen'}</h5>
                <button
                  className="font-semibold -mt-1"
                  onClick={() => setShowDeleteModal({ show: false, job: null })}
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <h5 className="font-bold text-xl">
                  Wollen Sie wirklich dieses Stelleninserat entfernen ?
                </h5>
                <div className="w-full flex flex-col gap-2 mt-4">
                  <a
                    href={'/job/' + showDeleteModal?.job?.slug}
                    target="_blank"
                    className="font-bold underline text-lg"
                  >
                    {showDeleteModal?.job?.job_title}
                  </a>
                  <div className="w-full flex flex-row gap-3">
                    <span className="font-semibold text-sm">
                      <i className={'fa-solid fa-calendar-days mr-1'}></i>
                      {new Date(
                        showDeleteModal?.job?.created_at
                      ).toLocaleDateString('de-DE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      |
                    </span>
                    <span className="font-semibold text-sm">
                      <i className={'fa-solid fa-location-pin mr-1 '}></i>
                      {showDeleteModal?.job?.ort} |
                    </span>
                    <span className="font-semibold text-sm">
                      {showDeleteModal?.job?.workload_from +
                        '%' +
                        ' - ' +
                        showDeleteModal?.job?.workload_to +
                        '%'}
                    </span>
                  </div>
                  <hr className="mt-4" />
                </div>
                <button
                  onClick={() => {
                    deleteJob(showDeleteModal?.job?.id);
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

  return (
    <>
      {showDeleteModal.show && <RenderDeleteJobModal />}
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full flex flex-row justify-between">
          <h3 className="font-bold text-center text-primary-500 mt-4 text-xl">
            Meine Inserate
          </h3>
        </div>
      </div>

      {isJobSuccesfullyDeleted && (
        <div className="w-full h-full text-center pt-2">
          <span className="text-primary-500 font-semibold text-lg">
            <i className="fa-solid fa-circle-check" /> Daten erfolgreich
            gespeichert!
          </span>
        </div>
      )}
      {(isLoading || isDeleteLoading) && (
        <div className="w-full h-full text-center pt-8">
          <div
            className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                  border-[2px] border-dashed border-primary-500 border-t-transparent"
          ></div>
        </div>
      )}

      {!isLoading && (
        <div className="w-full flex flex-col gap-3 py-4">
          {!jobs?.length && (
            <div className="w-full flex flex-col gap-8 items-end py-8">
              <h2 className="mx-auto font-bold text-blueGray-700 text-xl">
                <i className="fas fa-folder-open mr-1"></i> Es sind noch keine
                Inserate vorhanden!
              </h2>
              <div className="w-6/12 text-right">
                <Link
                  to={'/company/job/create'}
                  className="text-white bg-gradient-to-r from-primary-200 to-primary-regular rounded-full font-semibold px-6 py-2"
                >
                  Erstellen Sie ihr erstes Stelleninserat{' '}
                  <i className="fa-solid fa-plus"></i>
                </Link>
              </div>
            </div>
          )}
          {jobs?.length > 0 &&
            jobs?.map((job, index) => (
              <CompanyProfileJobCard
                key={job?.job_title + index}
                job={job}
                setShowDeleteModal={setShowDeleteModal}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default InseratAndSuggestionSection;
