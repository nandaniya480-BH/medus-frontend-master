import React, { useState } from 'react';
import CompanyUserList from './CompanyUserList';
import ChangePasswordForm from '../forms/ChangePassword';
import Register from '../forms/Register';
import { useDeletEmployerAccountMutation } from '../../../features/auth/companyApiSlice';
import { useSelector } from 'react-redux';
import ToastMessage from '../../elements/toast/ToastMessage';

const MyAccountCompanySection = ({ categoryType }) => {
  const { role } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    id: null,
  });
  const [deleteEmployerAccount, { isSuccess, isError }] =
    useDeletEmployerAccountMutation();

  const RenderAddUserModal = () => {
    return (
      <>
        <div className="justify-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-auto md:w-8/12 w-full p-4">
            <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-gray-100 outline-none focus:outline-none px-6 py-2 pb-6">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className="font-semibold pb-2">Benutzer hinzufügen</h5>
                <button
                  className="font-semibold text-red-500 -mt-1"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              <div className="w-10/12 mx-auto flex flex-col gap-4 text-blueGray-700">
                <h2 className="font-bold text-2xl text-center">
                  User erstellen
                </h2>
                <Register
                  userRole="employer"
                  isInitialRegisterForm={false}
                  submitButtonLabel=" User erstellen"
                  setShowModal={setShowModal}
                  isMainRegisterForm={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-30 fixed inset-0 z-40 bg-black blur-md"></div>
      </>
    );
  };

  const RenderDeleteUserModal = () => {
    return (
      <>
        <div className="justify-center opacity-95 flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-auto md:w-8/12 w-full p-4">
            <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-white outline-none focus:outline-none px-6 py-2 pb-6  bg-gradient-to-r from-red-700 to-red-600 text-white">
              <div className="w-full flex flew-row justify-between mb-2 mt-2">
                <h5 className="font-semibold text-red-500 pb-2">
                  {'Account Löschen'}
                </h5>
                <button
                  className="font-semibold -mt-1"
                  onClick={() => setShowDeleteModal({ show: false, id: null })}
                >
                  <i className="fa-solid fa-times"></i> Schliessen
                </button>
              </div>
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <h5 className="font-bold text-xl">
                  Wollen Sie wirklich den von Ihnen gewählten Account löschen ?
                </h5>
                <button
                  onClick={() => {
                    deleteEmployerAccount(showDeleteModal.id);
                    setShowDeleteModal({ show: false, id: null });
                  }}
                  className="bg-white rounded-full px-6 py-2 text-red-500 font-semibold text-[14px] place-self-end"
                >
                  <i className="fa-solid fa-trash"></i> Ja, Löschen
                </button>
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
      <ToastMessage
        isSuccess={isSuccess}
        isError={isError}
        successMessage="Account erfolgreich gelöscht!"
      />
      {showModal && role === 'employeradmin' && <RenderAddUserModal />}
      {showDeleteModal.show && role === 'employeradmin' && (
        <RenderDeleteUserModal />
      )}
      <div className="flex md:flex-row flex-col justify-start">
        <h2
          dangerouslySetInnerHTML={{ __html: categoryType }}
          className="text-2xl font-bold mb-4 border-b-[0.5px] text-left border-blueGray-300 pb-2"
        />
      </div>
      <div className="w-full flex flex-col items-center mt-10 gap-8">
        {role === 'employeradmin' && (
          <div className="w-full flex flex-col justify-center">
            <div className="w-full text-center">
              <h5 className="text-2xl font-bold mb-4 pb-2 text-blueGray-700">
                <i className="fa-solid fa-users"></i> Benutzerliste
              </h5>
            </div>
            <div className="md:w-11/12 w-full mx-auto">
              <CompanyUserList
                userList={{}}
                setShowModal={setShowModal}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
          </div>
        )}

        <ChangePasswordForm />
      </div>
    </>
  );
};

export default MyAccountCompanySection;
