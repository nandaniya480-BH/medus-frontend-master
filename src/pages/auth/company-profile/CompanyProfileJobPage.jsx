import React, { useEffect, useState } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import headerImage from '../../../assets/img/app_banner.jpg';
import HeaderJobDetails from '../../../components/sections/headers/HeaderJobDetails';
import CompanyProfileCandidateCard from '../../../components/elements/cards/CompanyProfileCandidateCard';
import {
  useGetJobDetailsAdvancedQuery,
  useLazyGetAnnonymousEmployeeResumeQuery,
  useContactEmployeeMutation,
} from '../../../features/auth/companyApiSlice';
import { useLocation } from 'react-router-dom';
import EmployeeResume from './EmployeeResume';
import '../../../custom.css';

const CompanyProfileJobPage = () => {
  const location = useLocation();
  const [showAnnonymousProfile, setShowAnnonymousProfile] = useState({
    show: false,
    isAnnonymous: true,
  });
  const [showContactEmployeePrompt, setShowContactEmployeePrompt] = useState({
    show: false,
    jobId: undefined,
    employeeId: undefined,
  });
  const jobId = location.pathname.split('/').slice(-1) || undefined;
  const { data, isLoading } = useGetJobDetailsAdvancedQuery(jobId[0]);
  const job = data?.data;
  const [
    contactEmployee,
    { isLoading: isContactingLoading, isSuccess, isError },
  ] = useContactEmployeeMutation();
  const [
    triggerAnnonymousProfile,
    { data: annonymousEmployee, isLoading: isAnnonymousLoading },
  ] = useLazyGetAnnonymousEmployeeResumeQuery();

  const handleContactEmployee = (jobId, employeeId) => {
    return contactEmployee({ job_id: jobId, employee_id: employeeId });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowContactEmployeePrompt({
        show: false,
        jobId: undefined,
        employeeId: undefined,
      });
    }
  }, [isSuccess]);

  const handleShowContactEmployeePrompt = (job, employeeId) => {
    setShowContactEmployeePrompt({
      show: true,
      jobId: job?.id,
      employeeId: employeeId,
    });
  };

  const handleShowAnnonymousProfile = (employeeId, contactStatus) => {
    setShowAnnonymousProfile({
      show: true,
      isAnnonymous: contactStatus !== undefined ? false : true,
    });
    triggerAnnonymousProfile(employeeId);
  };

  const jobHeaderProps = {
    icon: 'far fa-newspaper',
    image: headerImage,
    shouldShowApplyButton: false,
    shouldShowLinkToJobPage: true,
    shouldShowAnchors: false,
  };

  const AnnonymousEmployeeProfilePreview = () => {
    return (
      <div
        className={`justify-center flex fixed inset-0 z-50 overflow-x-hidden`}
      >
        <div className="relative my-auto w-full min-h-screen">
          <div className="rounded-lg relative flex flex-col place-self-center w-full bg-white px-6 py-2 pb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
            <div className="w-full flex flew-row justify-between mb-2 mt-2">
              <h5 className="font-semibold pb-2">Annonymes Profil</h5>
              <button
                className="font-semibold -mt-1 text-red-500"
                onClick={() =>
                  setShowAnnonymousProfile({ show: false, isAnnonymous: true })
                }
              >
                <i className="fa-solid fa-times"></i> Schliessen
              </button>
            </div>
            <div className="w-full">
              <EmployeeResume
                user={annonymousEmployee?.data}
                isUserLoading={isAnnonymousLoading}
                isAnnonymous={showAnnonymousProfile.isAnnonymous}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactEmployeePrompt = () => {
    return (
      <>
        <div
          className={`justify-center flex fixed inset-0 z-50 overflow-x-hidden`}
        >
          <div className="relative my-auto md:w-6/12 w-full p-4">
            <div className="rounded-lg relative flex flex-col place-self-center w-full bg-white px-6 py-2 pb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className="font-semibold pb-2">Kandidat kontaktieren</h5>
                <button
                  className="font-semibold -mt-1 text-red-500"
                  onClick={() =>
                    setShowContactEmployeePrompt({
                      show: false,
                      jobId: undefined,
                      employeeId: undefined,
                    })
                  }
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              <div className="w-full">
                <div className="w-full flex flex-col gap-4">
                  <span>
                    Nach der Zustimmung des Kandidaten erhalten Sie die
                    Möglichkeit die Kontaktdaten und den vollständigen
                    Lebenslauf des Kandidaten einzusehen. Bei einer
                    erfolgreichen Vermittlung entstehen Kosten von{' '}
                    <strong>39.90 CHF exkl. MwSt.</strong>
                  </span>
                  <span className="font-semibold">
                    Möchten Sie den Kandidaten kontaktieren?
                  </span>
                </div>
                <div className="w-full flex flex-row gap-4 mt-4 justify-end">
                  <button
                    onClick={() =>
                      handleContactEmployee(
                        showContactEmployeePrompt.jobId,
                        showContactEmployeePrompt.employeeId
                      )
                    }
                    className="w-4/12 px-3 py-1.5 text-white text-sm font-semibold bg-gradient-to-r from-primary-200 to-primary-regular rounded-full"
                  >
                    Kontaktieren
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-15 fixed inset-0 z-40 bg-black blur-md"></div>
      </>
    );
  };

  return (
    <Page id="company-job-page">
      <PageContent id="company-job-page">
        {showAnnonymousProfile.show && !isAnnonymousLoading && (
          <AnnonymousEmployeeProfilePreview />
        )}
        {showContactEmployeePrompt.show && <ContactEmployeePrompt />}
        {isLoading && !job && (
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
        {!isLoading && job && (
          <>
            <HeaderJobDetails {...jobHeaderProps} job={job} />
            <div className="container mx-auto mt-10 mb-20">
              <div className="w-full flex flex-col text-center items-center  text-blueGray-700">
                {/* <div className="w-full flex flex-row justify-end">
                    <button className="font-bold  text-red-500">
                      <i className="fa-solid fa-times"></i> Inserat Löschen
                    </button>
                  </div> */}
                <div className="w-full flex flex-row justify-start mt-8">
                  <h2
                    id="suggestions"
                    className="text-xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles fa-lg"></i>{' '}
                    Kandidaten Empfehlung
                  </h2>
                </div>

                <div className="w-full flex md:flex-row flex-col gap-3 py-4 pb-8 border-b-[0.5px]">
                  {job?.suggestetd_employees?.length === 0 && (
                    <span className="font-semibold mx-auto">
                      Es gibt momentan keine Empfehlungen!
                    </span>
                  )}
                  {isContactingLoading && (
                    <div className="w-full py-10 flex flex-col">
                      <div className="mx-auto my-auto flex flex-col items-center container gap-4">
                        <div
                          className="w-12 h-12 rounded-full animate-spin
                                  border-[2px] border-dashed border-primary-500 border-t-transparent"
                        ></div>
                        <span className="font-semibold text-sm">
                          wird geladen...
                        </span>
                      </div>
                    </div>
                  )}
                  {!isContactingLoading &&
                    job?.suggestetd_employees?.length > 0 &&
                    job.suggestetd_employees.map((candidate, index) => (
                      <CompanyProfileCandidateCard
                        key={index}
                        candidate={candidate}
                        jobId={job?.id}
                        contactedEmployeeInfo={job?.contacted_employees}
                        handleContactEmployee={() =>
                          handleShowContactEmployeePrompt(job, candidate?.id)
                        }
                        handleAnnonymousProfile={handleShowAnnonymousProfile}
                        type="Empfehlung"
                        extraCardClasses={'md:w-3/12 w-full'}
                      />
                    ))}
                </div>

                <div className="w-full flex flex-row justify-start mt-8">
                  <h2
                    id="interested"
                    className="text-xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
                  >
                    <i className="fa-solid fa-star fa-lg"></i> Interessenten für
                    das Stellen-Inserat
                  </h2>
                </div>

                <div className="w-full flex md:flex-row flex-col gap-3 py-4 pb-8 border-b-[0.5px]">
                  {job?.favourites?.length === 0 && (
                    <span className="font-semibold mx-auto">
                      Momentan hat kein Kandidat das inserat als Favorit
                      gespeichert!
                    </span>
                  )}
                  {isContactingLoading && (
                    <div className="w-full py-10 flex flex-col">
                      <div className="mx-auto my-auto flex flex-col items-center container gap-4">
                        <div
                          className="w-12 h-12 rounded-full animate-spin
                                  border-[2px] border-dashed border-primary-500 border-t-transparent"
                        ></div>
                        <span className="font-semibold text-sm">
                          wird geladen...
                        </span>
                      </div>
                    </div>
                  )}
                  {!isContactingLoading &&
                    job?.favourites?.length > 0 &&
                    job.favourites.map((candidate, index) => (
                      <CompanyProfileCandidateCard
                        key={index}
                        jobId={job}
                        candidate={candidate}
                        contactedEmployeeInfo={job?.contacted_employees}
                        handleContactEmployee={() =>
                          handleShowContactEmployeePrompt(job, candidate?.id)
                        }
                        handleAnnonymousProfile={handleShowAnnonymousProfile}
                        type="Interessent"
                        extraCardClasses={'md:w-3/12 w-full'}
                      />
                    ))}
                </div>

                <div className="w-full flex flex-row justify-start mt-8">
                  <h2
                    id="requests"
                    className="text-xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
                  >
                    <i className="fa-solid fa-envelope-circle-check fa-lg"></i>{' '}
                    Meine Anfragen
                  </h2>
                </div>

                <div className="w-full flex md:flex-row flex-col gap-3 py-4 pb-8 border-b-[0.5px]">
                  {/* Needs to be changed to job?.contacted_employees?.length === 0  */}
                  {job?.contacted_employees?.length === 0 && (
                    <span className="font-semibold mx-auto">
                      Sie haben noch keinen Kandidaten für den entsprechenden
                      Inserat kontaktiert!
                    </span>
                  )}
                  {job?.contacted_employees?.length > 0 &&
                    job.contacted_employees.map((candidate, index) => (
                      <CompanyProfileCandidateCard
                        key={index}
                        type="Anfrage"
                        candidate={candidate}
                        contactedEmployeeInfo={job?.contacted_employees}
                        handleAnnonymousProfile={handleShowAnnonymousProfile}
                        extraCardClasses={'md:w-3/12 w-full'}
                      />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </PageContent>
    </Page>
  );
};

export default CompanyProfileJobPage;
