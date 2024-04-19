import React, { useState, useEffect } from 'react';
import Input from '../../elements/input/Input';
import Button from '../../elements/buttons/Button';
import {
  useChangePaswordMutation,
  useDeactivateUserAccountMutation,
} from '../../../features/auth/userApiSlice';
import { useForm } from 'react-hook-form';
import ToastMessage from '../../elements/toast/ToastMessage';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    new_password: false,
    confirm_password: false,
  });
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [changePasword, { isLoading, isSuccess, isError, error }] =
    useChangePaswordMutation();
  const [
    deactivateUserAccount,
    { isLoading: isDeactivateLoading, isSuccess: isDeactivateSuccess },
  ] = useDeactivateUserAccountMutation();
  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (isDeactivateSuccess) {
      dispatch(logout());
    }
  }, [isDeactivateSuccess]);

  const passwordValue = watch('new_password');
  const confirmPasswordValue = watch('confirm_password');

  const changeShowPasswordState = (name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };

  const formRules = {
    password: {
      required: {
        value: true,
        message: 'Bitte aktuellen Passwort eingeben',
      },
      minLength: {
        value: 8,
        message: 'Das Passwort muss mindestens 8 Zeichen beinhalten',
      },
    },
    new_password: {
      required: {
        value: true,
        message: 'Bitte neuen Passwort eingeben',
      },
      minLength: {
        value: 8,
        message: 'Das Passwort muss mindestens 8 Zeichen beinhalten',
      },
    },
    confirm_password: {
      required: {
        value: true,
        message: 'Bitte Passwort bestätigen',
      },
    },
  };

  const onSubmit = (data) => {
    let hasError = false;
    if (confirmPasswordValue !== '' && passwordValue !== confirmPasswordValue) {
      setError('confirm_password', {
        type: 'same',
        message: 'Das neue Passwort stimmt nicht überein!',
      });
      hasError = true;
    } else {
      clearErrors('confirm_password');
      hasError = false;
    }
    if (!hasError) {
      changePasword(data);
    }
  };

  const RenderModal = () => {
    return (
      <>
        {showModal && (
          <>
            <div className="justify-center opacity-85 flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-auto md:w-6/12 w-full p-4">
                <div className="border-0 shadow-lg rounded-lg relative flex flex-col place-self-center w-full bg-white outline-none focus:outline-none px-6 py-2 pb-6  bg-gradient-to-r from-red-700 to-red-600 text-white">
                  <div className="w-full flex flew-row justify-between mb-2 mt-2">
                    <h5 className="font-semibold pb-2">{'Account löschen'}</h5>
                    <button
                      className="font-semibold -mt-1"
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-times"></i> Schliessen
                    </button>
                  </div>
                  <div className="w-full h-full text-center pt-4 pb-4">
                    <h2 className="font-bold text-xl">
                      Wollen Sie wirklich Ihren Account löschen? <br />
                    </h2>
                  </div>
                  <div className="w-full text-right">
                    <button
                      type="button"
                      onClick={deactivateUserAccount}
                      className="bg-white rounded-full px-6 mt-8 py-2 text-red-500 font-semibold text-[14px] mr-0 ml-auto"
                    >
                      <i className="fa-solid fa-trash"></i> Ja, Löschen
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black blur-md"></div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <ToastMessage
        isSuccess={isSuccess}
        isError={isError}
        successMessage="Ihr passwort wurde erfolgreich geändert"
      />
      <div className="w-full flex flex-row justify-center mt-10">
        <RenderModal />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-11/12 flex flex-col justify-center rounded-lg shadow-lg md:p-8 p-4 bg-blueGray-100 gap-4"
        >
          <h5 className="text-xl font-bold mb-4 border-b-[0.5px] border-blueGray-300 pb-2">
            Passwort ändern oder Account löschen
          </h5>
          {isLoading && (
            <div
              className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                    border-[2px] border-dashed border-primary-500 border-t-transparent"
            ></div>
          )}
          {!isLoading && (
            <>
              <div className="md:w-8/12 w-10/12 mx-auto justify-center">
                <Input
                  showPassword={showPassword['password']}
                  changeShowPasswordState={() =>
                    changeShowPasswordState('password')
                  }
                  {...{
                    leftIcon: 'fas fa-lock',
                    name: 'password',
                    type: 'password',
                    placeholder: 'Aktuelles passwort',
                    rightIcon: 'fas fa-eye',
                  }}
                  {...register('password', formRules['password'])}
                />
                {errors['password'] && (
                  <p
                    role="alert"
                    className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
                  >
                    *{errors['password'].message}
                  </p>
                )}
                {isError && (
                  <p
                    role="alert"
                    className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
                  >
                    *{error?.data?.errors?.password || ''}
                  </p>
                )}
              </div>
              <div className="md:w-8/12 w-10/12 mx-auto justify-center">
                <Input
                  showPassword={showPassword['new_password']}
                  changeShowPasswordState={() =>
                    changeShowPasswordState('new_password')
                  }
                  {...{
                    leftIcon: 'fas fa-lock',
                    name: 'new_password',
                    type: 'password',
                    placeholder: 'Neuer Passwort',
                    rightIcon: 'fas fa-eye',
                  }}
                  {...register('new_password', formRules['new_password'])}
                />
                {errors['new_password'] && (
                  <p
                    role="alert"
                    className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
                  >
                    *{errors['new_password'].message}
                  </p>
                )}
              </div>
              <div className="md:w-8/12 w-10/12 mx-auto justify-center">
                <Input
                  showPassword={showPassword['confirm_password']}
                  changeShowPasswordState={() =>
                    changeShowPasswordState('confirm_password')
                  }
                  {...{
                    leftIcon: 'fas fa-lock',
                    name: 'confirm_password',
                    type: 'password',
                    placeholder: 'Neuen Passwort bestätigen',
                    rightIcon: 'fas fa-eye',
                  }}
                  {...register(
                    'confirm_password',
                    formRules['confirm_password']
                  )}
                />
                {errors['confirm_password'] && (
                  <p
                    role="alert"
                    className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
                  >
                    *{errors['confirm_password'].message}
                  </p>
                )}
              </div>
              <div className="w-full flex md:flex-row flex-col md:gap-0 gap-4 mx-auto justify-between">
                <a
                  onClick={() => setShowModal(true)}
                  className="text-md font-bold text-red-500 cursor-pointer"
                >
                  <i className="fa-solid fa-times"></i> Account löschen
                </a>
                <Button
                  {...{ type: 'submit', children: 'Änderung speichern' }}
                />
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ChangePasswordForm;
