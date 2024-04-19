import React, { useEffect, useState } from 'react';
import Input from '../../../components/elements/input/Input';
import Button from '../../../components/elements/buttons/Button';
import { useChangePaswordMutation } from '../../../features/auth/userApiSlice';
import { useForm } from 'react-hook-form';
import ToastMessage from '../../../components/elements/toast/ToastMessage';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import {
  useShowResetPasswordFormQuery,
  useResetForgotPasswordMutation,
} from '../../../features/api/apiSlice';
import { Link, useLocation } from 'react-router-dom';
import PageNotFound from '../../404/PageNotFound';

const ResetPasswordPage = () => {
  const location = useLocation();
  const token = location.search.split('=')[1];
  const {
    data,
    isLoading: isResetLoading,
    isSuccess: isResetSuccess,
    isError: isResetError,
  } = useShowResetPasswordFormQuery(token);
  const [showPassword, setShowPassword] = useState({
    password: false,
    new_password: false,
    confirm_password: false,
  });
  const [changePasword, { isLoading, isSuccess, isError, error }] =
    useResetForgotPasswordMutation();
  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm();

  const passwordValue = watch('new_password');
  const confirmPasswordValue = watch('confirm_password');

  useEffect(() => {
    if (passwordValue !== confirmPasswordValue) {
      setError('confirm_password', {
        type: 'same',
        message: 'Das neue Passwort stimmt nicht überein!',
      });
    } else {
      clearErrors('confirm_password');
    }
  }, [passwordValue, confirmPasswordValue]);

  const changeShowPasswordState = (name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };

  const formRules = {
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
    data['token'] = token;
    changePasword(data);
  };

  return (
    <>
      {(isResetLoading || isLoading) && (
        <Page>
          <PageContent>
            <div
              className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                    border-[2px] border-dashed border-primary-500 border-t-transparent"
            ></div>
          </PageContent>
        </Page>
      )}

      {isSuccess && (
        <Page>
          <PageContent>
            <div className="w-8/12 flex flex-col mx-auto my-auto justify-center ">
              <p className="text-center text-xl text-primary-500 font-bold">
                <i className="fas fa-check-circle fa-xl mr-2"></i>
                Ihr Passwort wurde erfolgreich geändert. Sie können sich jetzt
                mit Ihrem neuen Passwort anmelden.
              </p>
              <Link
                to={'/login'}
                className="text-primary-500 font-bold text-lg text-center underline"
              >
                Einloggen <i className="fas fa-right-to-bracket mr-1" />
              </Link>
            </div>
          </PageContent>
        </Page>
      )}

      {isError && (
        <Page>
          <PageContent>
            <div className="w-8/12 mx-auto justify-center flex flex-col my-auto">
              <p className="text-center text-xl font-bold text-red-500">
                <i className="fas fa-exclamation-triangle fa-2x mr-2"></i>
                Etwas ist schief gelaufen
              </p>
              <Link
                to={'/'}
                className="text-primary-500 font-semibold text-lg text-center underline"
              >
                <i className="fas fa-arrow-circle-left mr-1" /> zurück zu
                Startseite
              </Link>
            </div>
          </PageContent>
        </Page>
      )}

      {isResetError && <PageNotFound />}

      {!isResetLoading && !isError && (
        <Page>
          <PageContent>
            <div className="min-h-full flex flex-1 place-items-center bg-radial-gradient">
              <div className="container mx-auto my-auto h-full flex md:flex-row flex-col justify-center">
                {isSuccess && (
                  <ToastMessage
                    title="Passwort zurückgesetzt"
                    description="Ihr Passwort wurde erfolgreich zurückgesetzt. Sie können sich jetzt mit Ihrem neuen Passwort anmelden."
                    type="success"
                  />
                )}
                {isError && (
                  <ToastMessage
                    title="Fehler"
                    description={error?.message}
                    type="error"
                  />
                )}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:w-6/12 flex flex-col justify-center rounded-lg shadow-lg md:p-8 p-4 bg-blueGray-100 gap-4"
                >
                  <h5 className="text-xl font-bold mb-4 border-b-[0.5px] border-blueGray-300 pb-2">
                    Passwort ändern
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
                          {...register(
                            'new_password',
                            formRules['new_password']
                          )}
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
                      <div className="w-full flex md:flex-row flex-col md:gap-0 gap-4 mx-auto justify-end">
                        <Button
                          {...{
                            type: 'submit',
                            children: 'Änderung speichern',
                          }}
                        />
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </PageContent>
        </Page>
      )}
    </>
  );
};

export default ResetPasswordPage;
