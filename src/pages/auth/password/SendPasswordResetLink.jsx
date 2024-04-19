import React from 'react';
import Page from '../../../anatomy/Page';
import PageContent from '../../../components/containers/PageContent';
import Input from '../../../components/elements/input/Input';
import Button from '../../../components/elements/buttons/Button';
import { useForgotPasswordMutation } from '../../../features/api/apiSlice';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  formInputs,
  formRules,
} from '../../../components/sections/forms/utilities';

export default function SendPasswordResetLink() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [forgotPassword, { isLoading, isSuccess, isError, error }] =
    useForgotPasswordMutation();
  const resetPasswordBtnProps = {
    extraStyle: 'w-full',
    type: 'submit',
    children: 'Password zurücksetzen',
  };
  const resetPasswordInputProps = {
    leftIcon: 'fas fa-envelope',
    name: 'reset',
    type: 'email',
    className: 'w-8/12',
    placeholder: 'Email Adresse',
  };

  const onSubmit = (data) => {
    forgotPassword(data);
  };
  return (
    <>
      <Page>
        <PageContent>
          <div className="min-h-full flex flex-1 place-items-center bg-radial-gradient">
            <div className="container mx-auto my-auto h-full flex md:flex-row flex-col justify-center">
              {isLoading && (
                <div className="w-full h-full text-center pt-8">
                  <div
                    className="w-12 h-12 mx-auto my-auto rounded-full animate-spin
                          border-[2px] border-dashed border-primary-500 border-t-transparent"
                  ></div>
                </div>
              )}
              {isSuccess && (
                <div className="w-8/12 flex flex-col justify-center ">
                  <p className="text-center text-xl text-primary-500 font-bold">
                    <i className="fas fa-envelope fa-2xl mr-2"></i>
                    Wir haben dir einen Link zum Zurücksetzen deines Passworts
                    an deine E-Mail-Adresse gesendet. Bitte überprüfe deine
                    Emails
                  </p>
                  <Link
                    to={'/'}
                    className="text-primary-500 font-semibold text-lg text-center underline"
                  >
                    <i className="fas fa-arrow-circle-left mr-1" /> zurück zu
                    Startseite
                  </Link>
                </div>
              )}
              {isError && (
                <div className="w-8/12 mx-auto justify-center flex flex-col">
                  <p className="text-center text-2xl font-bold text-red-500">
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
              )}
              {!isLoading && !isSuccess && !isError && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="md:w-8/12 w-11/12 mx-auto mt-8 flex flex-col rounded-lg shadow-lg md:p-8 p-4 bg-blueGray-100 gap-8 justify-center "
                >
                  <h5 className="text-2xl font-bold mb-4 border-b-[0.5px] border-blueGray-300 pb-2">
                    Passwort zurücksetzen
                  </h5>
                  <div className="w-8/12 mx-auto justify-center">
                    <Input
                      {...register('email', formRules['email'])}
                      {...formInputs['email']}
                    />
                    {errors['email'] && (
                      <p
                        role="alert"
                        className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
                      >
                        *{errors['email'].message}
                      </p>
                    )}
                  </div>
                  <div className="w-8/12 mx-auto justify-center">
                    <Button {...resetPasswordBtnProps} />
                  </div>
                </form>
              )}
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
}
