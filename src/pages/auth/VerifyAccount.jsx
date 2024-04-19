import Page from '../../anatomy/Page';
import PageContent from '../../components/containers/PageContent';
import { useVerifyAccountQuery } from '../../features/api/apiSlice';
import PageNotFound from '../404/PageNotFound';
import { useLocation } from 'react-router-dom';

export const VerifyAccount = () => {
  const location = useLocation();
  const token = location.pathname.split('/').pop();
  const { isLoading, isSuccess, isError, error } = useVerifyAccountQuery(token);

  return (
    <>
      {!isLoading && isSuccess && (
        <Page>
          <PageContent>
            <div className="container mx-auto px-6 md:px-10 flex flex-1">
              <div className="flex flex-col mx-auto my-auto">
                <h1 className="font-bold text-center text-primary-500 md:text-2xl text-xl">
                  Account erfolgreich verifiziert{' '}
                  <i className="fas fa-circle-check"></i>
                </h1>
              </div>
            </div>
          </PageContent>
        </Page>
      )}
      {isError && <PageNotFound />}
    </>
  );
};
