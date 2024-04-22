import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApiUrl = process.env.REACT_APP_BACKEND_ENDPOINT_API || '';
export const companyAuthApi = createApi({
  reducerPath: 'companyAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        headers.set('ngrok-skip-browser-warning', `12`);
        return headers;
      }
    },
  }),
  tagTypes: [
    'Company',
    'Jobs',
    'Prices',
    'Costs',
    'Employers',
    'EmployeeResume',
  ],
  endpoints: (builder) => ({
    // Company queries
    getCompanyDetails: builder.query({
      query: () => ({
        url: 'employer?with=kantone,plz,category,jobs',
        method: 'GET',
      }),
      providesTags: ['Company'],
    }),
    getPublicCompanyDetails: builder.query({
      query: (slug) => ({
        url: `employer-profile/${slug}`,
        method: 'GET',
      }),
    }),

    getJobs: builder.query({
      query: () => ({
        url: 'employer/jobs',
        method: 'GET',
      }),
      providesTags: ['Company', 'Jobs'],
    }),
    getJobDetails: builder.query({
      query: (slug) => ({
        url: `jobs/${slug}?with=plz,kantone,employer,suggestetd_employees`,
        method: 'GET',
      }),
      providesTags: ['Company', 'Jobs'],
    }),
    getJobDetailsAdvanced: builder.query({
      query: (id) => ({
        url: `/employer/jobs/${id}?with=plz,kantone,employer,suggestetd_employees,favourites,contacted_employees`,
        method: 'GET',
      }),
      providesTags: ['Company', 'Jobs'],
    }),
    getAnnonymousEmployeeResume: builder.query({
      query: (id) => ({
        url: `/employer/job/employee-annonymous-resume/${id}?with=plz,kantone,contract_types,soft_skills,languages,educations,work_experiences,job_sub_categories`,
        method: 'GET',
      }),
      providesTags: ['Company', 'EmployeeResume'],
    }),
    getEmployerList: builder.query({
      query: () => ({
        url: `/employer/get-employer-list`,
        method: 'GET',
      }),
      providesTags: ['Company', 'Employers'],
    }),
    getJobsCosts: builder.query({
      query: () => ({
        url: `employer/years-costs`,
        method: 'GET',
      }),
      providesTags: ['Company', 'Jobs', 'Costs'],
    }),

    getPrices: builder.query({
      query: () => ({
        url: `prices`,
        method: 'GET',
      }),
      providesTags: ['Prices'],
      transformResponse: (response) => {
        return response?.data?.map((price) => ({
          id: price.id,
          value: parseFloat(price.price),
          label: price.name,
          selected: price.id !== 2 ? false : true,
        }));
      },
    }),

    // Company Mutations
    uploadImage: builder.mutation({
      query: (payload) => ({
        url: 'employer/upload-image',
        method: 'Post',
        body: payload,
        formData: true,
      }),
      // sets the image_url to user state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            companyAuthApi.util.updateQueryData(
              'getCompanyDetails',
              undefined,
              (draft) => {
                draft.data.logo_url = data.data;
              }
            )
          );
        } catch {}
      },
    }),
    updateCompanyProfile: builder.mutation({
      query: (payload) => ({
        url: 'employer?with=kantone,plz,category',
        method: 'PUT',
        body: payload,
      }),
      // Updates the user state after successfully update profile request
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUserData } = await queryFulfilled;
          const patchResult = dispatch(
            companyAuthApi.util.updateQueryData(
              'getCompanyDetails',
              undefined,
              (draft) => {
                Object.assign(draft, updatedUserData);
              }
            )
          );
        } catch {}
      },
    }),

    createEmployerAccount: builder.mutation({
      query: (payload) => ({
        url: 'employer/create-employer',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Employers'],
    }),

    deletEmployerAccount: builder.mutation({
      query: (id) => ({
        url: `employer/delete-employer/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employers'],
    }),

    // Job postim mutation
    createNewJob: builder.mutation({
      query: (payload) => ({
        url: 'employer/jobs',
        method: 'POST',
        body: payload,
        formData: true,
      }),
    }),

    updateJob: builder.mutation({
      query: (payload) => {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value);
        });

        return {
          url: `employer/jobs/${payload?.id}`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },

      // sets the edited Job to the Jobs state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            companyAuthApi.util.updateQueryData(
              'getJobs',
              undefined,
              (draft) => {
                const updatedJobs = draft.data.educations.map((job) => {
                  if (job.id === data.data.id) {
                    return data.data;
                  }
                  return null;
                });
                draft.data = updatedJobs;
              }
            )
          );
        } catch {}
      },
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `employer/jobs/${id}`,
        method: 'DELETE',
      }),
    }),

    // Job postim mutation
    contactEmployee: builder.mutation({
      query: (payload) => ({
        url: 'employer/contact-employee',
        method: 'POST',
        body: payload,
        formData: true,
      }),
      invalidatesTags: ['Jobs'],
    }),

    // params: type, message, employer_id
    sendSupportEmail: builder.mutation({
      query: (payload) => ({
        url: 'employer/support-email',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  // Export Get queries for Company
  useGetCompanyDetailsQuery,
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useGetJobDetailsAdvancedQuery,
  useGetPublicCompanyDetailsQuery,
  useGetPricesQuery,
  useGetJobsCostsQuery,
  useGetEmployerListQuery,
  // Export Company Mutations
  useUploadImageMutation,
  useUpdateCompanyProfileMutation,
  // Export Job mutations
  useCreateEmployerAccountMutation,
  useDeletEmployerAccountMutation,
  useCreateNewJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useContactEmployeeMutation,
  useSendSupportEmailMutation,

  // use of Lazy Queries
  useLazyGetAnnonymousEmployeeResumeQuery,
} = companyAuthApi;
