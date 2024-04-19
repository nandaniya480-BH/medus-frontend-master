import React, { useState, useEffect } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import JobInformations from '../../../components/sections/create-inserat/JobInformations';
import StellenInserat from '../../../components/sections/create-inserat/StellenInserat';
import MagicMatch from '../../../components/sections/create-inserat/MagicMatch';
import Optionen from '../../../components/sections/create-inserat/Optionen';
import Publish from '../../../components/sections/create-inserat/Publish';
import {
  useGetCompanyDetailsQuery,
  useCreateNewJobMutation,
  useGetJobDetailsQuery,
  useUpdateJobMutation,
} from '../../../features/auth/companyApiSlice';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import JobDetailsPageContent from '../../jobs/job-details-page/JobDetailsPageContent';
import { formInitialState } from './utilities';

const CreateInseratPage = () => {
  const params = useParams();
  const location = useLocation();
  const slug = location.state?.slug || undefined;
  const navigate = useNavigate();
  const isEditAction = params.action === 'edit' && slug;
  const {
    data: job,
    isLoading: isEditJobLoading,
    isSuccess: isEditJobSuccess,
  } = useGetJobDetailsQuery(slug, { skip: !isEditAction });
  if (params.action === 'edit' && !slug) {
    window.history.replaceState(null, 'edit', 'create');
  }
  const { data: result, isLoading: userDataStillLoading } =
    useGetCompanyDetailsQuery();
  const [storeJobMutation, { isLoading, isSuccess, isError }] = !isEditAction
    ? useCreateNewJobMutation()
    : useUpdateJobMutation();
  const [slideDirection, setSlideDirection] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (isSuccess) {
      navigate('/company/profile');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isEditJobSuccess && job?.data && isEditAction) {
      const editForm = {
        ...job?.data,
        job_subcategories: [
          {
            value: job?.data?.job_subcategory?.id,
            label: job?.data?.job_subcategory?.name,
          },
        ],
        selected_soft_skills: job?.data?.soft_skills?.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
        selected_educations: job?.data?.educations.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
        selectedOptions: job?.data?.prices?.map(({ id, name, price_id }) => ({
          id,
          price_id,
          label: name,
          selected: true,
        })),
        name: job?.data?.employer?.name,
        step_wizard: 1,
      };

      delete editForm['job_id'];

      setForm({ ...editForm });
    }
    if (result?.data && !isEditJobSuccess && !isEditAction) {
      setForm(() => ({
        ...formInitialState,
        name: result?.data?.name || '',
        employer_description: result?.data?.description || '',
        step_wizard: 1,
      }));
    }
  }, [result, job, isEditJobSuccess]);

  const handlePrevStep = (e) => {
    e.preventDefault();
    setSlideDirection('slide-out-right');
    setTimeout(() => {
      setForm({
        ...form,
        step_wizard: form?.step_wizard - 1,
      });
      setSlideDirection('slide-in-left');
    }, 500);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    // check if form.job_file contains a file
    let file = null;
    if (form?.job_file?.length > 0) {
      file = form?.job_file[0];
    }

    const transformedData = {
      ...form,
      job_file: file,
      languages: JSON.stringify(form.languages),
      soft_skills: JSON.stringify(form.soft_skills),
      educations: JSON.stringify(form.educations),
      prices: JSON.stringify(form.prices),
    };
    storeJobMutation(transformedData);
    setForm({
      ...form,
      step_wizard: form?.step_wizard + 1,
    });
  };

  const JobPreviewModal = ({ job }) => {
    return (
      <>
        <div
          className={`justify-center flex fixed inset-0 z-50 overflow-x-hidden`}
        >
          <div className="relative my-auto w-11/12 py-8">
            <div className="rounded-lg relative flex flex-col place-self-center w-full bg-white px-6 py-2 pb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className="font-semibold pb-2">{`${form?.job_title} | Vorschau`}</h5>
                <button
                  className="font-semibold -mt-1 text-red-500"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <JobDetailsPageContent job={job} isPreview />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="opacity-50 fixed inset-0 z-40 bg-black blur-md"></div> */}
      </>
    );
  };

  return (
    <Page>
      <PageContent>
        {showModal && <JobPreviewModal job={form} />}

        <div className="pt-10 pb-10 bg-radial-gradient flex-1">
          <div className="container mx-auto">
            <Link
              to={'/company/profile'}
              className="text-primary-500 font-semibold text-lg"
            >
              <i className="fa-solid fa-arrow-left"></i> zurück zum Profil
            </Link>
            <h2 className="text-3xl font-bold text-blueGray-700 text-center mb-8">
              {!slug ? 'Neues Inserat erstellen' : 'Inserat bearbeiten'}
            </h2>
            <div className="flex md:flex-row flex-col items-center gap-4 mb-8 font-bold cursor-pointer text-blueGray-700 text-xl px-4">
              <div className="md:w-1/5 w-full">
                <span
                  className={`${form?.step_wizard > 1 && 'text-primary-500'}`}
                >
                  <i
                    className={`fa-solid ${
                      form?.step_wizard > 1
                        ? 'fa-circle-check'
                        : 'fa-circle-info'
                    }`}
                  ></i>{' '}
                  Job Information
                </span>
                <div
                  className={`w-full h-1 mt-1 ${
                    form?.step_wizard >= 1 ? 'bg-primary-500' : 'bg-gray-400'
                  } rounded-full`}
                ></div>
              </div>
              {form.step_wizard < 2 && (
                <div
                  className={`md:w-1/5 w-full text-gray-400 cursor-not-allowed`}
                >
                  <span>
                    <i className={`fa-solid fa-newspaper`}></i> Stellen Inserat
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-blueGray-400 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard === 2 && (
                <div className={`md:w-1/5 w-full `}>
                  <span className="text-blueGray-700">
                    <i className={`fa-solid fa-newspaper`}></i> Stellen Inserat
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-blueGray-500 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard > 2 && (
                <div className={`md:w-1/5 w-full`}>
                  <span className="text-primary-500">
                    <i className={`fa-solid fa-circle-check`}></i> Stellen
                    Inserat
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-primary-500 rounded-full`}
                  />
                </div>
              )}

              {form.step_wizard < 3 && (
                <div
                  className={`md:w-1/5 w-full text-gray-400 cursor-not-allowed`}
                >
                  <span>
                    <i className={`fa-solid fa-wand-magic-sparkles`}></i> Magic
                    Match
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-blueGray-400 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard === 3 && (
                <div className={`md:w-1/5 w-full `}>
                  <span className="text-blueGray-700">
                    <i className={`fa-solid fa-wand-magic-sparkles`}></i> Magic
                    Match
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-blueGray-500 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard > 3 && (
                <div className={`md:w-1/5 w-full`}>
                  <span className="text-primary-500">
                    <i className={`fa-solid fa-circle-check`}></i> Magic Match
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-primary-500 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard < 4 && (
                <div
                  className={`md:w-1/5 w-full text-gray-400 cursor-not-allowed`}
                >
                  <span>
                    <i className={`fa-solid fa-gear`}></i> Optionen
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-blueGray-400 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard === 4 && (
                <div className={`md:w-1/5 w-full `}>
                  <span className="text-blueGray-700">
                    <i className={`fa-solid fa-gear`}></i> Optionen
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-blueGray-500 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard > 4 && (
                <div className={`md:w-1/5 w-full`}>
                  <span className="text-primary-500">
                    <i className={`fa-solid fa-circle-check`}></i> Optionen
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-primary-500 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard < 5 && (
                <div
                  className={`md:w-1/5 w-full text-gray-400 cursor-not-allowed`}
                >
                  <span>
                    <i className={`fa-solid fa-upload`}></i> Publizieren
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-blueGray-400 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard === 5 && (
                <div className={`md:w-1/5 w-full `}>
                  <span className="text-blueGray-700">
                    <i className={`fa-solid fa-upload`}></i> Publizieren
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-blueGray-500 rounded-full`}
                  />
                </div>
              )}
              {form.step_wizard > 5 && (
                <div className={`md:w-1/5 w-full`}>
                  <span className="text-primary-500">
                    <i className={`fa-solid fa-circle-check`}></i> Publizieren
                  </span>
                  <div
                    className={`w-full h-1 mt-1 bg-primary-500 rounded-full`}
                  />
                </div>
              )}
            </div>

            {(isLoading || userDataStillLoading || isEditJobLoading) && (
              <div className="w-full h-full text-center pt-8">
                <div
                  className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                      border-[2px] border-dashed border-primary-500 border-t-transparent"
                ></div>
              </div>
            )}

            {!isLoading && !userDataStillLoading && isSuccess && (
              <div className="w-full h-full text-center pt-2">
                <span className="text-primary-500 font-semibold text-2xl">
                  <i className="fa-solid fa-circle-check" /> Daten erfolgreich
                  gespeichert!
                </span>
              </div>
            )}
            {isError && (
              <div className="w-full h-full text-center pt-2">
                <span className="text-red-500 font-semibold text-2xl">
                  <i className="fa-solid fa-circle-xmark" /> Etwas is schief
                  gelaufen.
                </span>
              </div>
            )}

            {!isLoading &&
              !userDataStillLoading &&
              !isEditJobLoading &&
              !showModal && (
                <div>
                  {form?.step_wizard === 1 && (
                    <div
                      className={`p-4 bg-white mb-10 rounded-md shadow-xl ${slideDirection}`}
                    >
                      <div className="w-full text-center pb-6">
                        <p className="mb-4 font-bold text-blueGray-700 text-2xl">
                          Job Informations
                        </p>
                        {!userDataStillLoading && (
                          <JobInformations form={form} setForm={setForm} />
                        )}
                      </div>
                    </div>
                  )}

                  {form?.step_wizard === 2 && (
                    <div
                      className={`p-4 bg-white rounded-md drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)] ${slideDirection}`}
                    >
                      <div className="w-full text-center">
                        <p className="mb-4 font-bold text-blueGray-700 text-2xl">
                          Stelleninserat erstellen mit:
                        </p>

                        <StellenInserat form={form} setForm={setForm} />
                      </div>
                    </div>
                  )}

                  {form?.step_wizard === 3 && (
                    <div
                      className={`p-4 bg-white rounded-md drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)] ${slideDirection}`}
                    >
                      <div className="w-full text-center">
                        <p className="mb-4 font-bold text-blueGray-700">
                          Bitte geben Sie alle unten aufgeführten Informationen
                          an, um eine effiziente Kandidatensuche zu ermöglichen.
                        </p>

                        <MagicMatch form={form} setForm={setForm} />
                      </div>
                    </div>
                  )}

                  {form?.step_wizard === 4 && (
                    <div
                      className={`p-4 bg-white  rounded-md drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)] ${slideDirection}`}
                    >
                      <div className="w-full text-center">
                        <p className="mb-4 font-bold text-blueGray-700 text-2xl">
                          Bitte wählen Sie die gewünschte Option für das
                          Stelleninserat :
                        </p>

                        <Optionen form={form} setForm={setForm} />
                      </div>
                    </div>
                  )}

                  {form?.step_wizard === 5 && (
                    <div
                      className={`p-4 bg-white rounded-md drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)] ${slideDirection}`}
                    >
                      <div className="w-full text-center">
                        <p className="mb-4 font-bold text-blueGray-700 text-3xl">
                          Vorschau & Publizieren
                        </p>

                        <Publish setShowModal={setShowModal} form={form} />

                        <div className="flex justify-between mt-4">
                          <button
                            className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none font-bold py-2 px-4 rounded-full"
                            type="button"
                            onClick={handlePrevStep}
                          >
                            <i className="fa-solid fa-arrow-left"></i> Zurück
                          </button>
                          <button
                            className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none font-bold py-2 px-4 rounded-full"
                            type="button"
                            onClick={handleFinish}
                          >
                            Publish <i className="fa-solid fa-upload"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default CreateInseratPage;
