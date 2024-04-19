import React from 'react';
import PropTypes from 'prop-types';

const Button = React.forwardRef(
  (
    {
      outline,
      isSpecial,
      size,
      roundedSize,
      color,
      extraStyle,
      children,
      fullWidth,
      ...rest
    },
    ref
  ) => {
    const sizes = {
      sm: 'text-xs px-3 py-2 shadow hover:shadow-md rounded-full ',
      regular: 'text-sm px-6 py-2 shadow hover:shadow-lg rounded-full ',
      lg: 'text-sm px-6 py-3 shadow-md hover:shadow-lg rounded-full ',
    };
    const roundedSizes = {
      md: 'rounded-md ',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };
    const colors = {
      dark: 'text-white bg-slate-800 border-none active:bg-slate-600 active:border-slate-600',
      'dark-outline':
        'text-slate-500 border-slate-500 active:bg-slate-600 active:border-slate-600 active:text-white',
      primary:
        'text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none',
      'primary-outline':
        'text-primary-500 border-primary-500 active:bg-white-600 active:border-primary-600',
      'primary-special':
        'bg-white text-primary-500 hover:bg-gradient-to-r hover:from-primary-200 hover:to-primary-regular hover:text-white border-none rounded-md shadow-none hover:shadow-none',
    };
    let className =
      'inline-block outline-none focus:outline-none align-middle border border-solid font-bold last:mr-0 mr-2 ';
    className =
      className +
      ' ' +
      colors[
        color + (outline ? '-outline' : '') + (isSpecial ? '-special' : '')
      ];
    className = className + ' ' + sizes[size];
    className = className + ' ' + roundedSizes[roundedSize];
    className = className + ' ' + extraStyle;
    if (fullWidth) {
      className = className + ' w-full';
    }
    return rest.hasOwnProperty('href') ? (
      <a {...rest} ref={ref} className={className}>
        {children}
      </a>
    ) : (
      <button {...rest} ref={ref} className={className}>
        {children}
      </button>
    );
  }
);
Button.defaultProps = {
  outline: false,
  isSpecial: false,
  color: 'primary',
  extraStyle: '',
  fullWidth: false,
  size: 'regular',
  roundedSize: 'full',
};
Button.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg', 'regular']),
  outline: PropTypes.bool,
  isSpecial: PropTypes.bool,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  color: PropTypes.oneOf(['dark', 'primary']),
  extraStyle: PropTypes.string,
  roundedSize: PropTypes.oneOf(['sm', 'lg', 'full', '']),
};

export default Button;
