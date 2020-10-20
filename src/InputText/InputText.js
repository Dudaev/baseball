import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ input, handleSubmit, ...rest }) => (
  <div>
    <input
      {...input}
      {...rest}
      onChange={event => {
        input.onChange(event.currentTarget.value);
        handleSubmit();
      }}
    />
  </div>
);

InputText.propTypes = {
  input: PropTypes.object,
  handleSubmit: PropTypes.func,
  rest: PropTypes.object,
};

export default InputText;