import React, { useState } from 'react';
import { useGetEmployerListQuery } from '../../../features/auth/companyApiSlice';

const CompanyUserList = ({ setShowModal, setShowDeleteModal }) => {
  const { data, isLoading } = useGetEmployerListQuery();
  const employers = data?.data;
  return (
    <>
      {isLoading && (
        <div className="w-full py-10 flex flex-col">
          <div className="mx-auto my-auto flex flex-col items-center container gap-4">
            <div
              className="w-12 h-12 rounded-full animate-spin
                        border-[2px] border-dashed border-primary-500 border-t-transparent"
            ></div>
            <span className="font-semibold text-sm">Liste wird geladen...</span>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="relative overflow-x-auto flex flex-col gap-4">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Erstellungsdatum
                </th>
                <th scope="col" className="px-6 py-3">
                  Account Löschen
                </th>
              </tr>
            </thead>
            <tbody>
              {employers?.length > 0 &&
                employers.map((employer, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-blueGray-700 font-semibold"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{employer?.email}</td>
                    <td className="px-6 py-4">
                      {new Date(employer?.created_at).toLocaleDateString(
                        'de-DE',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          setShowDeleteModal({ show: true, id: employer?.id })
                        }
                        className="text-md font-bold text-red-500"
                      >
                        <i className="fa-solid fa-times"></i> Account löschen
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="flex flex-row justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="text-primary-500 font-semibold text-[14px] border-b-[0.5px] border-blueGray-300"
            >
              <i className="fa-solid fa-add"></i> Benutzer hinzufügen
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyUserList;
