import React from 'react';
import ChangePasswordForm from '../forms/ChangePassword';

const MyAccountSection = ({ categoryType }) => {
  return (
    <>
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>

      <ChangePasswordForm />
    </>
  );
};

export default MyAccountSection;
