import React from 'react';
import PropTypes from 'prop-types';
import Styles from './InputText.module.css';

const InputText = ({ input, handleSubmit, ...rest }) => (
  <div>
    <input
      {...input}
      {...rest}
      onChange={event => {
        input.onChange(event.currentTarget.value);
        handleSubmit();
      }}
      className={Styles.input}
    />
  </div>
);

InputText.propTypes = {
  input: PropTypes.object,
  handleSubmit: PropTypes.func,
  rest: PropTypes.object,
};

export default InputText;
