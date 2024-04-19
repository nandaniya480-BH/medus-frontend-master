import React from 'react';
import { jobListingDummyData } from './utilities';
import JobTeaserFullWidth from '../../elements/cards/JobTeaserFullWidth';
import { useGetJobsQuery } from '../../../features/jobs/jobsApiSlice';

function JobSearchPageJobListPanel({ data, isError, isLoading }) {
  // const { data, isError, isLoading } = useGetJobsQuery(1);
  const jobs = data?.data || [];
  if (isError) {
    return <h1>error </h1>;
  }
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="flex flex-col w-full mt-0 md:mt-6 border-t pt-6">
      {jobs.map((job) => (
        <JobTeaserFullWidth
          color="red"
          location={job?.ort}
          date={job?.job_details?.start_date}
          pensum={`${job?.workload_from}% - ${job?.workload_to}%`}
          title={job?.job_title}
          description={'test test test'}
          key={job.id}
          // {...job}
        />
      ))}
    </div>
  );
}

export default JobSearchPageJobListPanel;
