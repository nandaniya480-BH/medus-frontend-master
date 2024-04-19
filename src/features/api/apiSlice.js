import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApiUrl = process.env.REACT_APP_BACKEND_ENDPOINT_API || '';
export const getApiSlice = createApi({
  reducerPath: 'getApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
  }),
  tagTypes: [
    'Categories',
    'SubCategories',
    'Kantones',
    'Location',
    'SoftSkills',
    'Languages',
    'Educations',
    'ContractTypes',
    'EmployerCategories',
  ],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'job-categories',
      transformResponse: (response) => {
        return response?.data?.map((category) => ({
          value: category.id,
          label: category.name,
          subcategories: category.subcategories.map((subCategory) => ({
            category_id: subCategory.categoryId,
            value: subCategory.id,
            label: subCategory.name,
            index: subCategory.index,
          })),
        }));
      },
    }),
    getSubCategories: builder.query({
      query: () => 'job-subcategories',
    }),
    getKantones: builder.query({
      query: () => 'kantones',
      transformResponse: (response) => {
        return response?.data?.map((kantones) => ({
          value: kantones.id,
          label: kantones.name,
        }));
      },
    }),
    getLocations: builder.query({
      query: () => 'plzs',
    }),
    getSoftSkills: builder.query({
      query: () => 'soft-skills',
      transformResponse: (response) => {
        return response?.data?.map((softSkills) => ({
          value: softSkills.id,
          label: softSkills.name,
        }));
      },
    }),
    getLanguages: builder.query({
      query: () => 'languages',
      transformResponse: (response) => {
        return response?.data?.map((language) => ({
          value: language.id,
          label: language.name,
        }));
      },
    }),
    getEducations: builder.query({
      query: () => 'educations',
      transformResponse: (response) => {
        return response?.data?.map((education) => ({
          value: education.id,
          label: education.name,
        }));
      },
    }),
    getContractTypes: builder.query({
      query: () => 'contract-types',
      transformResponse: (response) => {
        return response?.data?.map((contractTypes) => ({
          value: contractTypes.id,
          label: contractTypes.name,
        }));
      },
    }),
    getEmployerCategories: builder.query({
      query: () => 'employer-categories',
      transformResponse: (response) => {
        return response?.data?.map((employerCategories) => ({
          value: employerCategories.id,
          label: employerCategories.name,
        }));
      },
    }),
    // Forgot Password API
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: 'send-reset-password-link',
        method: 'POST',
        body,
      }),
    }),
    showResetPasswordForm: builder.query({
      query: (token) => ({
        url: `show-password-reset-form/${token}`,
        method: 'GET',
      }),
    }),
    resetForgotPassword: builder.mutation({
      query: (body) => ({
        url: 'reset-forgot-password',
        method: 'POST',
        body,
      }),
    }),
    verifyAccount: builder.query({
      query: (token) => ({
        url: `verify-account/${token}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetKantonesQuery,
  useGetLocationsQuery,
  useGetSoftSkillsQuery,
  useGetLanguagesQuery,
  useGetEducationsQuery,
  useGetContractTypesQuery,
  useGetEmployerCategoriesQuery,
  useForgotPasswordMutation,
  useShowResetPasswordFormQuery,
  useResetForgotPasswordMutation,
  useVerifyAccountQuery,
} = getApiSlice;
