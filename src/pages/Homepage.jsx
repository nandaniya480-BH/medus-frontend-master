import Page from '../anatomy/Page';
import PageContent from '../components/containers/PageContent';
import headerImage from '../assets/logo/homepage_header.jpeg';
import HeaderImageTitleCenter from '../components/sections/headers/HeaderImageTitleCenter';
import TabsWithCategoryAndRegionSearch from '../components/sections/tabs/TabsWithCategoryAndRegionSearch';
import InfoForEmployerAndEmployees from '../components/sections/content/InfoForEmployerAndEmployees';
import InfoServices from '../components/sections/content/InfoServices';
import InfoAppDownloadSection from '../components/sections/content/InfoAppDownloadSection';
import JobCarouselList from '../components/sections/content/JobCarouselList';

const headerProps = {
  bgImage: headerImage,
  title: 'Jobs im Gesundheitswesen',
  titleProps: { placeholder: 'Job', leftIcon: 'fas fa-search' },
  locationProps: { placeholder: 'Ort', leftIcon: 'fas fa-location' },
  button: {
    color: 'primary',
    children: 'Suchen',
    fullWidth: true,
    roundedSize: 'full',
  },
};

const Homepage = () => {
  return (
    <>
      <Page>
        <PageContent>
          <HeaderImageTitleCenter {...headerProps} />
          <TabsWithCategoryAndRegionSearch />
          <InfoForEmployerAndEmployees />
          <JobCarouselList />
          <InfoServices />
          <InfoAppDownloadSection />
        </PageContent>
      </Page>
    </>
  );
};

export default Homepage;
