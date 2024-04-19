import React from 'react';
import bgImage from '../../../assets/img/app_banner.jpg';
import appStore from '../../../assets/img/appstore.png';
import googlePlayStore from '../../../assets/img/gplay.png';
import appMockup from '../../../assets/img/medus_app.png';

export default function InfoAppDownloadSection() {
  return (
    <>
      <div
        className="container bg-white md:rounded-lg bg-cover shadow-lg mx-auto p-8 mb-32"
        style={{
          backgroundImage: 'url(' + bgImage + ')',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="container mx-auto grid md:grid-flow-col md:gap-20 gap-4 md:p-0 p-4 text-center ">
          <div className="text-white text-center my-auto">
            <h1 className="text-2xl font-bold mb-4">
              Hol Dir jetzt die medus.work App!
            </h1>
            <img
              src={appStore}
              alt="..."
              className={'w-[200px] rounded-t-lg opacity-100 mb-2 mx-auto'}
            />
            <img
              src={googlePlayStore}
              alt="..."
              className={'w-[200px] rounded-t-lg mx-auto'}
            />
          </div>
          <div className="text-white text-center">
            <img
              src={appMockup}
              alt="..."
              className={'rounded-lg shadow-lg mx-auto md:mt-0 mt-8'}
            />
          </div>
        </div>
      </div>
    </>
  );
}
