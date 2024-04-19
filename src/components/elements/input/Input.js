import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(
  (
    {
      border,
      isDisabled,
      size,
      leftIcon,
      rightIcon,
      backupRightIcon,
      type,
      showPassword,
      changeShowPasswordState,
      ...rest
    },
    ref
  ) => {
    const sizes = {
      sm: 'px-2 py-2 text-sm ',
      lg: 'px-3 py-3 text-sm ',
      regular: 'px-3 py-2 text-sm ',
    };
    const borders = {
      border: 'border-blueGray-300',
      borderless: 'border-transparent shadow',
    };
    let inputClasses =
      sizes[size] +
      ` w-full placeholder-blueGray-400 text-blueGray-700 relative ${
        isDisabled ? 'disabled bg-blueGray-100' : 'bg-white'
      } rounded-md border border-solid transition duration-200`;
    inputClasses = borders[border] + ' ' + inputClasses;
    let leftAddon = null;
    let rightAddon = null;
    let wrapperClasses = 'mb-3 pt-0';
    if (leftIcon) {
      inputClasses = inputClasses + ' pl-8 ';
      wrapperClasses = 'relative flex w-full flex-wrap items-stretch mb-3';
      leftAddon = (
        <span className="z-10 h-full flex absolute text-center text-blueGray-300 text-sm items-center w-8 pl-3">
          <i className={leftIcon}></i>
        </span>
      );
    }
    if (rightIcon) {
      inputClasses = inputClasses + ' pr-8 ';
      wrapperClasses = 'relative flex w-full flex-wrap items-stretch mb-3';
      rightAddon = (
        <span
          onClick={changeShowPasswordState}
          className="z-10 h-full flex absolute text-center text-primary-500 text-sm items-center w-8 right-0 cursor-pointer"
        >
          <i className={showPassword ? backupRightIcon : rightIcon}></i>
        </span>
      );
    }
    return (
      <>
        <div className={wrapperClasses} ref={ref}>
          {leftAddon}
          {type && type === 'textarea' ? (
            <textarea {...rest} type={type} className={inputClasses} />
          ) : (
            <input
              {...rest}
              type={type === 'password' && showPassword ? 'text' : type}
              className={inputClasses}
            />
          )}
          {rightAddon}
        </div>
      </>
    );
  }
);

Input.defaultProps = {
  border: 'border',
  size: 'regular',
  isDisabled: false,
  backupRightIcon: 'fas fa-eye-slash',
};

Input.propTypes = {
  border: PropTypes.oneOf(['border', 'borderless']),
  size: PropTypes.oneOf(['sm', 'lg', 'regular']),
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  isDisabled: PropTypes.bool,
  showPassword: PropTypes.bool,
  changeShowPasswordState: PropTypes.func,
  backupRightIcon: PropTypes.string,
};

export default Input;
