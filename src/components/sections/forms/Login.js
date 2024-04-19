import React, { useState, useEffect } from 'react';
import Input from '../../elements/input/Input';
import Button from '../../elements/buttons/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { formInputs, formRules } from './utilities';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken, role, error, loading } = useSelector(
    (state) => state.auth
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const changeShowPasswordState = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (userToken) {
      role === 'employee' && navigate('/user/profile');
      (role === 'employeradmin' || role === 'employer') &&
        navigate('/company/profile');
    }
  }, [navigate, userToken]);

  return (
    <>
      {loading && (
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
      {!loading && (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <p className="font-semibold text-red-500 text-sm mb-2">
              <i className="fas fa-times-circle" /> {error?.errors?.error}
            </p>
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
          <Link
            className="text-sm left-0 text-primary-500 font-semibold mt-4"
            to={'/forgot-password'}
          >
            Password vergessen ?
          </Link>
          <div className="mt-5">
            <Button
              type="submit"
              {...{ children: 'Einloggen', color: 'primary', size: 'lg' }}
            />
          </div>
        </form>
      )}
    </>
  );
}

export default Login;
