import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = React.forwardRef(({ label, color, name, ...rest }, ref) => {
  return (
    <>
      <label className="inline-flex items-center">
        <input
          name={name}
          ref={ref}
          {...rest}
          type="checkbox"
          className="form-checkbox ml-1 w-5 h-5 accent-primary-500 cursor-pointer"
        />
        {label ? (
          <span
            className="ml-2 text-sm font-semibold text-blueGray-500"
            dangerouslySetInnerHTML={{ __html: label }}
          />
        ) : null}
      </label>
    </>
  );
});

Checkbox.defaultProps = {
  color: 'primary',
};

Checkbox.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
};

export default Checkbox;
