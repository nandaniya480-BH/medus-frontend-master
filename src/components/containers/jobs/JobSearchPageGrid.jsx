import React from 'react';

function JobSearchPageGrid({
  leftPanelChild,
  topPanelChild,
  jobListPanelChild,
}) {
  return (
    <>
      <div className="min-h-screen pb-20">
        <div className="max-w-7xl mx-auto py-3 sm:px-6 md:px-6 lg:px-8">
          {topPanelChild}
        </div>

        <div className="max-w-7xl mx-auto md:px-6 px-4">
          {/* <h2 className="text-left py-10 my-auto text-[18px]">ANGEWANDT FILTER:</h2> */}
          <div className="flex md:flex-row flex-col gap-8">
            <div className="md:w-3/12">{leftPanelChild}</div>
            <div className="md:w-9/12 w-full">{jobListPanelChild}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobSearchPageGrid;
