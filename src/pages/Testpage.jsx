import React from 'react';
// import PropTypes from "prop-types";
import Page from '../anatomy/Page';
import PageContent from '../components/containers/PageContent';

function Testpage(props) {
  // const { children } = props;
  return (
    <Page>
      <div className="w-full h-[400px] bg-lime-200"></div>
      <PageContent>
        <h1 className="text-red-500 text-[20px]">Testing page</h1>
        <h1 className="text-red-500 text-[20px]">Testing page</h1>
        <h1 className="text-red-500 text-[20px]">Testing page</h1>
        <h1 className="text-red-500 text-[20px]">Testing page</h1>
        <h1 className="text-red-500 text-[20px]">Testing page</h1>
      </PageContent>
    </Page>
  );
}

Testpage.propTypes = {};

export default Testpage;
