/* eslint-disable react/prop-types */
import Select from 'react-select';
import React from 'react';
import ErrorWithDelay from '../ErrorWithDelay';
import Styles from './ReactSelect.module.css';

const ReactSelect = ({ input, name, handleSubmit, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        {...rest}
        onChange={option => {
          input.onChange(option.value);
          handleSubmit();
        }}
        value={options.find(option => option.value === input.value)}
        isSearchable={false}
      />

      <div className={Styles.error}>
        <ErrorWithDelay name={input.name} delay={1000}>
          {error => <span>{error}</span>}
        </ErrorWithDelay>
      </div>
    </div>
  );
};

export default ReactSelect;
