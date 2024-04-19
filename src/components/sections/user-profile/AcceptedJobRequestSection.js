import React from 'react';
import UserProfileJobCard from '../../elements/cards/UserProfileJobCard';

const AcceptedJobRequestSection = ({ categoryType }) => {
  return (
    <>
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>

      <div className="w-full flex md:flex-row flex-col gap-3 py-4">
        <UserProfileJobCard
          type="Akzeptiert"
          extraCardClasses={'md:w-4/12 w-full'}
        />

        <UserProfileJobCard
          type="Akzeptiert"
          extraCardClasses={'md:w-4/12 w-full'}
        />
      </div>
    </>
  );
};

export default AcceptedJobRequestSection;
