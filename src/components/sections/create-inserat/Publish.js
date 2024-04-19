import React, { useState } from 'react'; //eslint-disable-line
import JobPreviewSkeleton from '../../elements/skeleton/jobPreviewSkeleton';

export default function Publish({ form, setShowModal }) {
  return (
    <>
      <div className="w-full flex md:flex-row flex-col mx-auto gap-4 py-8">
        <div className="md:w-5/12 w-full gap-4 flex align-items-center border rounded-xl">
          <div className="w-full my-auto py-2 shadow-sm py-8">
            <JobPreviewSkeleton title={form?.job_title} />
            <button
              className=" my-auto mx-auto rounded-full text-xl preview-btn mt-4 mb-4"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <span className="preview-btn-content text-[16px]">
                <i className="fa-solid fa-eye"></i> Vorschau vollständiges
                Inserat
              </span>
            </button>
          </div>
        </div>

        <div className="md:w-7/12 w-full px-4">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 text-left">
                  Optionen
                </th>
                <th scope="col" className="py-3 text-right">
                  Preis <small>(CHF)</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {form?.selectedOptions &&
                form?.selectedOptions.map((item, index) => (
                  <tr
                    key={item.label + index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-semibold"
                  >
                    <td className="py-4 text-left">{item.label}</td>
                    <td className="py-4 text-right">
                      CHF {item.value?.toFixed(2)}.-
                    </td>
                  </tr>
                ))}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-bold">
                <td className="py-4 text-right">MwSt.</td>
                <td width={'50%'} className="py-4 text-right">
                  CHF {form?.taxPrice}.-
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-bold text-sm">
                <td className="py-4 text-right">Total exkl. 7.7% MwSt.</td>
                <td width={'50%'} className="py-4 text-right">
                  CHF {form?.totalPrice}.-
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
