import Page from '../anatomy/Page';
import PageContent from '../components/containers/PageContent';

export const AgbPage = () => {
  return (
    <Page>
      <PageContent>
        <div className="container mx-auto px-6 md:px-10">
          <h1 className="font-bold text-center text-blueGray-700 py-6 my-auto md:text-[38px] text-[28px]">
            AGB
          </h1>
          <span className="text-blueGray-600">Page Content: TBD ...</span>
        </div>
      </PageContent>
    </Page>
  );
};
