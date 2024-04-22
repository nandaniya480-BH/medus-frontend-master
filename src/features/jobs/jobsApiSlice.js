import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseApiUrl = process.env.REACT_APP_BACKEND_ENDPOINT_API || '';
export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
  }),
  prepareHeaders: (headers) => {
    headers.set('ngrok-skip-browser-warning', `12`);
    return headers;
  },
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (args) => {
        return { url: 'jobs', params: args };
      },
      method: 'GET',
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
