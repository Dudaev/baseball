/* eslint-disable react/prop-types */
import Select from 'react-select';
import React from 'react';
import ErrorWithDelay from '../ErrorWithDelay';
import Styles from './ReactSelect.module.css';

const ReactSelect = ({ input, name, handleSubmit, setProfilesСount, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        {...rest}
        value={options.find(option => option.value === input.value)}
        isSearchable={false}
        onChange={option => {
          if (isNaN(option.value)) {
            input.onChange(option.value);
          } else {
            input.onChange(+option.value);
          }

          console.log(option);
          handleSubmit();
          if (input.name === 'profilesСount') setProfilesСount(+option.value);
          handleSubmit();
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

// const ReactSelect = ({ input, name, ...rest }) => {
//   const { options } = rest;
//   return (
//     <div>
//       <Select
//         {...input}
//         {...rest}
//         value={options.find(option => option.value === input.value)}
//         isSearchable={false}
//         onChange={option => {
//           // eslint-disable-next-line no-restricted-globals
//           if (isNaN(option.value)) {
//             input.onChange(option.value);
//           } else {
//             input.onChange(+option.value);
//           }

//           console.log(option);
//           submit();
//           if (input.name === 'profilesСount') setProfilesСount(+option.value);
//         }}
//       />
//     </div>
//   );
// };

export default ReactSelect;
