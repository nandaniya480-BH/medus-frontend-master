import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApiUrl = process.env.REACT_APP_BACKEND_ENDPOINT_API || '';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ['User', 'Documents', 'Favorites', 'Requests'],
  endpoints: (builder) => ({
    // User queries
    getUserDetails: builder.query({
      query: () => ({
        url: 'employee?with=kantone,plz,soft_skills,contract_types,languages,educations,favourites,job_sub_categories,work_experiences,suggestetd_jobs',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUserSoftSkills: builder.query({
      query: () => ({
        url: 'employee/soft-skills',
        method: 'GET',
      }),
    }),
    getUserWorkExperience: builder.query({
      query: () => ({
        url: 'employee/work_experiences',
        method: 'GET',
      }),
    }),
    getUserLanguages: builder.query({
      query: () => ({
        url: 'employee/languages',
        method: 'GET',
      }),
    }),
    getUserEducations: builder.query({
      query: () => ({
        url: 'employee/educations',
        method: 'GET',
      }),
    }),
    getUserDocuments: builder.query({
      query: () => ({
        url: 'employee/documents',
        method: 'GET',
      }),
      providesTags: ['User', 'Documents'],
    }),
    getUserJobFavorites: builder.query({
      query: () => ({
        url: 'employee/favorite-jobs',
        method: 'GET',
      }),
      providesTags: ['Favorites'],
    }),
    getContactRequests: builder.query({
      query: () => ({
        url: 'employee/contact_requests',
        method: 'GET',
      }),
      providesTags: ['Requests'],
    }),
    getSuggestedJobs: builder.query({
      query: () => ({
        url: 'employee/suggested-jobs',
        method: 'GET',
      }),
    }),

    // User Mutations
    updateUserProfile: builder.mutation({
      query: (payload) => ({
        url: 'employee?with=kantone,plz,soft_skills,contract_types,languages,educations,favourites,job_sub_categories,work_experiences',
        method: 'PUT',
        body: payload,
      }),
      // Updates the user state after successfully update profile request
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUserData } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                Object.assign(draft, updatedUserData);
              }
            )
          );
        } catch {}
      },
    }),
    changePasword: builder.mutation({
      query: (payload) => ({
        url: 'user/reset-password',
        method: 'Post',
        body: payload,
      }),
    }),
    uploadImage: builder.mutation({
      query: (payload) => ({
        url: 'employee/upload-image',
        method: 'Post',
        body: payload,
        formData: true,
      }),
      // sets the image_url to user state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                draft.data.image_url = data.data;
              }
            )
          );
        } catch {}
      },
    }),
    // Soft Skills
    addUserSoftSkills: builder.mutation({
      query: (payload) => ({
        url: 'employee/soft-skills',
        method: 'PUT',
        body: payload,
      }),
      // sets the new Work experience to user state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                draft.data.soft_skills = data.data;
              }
            )
          );
        } catch {}
      },
    }),
    // Work Experience APIs
    addUserWorkExperience: builder.mutation({
      query: (payload) => ({
        url: 'employee/work_experiences',
        method: 'POST',
        body: payload,
      }),
      // sets the new Work experience to user state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                draft.data.work_experiences = [
                  ...draft.data.work_experiences,
                  data.data,
                ];
              }
            )
          );
        } catch {}
      },
    }),
    editUserWorkExperience: builder.mutation({
      query: (payload) => {
        const { id } = payload;
        return {
          url: `employee/work_experiences/${id}`,
          method: 'PUT',
          body: payload,
        };
      },
      // sets the new Work experience to user state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                const updatedWorkExperiences = draft.data.work_experiences.map(
                  (experience) => {
                    if (experience.id === data.data.id) {
                      return data.data;
                    }
                    return experience;
                  }
                );
                draft.data.work_experiences = updatedWorkExperiences;
              }
            )
          );
        } catch {}
      },
    }),
    deleteUserWorkExperience: builder.mutation({
      query: (id) => ({
        url: `employee/work_experiences/${id}`,
        method: 'DELETE',
      }),
      // removes the deleted item from state
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                const updatedWorkExperiences =
                  draft.data.work_experiences.filter(
                    (item) => item.id !== data.data.id
                  );
                draft.data.work_experiences = updatedWorkExperiences;
              }
            )
          );
        } catch {}
      },
    }),

    // Language Mutations
    addUserLanguages: builder.mutation({
      query: (payload) => ({
        url: 'employee/languages',
        method: 'PUT',
        body: payload,
      }),
      // sets the new Languagesto user state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                draft.data.languages = data.data;
              }
            )
          );
        } catch {}
      },
    }),

    // Education Mutations
    addUserEducation: builder.mutation({
      query: (payload) => ({
        url: 'employee/educations',
        method: 'POST',
        body: payload,
      }),
      // sets the new Education to user state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                draft.data.educations = [...draft.data.educations, data.data];
              }
            )
          );
        } catch {}
      },
    }),
    editUserEducation: builder.mutation({
      query: (payload) => {
        return {
          url: `employee/educations/${payload.id}`,
          method: 'PUT',
          body: payload,
        };
      },
      // sets the edited Education to user state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                const updatedEducations = draft.data.educations.map(
                  (eduation) => {
                    if (eduation.id === data.data.id) {
                      return data.data;
                    }
                    return eduation;
                  }
                );
                draft.data.educations = updatedEducations;
              }
            )
          );
        } catch {}
      },
    }),
    deleteUserEducation: builder.mutation({
      query: (id) => ({
        url: `employee/educations/${id}`,
        method: 'DELETE',
      }),
      // removes the deleted item from state
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDetails',
              undefined,
              (draft) => {
                const updatedEducations = draft.data.educations.filter(
                  (item) => item.id !== data.data.id
                );
                draft.data.educations = updatedEducations;
              }
            )
          );
        } catch {}
      },
    }),
    // Documents Mutations
    addUserDocuments: builder.mutation({
      query: (payload) => ({
        url: 'employee/documents',
        method: 'POST',
        body: payload,
        formData: true,
      }),

      // Updates the documents state
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDocuments',
              undefined,
              (draft) => {
                draft.data = [...draft.data, ...data.data];
              }
            )
          );
        } catch {}
      },
    }),
    deleteUserDocument: builder.mutation({
      query: (id) => ({
        url: `employee/documents/${id}`,
        method: 'DELETE',
      }),

      // Updates the documents state
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            authApi.util.updateQueryData(
              'getUserDocuments',
              undefined,
              (draft) => {
                const updatedDocumentsList = draft.data.filter(
                  (item) => item.id !== data.data.id
                );
                draft.data = updatedDocumentsList;
              }
            )
          );
        } catch {}
      },
    }),
    addOrDeleteFavoriteJob: builder.mutation({
      query: (id) => ({
        url: `employee/favorite-jobs/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['User', 'Favorites'],
    }),
    acceptOrDeclineRequest: builder.mutation({
      query: (payload) => ({
        url: `employee/contact_requests`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Requests'],
    }),

    deactivateUserAccount: builder.mutation({
      query: () => ({
        url: `/deactivate-account`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  // Export User
  useGetUserDetailsQuery,
  useGetUserSoftSkillsQuery,
  useGetUserWorkExperienceQuery,
  useGetUserLanguagesQuery,
  useGetUserEducationsQuery,
  useGetUserDocumentsQuery,
  useGetUserJobFavoritesQuery,
  useGetContactRequestsQuery,
  useGetSuggestedJobsQuery,
  // Export User Mutations
  useUpdateUserProfileMutation,
  useChangePaswordMutation,
  useUploadImageMutation,
  // Soft Skills Mutations
  useAddUserSoftSkillsMutation,
  // Work Experience Mutations
  useAddUserWorkExperienceMutation,
  useEditUserWorkExperienceMutation,
  useDeleteUserWorkExperienceMutation,
  // Languages Mutations
  useAddUserLanguagesMutation,
  // Education Mutations
  useAddUserEducationMutation,
  useEditUserEducationMutation,
  useDeleteUserEducationMutation,
  useAddUserDocumentsMutation,
  useDeleteUserDocumentMutation,
  useAddOrDeleteFavoriteJobMutation,
  useAcceptOrDeclineRequestMutation,
  useDeactivateUserAccountMutation,
} = authApi;
