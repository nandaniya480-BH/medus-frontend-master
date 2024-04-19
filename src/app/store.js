import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { getApiSlice } from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import { authApi } from '../features/auth/userApiSlice';
import { jobsApi } from '../features/jobs/jobsApiSlice';
import { companyAuthApi } from '../features/auth/companyApiSlice';

const store = configureStore({
  reducer: {
    [getApiSlice.reducerPath]: getApiSlice.reducer,
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companyAuthApi.reducerPath]: companyAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      getApiSlice.middleware,
      authApi.middleware,
      jobsApi.middleware,
      companyAuthApi.middleware,
    ]),
});
setupListeners(store.dispatch);

export default store;
