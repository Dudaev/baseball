/* eslint-disable react/prop-types */
import React from 'react';

const InputText = ({ input, name, handleSubmit, ...rest }) => (
  <div>
    <input
      {...input}
      {...rest}
      onChange={event => {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(event.currentTarget.value) || event.currentTarget.value === '') {
          input.onChange(event.currentTarget.value);
        } else {
          input.onChange(+event.currentTarget.value);
        }

        handleSubmit();
      }}
    />
  </div>
);

export default InputText;
