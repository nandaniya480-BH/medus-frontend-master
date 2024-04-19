import React, { useState, useEffect } from 'react';
import Input from '../../elements/input/Input';
import Button from '../../elements/buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { register as userRegister } from '../../../features/auth/authAction';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../elements/input/Checkbox';
import { useForm } from 'react-hook-form';
import { formInputs, formRules } from './utilities';
import { useCreateEmployerAccountMutation } from '../../../features/auth/companyApiSlice';

function Register({
  userRole = 'employee',
  isInitialRegisterForm = true,
  submitButtonLabel = ' Registrieren',
  setShowModal,
  isMainRegisterForm = true,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [addEmployerAccount, { isLoading, isSuccess }] =
    useCreateEmployerAccountMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm({
    defaultValues: {
      role: userRole,
    },
  });
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirm_password');

  // useEffect(() => {
  //   if (confirmPasswordValue !== '' && passwordValue !== confirmPasswordValue) {
  //     setError('confirm_password', {
  //       type: 'same',
  //       message: 'Das neue Passwort stimmt nicht überein!',
  //     });
  //   } else {
  //     clearErrors('confirm_password');
  //   }
  // }, [passwordValue, confirmPasswordValue]);

  const { userToken, role, error, loading } = useSelector(
    (state) => state.auth
  );

  const changeShowPasswordState = () => {
    setShowPassword(!showPassword);
  };

  const changeConfirmShowPasswordState = () => {
    setConfirmShowPassword(!showConfirmPassword);
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
      if (isMainRegisterForm) {
        dispatch(userRegister(data));
      } else {
        addEmployerAccount(data);
      }
    }
  };

  useEffect(() => {
    if (userToken && isInitialRegisterForm) {
      if (role === 'employee') {
        navigate('/user/profile');
      } else if (role === 'employeradmin') {
        navigate('/company/profile');
      }
    }
  }, [navigate, userToken]);

  return (
    <>
      {(loading || isLoading) && (
        <div className="w-full py-10 flex flex-col">
          <div className="mx-auto my-auto flex flex-col items-center container gap-4">
            <div
              className="w-12 h-12 rounded-full animate-spin
                      border-[2px] border-dashed border-primary-500 border-t-transparent"
            ></div>
            <span className="font-semibold text-sm">wird geladen...</span>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="w-full h-full text-center pt-2">
          <span className="text-primary-500 font-semibold text-lg">
            <i className="fa-solid fa-circle-check" /> Account erfolgreich
            erstellt!
          </span>{' '}
          <br />
          <span className="text-primary-500 font-semibold text-sm">
            Bitte das Fenster{' '}
            <button className="underline" onClick={() => setShowModal(false)}>
              Schliessen
            </button>
          </span>
        </div>
      )}
      {!loading && !isLoading && !isSuccess && (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {error &&
            error?.errors?.email?.map((item) => (
              <p
                key={item?.de}
                className="font-semibold text-red-500 text-sm mb-2"
              >
                <i className="fas fa-times-circle" /> {item?.de}
              </p>
            ))}
          {userRole === 'employee' && (
            <>
              <Input
                {...register('first_name', formRules['first_name'])}
                {...formInputs['first_name']}
              />
              {errors['first_name'] && (
                <p
                  role="alert"
                  className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
                >
                  *{errors['first_name'].message}
                </p>
              )}
              <div className="h1 my-2" />

              <Input
                {...register('last_name', formRules['last_name'])}
                {...formInputs['last_name']}
              />
              {errors['last_name'] && (
                <p
                  role="alert"
                  className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
                >
                  *{errors['last_name'].message}
                </p>
              )}
              <div className="h1 my-2" />
            </>
          )}

          {userRole === 'employeradmin' && (
            <>
              <Input
                {...register('name', formRules['name'])}
                {...formInputs['name']}
              />
              {errors['name'] && (
                <p
                  role="alert"
                  className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
                >
                  *{errors['name'].message}
                </p>
              )}
              <div className="h1 my-2" />
            </>
          )}

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
          <div className="h1 my-2" />

          <Input
            showPassword={showPassword}
            changeShowPasswordState={changeShowPasswordState}
            {...register('password', formRules['password'])}
            {...formInputs['password']}
          />
          {errors['password'] && (
            <p
              role="alert"
              className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
            >
              *{errors['password'].message}
            </p>
          )}
          <div className="h1 my-2" />

          <Input
            showPassword={showConfirmPassword}
            changeShowPasswordState={changeConfirmShowPasswordState}
            {...register('confirm_password', formRules['confirm_password'])}
            {...formInputs['confirm_password']}
          />
          {errors['confirm_password'] && (
            <p
              role="alert"
              className="w-full text-left text-red-500 text-xs font-semibold -mt-2"
            >
              *{errors['confirm_password'].message}
            </p>
          )}

          <div className="text-left">
            <Checkbox
              className="text-left"
              name="agb"
              label="Ich bin mit den <a href='agb' class='text-primary-500'>AGB's</a> und der <a href='agb' class='text-primary-500'>Datenschutzerklärung</a> einverstanden"
              {...register('agb', {
                required:
                  "Bitte AGB's und die Datenschutzerklärungen akzeptieren",
              })}
            />
            {errors['agb'] && (
              <p
                role="alert"
                className="w-full text-left text-red-500 text-xs font-semibold"
              >
                *{errors['agb'].message}
              </p>
            )}
          </div>
          <div className="mt-5">
            <Button
              type="submit"
              {...{ children: submitButtonLabel, color: 'primary', size: 'lg' }}
            />
          </div>
        </form>
      )}
    </>
  );
}

export default Register;
