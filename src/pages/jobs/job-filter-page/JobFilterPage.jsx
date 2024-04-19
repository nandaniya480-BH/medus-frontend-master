import React, { useState } from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import LeftPanel from '../../../components/sections/jobs/LeftPanel';
import { useGetJobsQuery } from '../../../features/jobs/jobsApiSlice';
import JobSkeleton from '../../../components/elements/skeleton/job';
import JobTeaserFullWidth from '../../../components/elements/cards/JobTeaserFullWidth';
import companyImage from '../../../assets/img/company_placeholder.png';
import notFoundSvg from '../../../assets/img/404_injured.svg';
import { Link, useLocation } from 'react-router-dom';

const JobFilterPage = () => {
  let { state: urlStateSearchParams } = useLocation();
  const [urlSearchParamsState, setUrlSearchParamsState] =
    useState(urlStateSearchParams);
  const INITIAL_PARAMS = { perPage: 5, page: 1 };
  const [params, setParams] = useState(
    urlStateSearchParams
      ? { ...INITIAL_PARAMS, ...urlSearchParamsState }
      : INITIAL_PARAMS
  );
  const {
    data,
    isError,
    refetch,
    isFetching: isLoading,
  } = useGetJobsQuery(params);
  const jobs = data?.data || [];
  const totalJobs = data?.pagination?.total || 0;
  const currentPage = data?.pagination?.current_page || 1;
  const totalIndexes =
    parseInt(parseInt(totalJobs) / 5) + +(parseInt(totalJobs) % 5 != 0);
  const currentIndex = parseInt(currentPage);
  const getPaginationArray = () => {
    const indexes = Array(totalIndexes)
      .fill('')
      .map((item, index) => {
        const i = index + 1;
        if (i < currentIndex + 3 && i > currentIndex - 3) {
          return (
            <button
              key={'pagination' + i}
              className={`font-bold text-[16px] hover:cursor-pointer rounded-full w-10 h-10
              ${
                currentIndex === i
                  ? 'text-white bg-gradient-to-r from-primary-200 from-10% to-primary-500 to-90%'
                  : 'text-blueGray-500 hover:border-[2px] hover:border-primary-500 hover:text-primary-500'
              }
              `}
              onClick={() => {
                setParams({ ...params, page: i });
                window.scrollTo(0, 0);
              }}
            >
              {i}
            </button>
          );
        }

        return <span key={i}></span>;
      });
    return indexes;
  };
  return (
    <>
      <Page>
        <PageContent>
          <div className="container relative mx-auto p-4 flex flex-wrap">
            <h2 className="w-full font-bold md:text-3xl text-2xl text-center md:my-8 my-6 text-blueGray-700">
              Jobs in Gesundheitswesen
            </h2>
            {urlSearchParamsState?.filters && (
              <>
                <div className="w-full flex flex-wrap gap-1.5 px-4 font-bold mb-2">
                  <h3>FILTERS :</h3>
                  {urlSearchParamsState.filters
                    ?.split(',')
                    ?.map((item, index) => (
                      <span
                        key={index}
                        className="text-sm text-white rounded-full bg-primary-500 px-3 mx-1"
                      >
                        {item}
                      </span>
                    ))}
                </div>
                <div className="w-full flex justify-start mb-2">
                  <button
                    onClick={() => {
                      window.history.replaceState({}, document.title);
                      setUrlSearchParamsState({});
                      setParams({
                        ...params,
                        job_categories: '',
                        job_regions: '',
                        job_title: '',
                        ort: '',
                      });
                    }}
                    className="font-bold text-md mr-6 text-red-700 ml-4 underline"
                  >
                    <i className="fas fa-times-circle fa-lg mr-1" />
                    Obene filters Entfernen
                  </button>
                </div>
              </>
            )}

            <div className="md:w-4/12 w-full md:px-4">
              <LeftPanel key={'filters'} setParams={setParams} />
            </div>
            <div className="md:w-8/12 w-full flex flex-col align-items-center md:px-4 px-0 items-center">
              {(isLoading && (
                <div className="w-full">
                  {[1, 2, 3].map((i, index) => {
                    return <JobSkeleton key={i + index} />;
                  })}
                </div>
              )) ||
                jobs?.map((job, index) => {
                  const companyImageProp = {
                    image: companyImage,
                    text: '',
                    className: 'rounded-lg',
                  };
                  return (
                    <div key={index} className="w-full">
                      <JobTeaserFullWidth
                        jobId={job?.id}
                        image={companyImageProp}
                        color="primary"
                        location={`${job?.kantone?.name}`}
                        date={job?.created_at}
                        pensum={`${job?.workload_from}% - ${job?.workload_to}%`}
                        title={job?.job_title}
                        key={job?.name + index}
                        employementType={job?.contract_type?.name}
                        isSponsored={index === 1}
                        link={{ to: '/job/' + job?.slug }}
                      />
                    </div>
                  );
                })}
              {!isLoading && jobs.length == 0 && (
                <>
                  <div className="flex flex-col">
                    <div className="mx-auto my-auto flex flex-col gap-4 text-center">
                      <img
                        src={notFoundSvg}
                        className="w-4/12 place-self-center"
                      />
                      <h2 className="font-bold text-blueGray-700 text-xl">
                        Keine Ergebnisse gefunden!
                      </h2>
                    </div>
                  </div>
                </>
              )}

              {totalIndexes >= 2 && (
                <div className="m-8 w-full flex justify-center gap-4 items-center">
                  <div>
                    <button
                      disabled={currentIndex <= 1}
                      className="text-blueGray-500 font-semibold text-[16px] hover:cursor-pointer mr-4"
                      onClick={() => {
                        setParams({ ...params, page: currentIndex - 1 });
                        window.scrollTo(0, 0);
                      }}
                    >
                      <i className="fas fa-long-arrow-alt-left text-sm animate-bounce-x mr-1" />{' '}
                      <span className="-mt-1">zurück</span>
                    </button>
                  </div>
                  <div>{getPaginationArray()}</div>
                  <div>
                    <button
                      disabled={currentIndex >= totalIndexes}
                      className="text-blueGray-500 font-semibold text-[16px] hover:cursor-pointer ml-4"
                      onClick={() => {
                        setParams({ ...params, page: currentIndex + 1 });
                        window.scrollTo(0, 0);
                      }}
                    >
                      <span className="-mt-1">weiter</span>{' '}
                      <i className="fas fa-long-arrow-alt-right text-sm animate-bounce-x ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default JobFilterPage;
