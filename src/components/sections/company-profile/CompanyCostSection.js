import React, { useEffect, useState } from 'react';
import CompanyProfileMonthlyCostCard from '../../elements/cards/CompanyProfileMonthlyCostCard';
import { Months } from './utils';
import { useGetJobsCostsQuery } from '../../../features/auth/companyApiSlice';

const CompanyCostSection = ({ categoryType }) => {
  const [showModal, setShowModal] = useState({
    show: false,
    costData: [],
    month: '',
  });
  const { data, isLoading, isSuccess } = useGetJobsCostsQuery();
  const costs = data?.data;

  const calculateTotalPrice = (prices) => {
    const total = prices.reduce((acc, item) => acc + parseFloat(item.price), 0);
    return Math.round(total / 0.05) * 0.05;
  };

  const calculateTax = (prices) => {
    const totalPrice = calculateTotalPrice(prices);
    const tax = totalPrice * 0.077;
    return Math.round(tax / 0.05) * 0.05;
  };

  const RenderCostsModal = () => {
    return (
      <>
        <div className="justify-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-auto md:w-11/12 w-full p-4">
            <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-white outline-none focus:outline-none px-6 py-2 pb-6">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className=" pb-2">
                  Kosten Übersicht für <strong>{showModal.month}</strong>
                </h5>
                <button
                  className="font-semibold -mt-1"
                  onClick={() => setShowModal({ show: false, data: null })}
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              <div className="w-full flex flex-col gap-4 text-blueGray-700">
                <h2 className="font-bold text-2xl text-center">
                  Inserate für {showModal.month}
                </h2>
                {showModal.costData?.map((item, index) => (
                  <div
                    key={index}
                    className=" w-full px-4 my-2 border-b pb-6 last:border-none"
                  >
                    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className="py-3 text-left text-[14px]">
                            {item?.job_title}
                          </th>
                          <th className="py-3 text-left">Datum</th>
                          <th className="py-3 text-left">Inserat ID</th>
                          <th className="py-3 text-right">
                            Preis <small>(CHF)</small>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item?.prices &&
                          item?.prices.map((subitem, index) => (
                            <tr
                              key={index + 1000}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-semibold"
                            >
                              <td className="py-2 text-left">
                                {subitem?.name}
                              </td>
                              <td className="py-2 text-left">
                                {new Date(
                                  subitem?.pivot?.created_at
                                ).toLocaleDateString('de-DE', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </td>
                              <td className="py-2 text-left">{item?.job_id}</td>
                              <td className="py-2 text-right">
                                CHF {subitem?.price}.-
                              </td>
                            </tr>
                          ))}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-bold">
                          <td className="py-4 text-right" colSpan={3}>
                            MwSt.
                          </td>
                          <td className="py-4 text-right">
                            CHF {calculateTax(item?.prices).toFixed(2)}.-
                          </td>
                        </tr>
                        <tr className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 font-bold text-[16px]">
                          <td className="py-4 text-right" colSpan={3}>
                            Total exkl. 7.7% MwSt.
                          </td>
                          <td className="py-4 text-right">
                            CHF{' '}
                            {(
                              calculateTotalPrice(item?.prices) -
                              calculateTax(item?.prices)
                            ).toFixed(2)}
                            .-
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-30 fixed inset-0 z-40 bg-black blur-md"></div>
      </>
    );
  };

  return (
    <>
      {showModal.show && <RenderCostsModal />}
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full flex flex-row justify-between">
          <h3 className="font-bold text-center text-primary-500 mt-4 text-xl">
            Meine Kosten
          </h3>
        </div>
      </div>

      {costs &&
        Object.keys(costs)?.map((cost, index) => (
          <div
            key={index + cost}
            className="w-full flex flex-col gap-3 py-4 mb-4 border-b last:border-none pb-8"
          >
            <h3 className="font-bold text-xl text-blueGray-700">
              Kosten Übersicht für {cost}:
            </h3>
            {Object.keys(costs[cost])?.map((item, index) => (
              <>
                <CompanyProfileMonthlyCostCard
                  key={index + item}
                  cost={Months[parseInt(item) - 1] + ' ' + cost}
                  data={costs[cost][item]}
                  setShowModal={setShowModal}
                />
              </>
            ))}
          </div>
        ))}
    </>
  );
};

export default CompanyCostSection;
