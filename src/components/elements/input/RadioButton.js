import React from 'react';
import PropTypes from 'prop-types';

export default function RadioButton({ label, color, ...rest }) {
  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          {...rest}
          type="radio"
          className="form-radio appearance-none ml-1 w-5 h-5 ease-linear transition-all duration-150 border border-primary-400 rounded-full checked:bg-primary-800 checked:border-primary-800 focus:border-primary-400"
        />
        {label ? (
          <span className={'ml-2 text-sm font-semibold text-' + color + '-700'}>
            {label}
          </span>
        ) : null}
      </label>
    </>
  );
}

RadioButton.defaultProps = {
  color: 'primary',
};
// you can also pass additional props
// such as defaultValue, value, onChange, onClick etc.
RadioButton.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
};
