import Select from 'react-select';
import React from 'react';
import PropTypes from 'prop-types';
import ErrorWithDelay from '../ErrorWithDelay';
import Styles from './ReactSelect.module.css';

const ReactSelectProfile = ({ input, handleSubmit, setProfilesСount, ...rest }) => {
  const { options } = rest;
  return (
    <div className={Styles.inputWrapper}>
      <Select
        className={Styles.input}
        {...input}
        {...rest}
        value={options.find(option => option.value === input.value)}
        isSearchable={false}
        onChange={option => {
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(option.value)) {
            input.onChange(option.value);
          } else {
            input.onChange(+option.value);
          }
          if (input.name === 'profilesСount') setProfilesСount(+option.value);
        }}
      />
      <div className={Styles.error}>
        <ErrorWithDelay name={input.name} delay={1000}>
          {error => <span>{error}</span>}
        </ErrorWithDelay>
      </div>
    </div>
  );
};

ReactSelectProfile.propTypes = {
  input: PropTypes.object,
  handleSubmit: PropTypes.func,
  setProfilesСount: PropTypes.func,
  rest: PropTypes.object,
};

export default ReactSelectProfile;
