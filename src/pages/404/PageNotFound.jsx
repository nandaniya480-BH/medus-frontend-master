import Page from '../../anatomy/Page';
import PageContent from '../../components/containers/PageContent';
import notFoundSvg from '../../assets/img/404_injured.svg';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <Page>
        <PageContent>
          <div className="bg-radial-gradient flex flex-col flex-1">
            <div className="mx-auto my-auto flex flex-col gap-4 text-center">
              <img src={notFoundSvg} className="w-6/12 place-self-center" />
              <h2 className="font-bold font-blueGray-700 text-2xl">
                404 Seite wurde nicht gefunden!
              </h2>
              <Link
                to={'/'}
                className="text-primary-500 font-semibold text-lg underline"
              >
                <i className="fas fa-arrow-circle-left mr-1" /> zurück zu
                Startseite
              </Link>
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
};

export default PageNotFound;
