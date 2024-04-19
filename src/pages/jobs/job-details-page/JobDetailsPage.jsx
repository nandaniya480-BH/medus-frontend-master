import React from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import { useParams } from 'react-router-dom';
import { useGetJobDetailsQuery } from '../../../features/auth/companyApiSlice';
import JobDetailsPageContent from './JobDetailsPageContent';

export default function JobDetailsPage() {
  const params = useParams();
  const { data, isLoading, isSuccess } = useGetJobDetailsQuery(params?.slug);
  const job = data?.data;

  return (
    <>
      <Page>
        <PageContent>
          <JobDetailsPageContent job={job} />
        </PageContent>
      </Page>
    </>
  );
}
