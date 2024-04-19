import React from 'react';
import { Link } from 'react-router-dom';

const CompanyProfileMonthlyCostCard = ({
  extraCardClasses,
  cost,
  data,
  setShowModal,
}) => {
  return (
    <div
      className={'w-full shadow-lg rounded-lg px-4 py-3 ' + extraCardClasses}
    >
      <div className="w-full flex md:flex-row flex-col gap-4 justify-between align-end text-center mt-2">
        <h2 className="font-bold text-xl text-blueGray-700">
          <i className="fa-solid fa-file-invoice"></i> {cost || 'Februar 2023'}
        </h2>
        <button
          onClick={() =>
            setShowModal({
              show: true,
              costData: data,
              month: cost,
            })
          }
          className="px-3 py-1.5 text-white text-sm font-semibold bg-blueGray-600 rounded-full"
        >
          Übersicht für <span className="font-bold">{cost}</span> anzeigen{' '}
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
      </div>
    </div>
  );
};

export default CompanyProfileMonthlyCostCard;
