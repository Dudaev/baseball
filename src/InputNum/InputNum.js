import React from 'react';
import PropTypes from 'prop-types';

const InputNum = ({ input, handleSubmit, ...rest }) => (
  <div>
    <input
      {...input}
      {...rest}
      onChange={event => {
        if (event.currentTarget.value === '') {
          input.onChange(event.currentTarget.value);
        } else input.onChange(+event.currentTarget.value);
        handleSubmit();
      }}
    />
  </div>
);

InputNum.propTypes = {
  input: PropTypes.object,
  handleSubmit: PropTypes.func,
  rest: PropTypes.object,
};

export default InputNum;
