/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import Select from 'react-select';
import mutationUpdateProfile from './requests/mutationUpdateProfile';
import queryCurrentProfile from './requests/queryCurrentProfile';
import queryBattingSummary from './requests/queryBattingSummary';
import queryFacilities from './requests/queryFacilities';
import queryLeaderBoard from './requests/queryLeaderBoard';
import queryNotifications from './requests/queryNotifications';
import queryProfile from './requests/queryProfile';
import queryProfileEvents from './requests/queryProfileEvents';
import querySchools from './requests/querySchools';
import queryTeams from './requests/queryTeams';
import ErrorWithDelay from '../ErrorWithDelay';

// const ReactSelectAdapter = ({ input, ...rest }) => {
//   const { options } = rest;
//   return (
//     <div>
//       <Select
//         {...input}
//         onChange={selectedOptions => {
//           if (!selectedOptions) {
//             input.onChange(null);
//             return;
//           }
//           console.log('selectedOptions', selectedOptions);
//           input.onChange(selectedOptions.map(option => option.value));
//         }}
//         value={options.filter(option => input.value && input.value.includes(option.value))}
//         {...rest}
//         isMulti
//       />
//     </div>
//   );
// };
const ReactSelectMultiObj = ({ input, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        onChange={selectedOptions => {
          // if (!selectedOptions) {
          //   input.onChange(null);
          //   return;
          // }
          // console.log('selectedOptions', selectedOptions);

          input.onChange(selectedOptions.map(option => option.value));
        }}
        value={options.filter(option => input.value && input.value.find(item => item.id === option.value.id))}
        {...rest}
        isMulti
      />
    </div>
  );
};

const ReactSelect = ({ input, name, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        {...rest}
        onChange={option => input.onChange(option.value)}
        value={options.find(option => option.value === input.value)}
        isSearchable={false}
      />
      <ErrorWithDelay name={input.name} delay={1000}>
        {error => <span>{error}</span>}
      </ErrorWithDelay>
    </div>
  );
};
const InputNum = ({ input, placeholder }) => (
  <div>
    <input
      {...input}
      type="text"
      placeholder={placeholder}
      onChange={event => {
        console.log(input);
        return input.onChange(+event.currentTarget.value);
      }}
    />
    <ErrorWithDelay name={input.name} delay={1000}>
      {error => <span>{error}</span>}
    </ErrorWithDelay>
  </div>
);

const ReactSelectObj = ({ input, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        {...rest}
        onChange={option => input.onChange(option.value)}
        value={options.find(option => option.value.id === input.value.id)}
        isSearchable={false}
      />
    </div>
  );
};

function Profile() {
  useEffect(() => {
    queryCurrentProfile(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    queryLeaderBoard(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    queryNotifications(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    querySchools(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
    queryTeams(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
    queryFacilities(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    queryProfile(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
    queryProfileEvents(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    queryBattingSummary(localStorage.accessToken, localStorage.client, localStorage.uid);
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <Form
        onSubmit={formObj => {
          console.log('formObj', formObj);
          mutationUpdateProfile(localStorage.accessToken, localStorage.client, localStorage.uid, formObj).catch(error =>
            console.error(error),
          );
        }}
        validate={values => {
          const errors = {};
          if (!values.first_name) {
            errors.first_name = 'First Name Required';
          }
          if (!values.last_name) {
            errors.last_name = 'Last Name Required';
          }
          if (!values.position2) {
            errors.position2 = 'Position Required';
          }
          if (!values.age) {
            errors.age = 'Age Required';
          }
          if (!values.feet) {
            errors.feet = 'Feet Required';
          }
          if (!values.weight) {
            errors.weight = 'Weight Required';
          }
          if (!values.throws_hand) {
            errors.throws_hand = 'Throws Required';
          }
          if (!values.bats_hand) {
            errors.bats_hand = 'Bats Required';
          }
          // {form: "Fill out the required fields"}
          {
            console.log(`errors`);
            console.log(errors);
          }
          return errors;
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="first_name">
              {({ input }) => (
                <div>
                  <input placeholder="firstName *" type="text" {...input} />
                  <ErrorWithDelay name="first_name" delay={1000}>
                    {error => <span>{error}</span>}
                  </ErrorWithDelay>
                </div>
              )}
            </Field>
            <Field name="last_name">
              {({ input }) => (
                <div>
                  <input placeholder="lastName *" type="text" {...input} />
                  <ErrorWithDelay name="last_name" delay={1000}>
                    {error => <span>{error}</span>}
                  </ErrorWithDelay>
                </div>
              )}
            </Field>
            <Field
              name="position2"
              component={ReactSelect}
              placeholder="Position in Game *"
              options={[
                {
                  value: 'catcher',
                  label: 'Catcher',
                },
                {
                  value: 'first_base',
                  label: 'First Base',
                },
                {
                  value: 'second_base',
                  label: 'Second Base',
                },
                {
                  value: 'shortstop',
                  label: 'Shortstop',
                },
                {
                  value: 'third_base',
                  label: 'Third Base',
                },
                {
                  value: 'outfield',
                  label: 'Outfield',
                },
                {
                  value: 'pitcher',
                  label: 'Pitcher',
                },
              ]}
            ></Field>
            <Field
              name="position"
              component={ReactSelect}
              placeholder="Secondary Position in Game *"
              options={[
                {
                  value: '',
                  label: '-',
                },
                {
                  value: 'catcher',
                  label: 'Catcher',
                },
                {
                  value: 'first_base',
                  label: 'First Base',
                },
                {
                  value: 'second_base',
                  label: 'Second Base',
                },
                {
                  value: 'shortstop',
                  label: 'Shortstop',
                },
                {
                  value: 'third_base',
                  label: 'Third Base',
                },
                {
                  value: 'outfield',
                  label: 'Outfield',
                },
                {
                  value: 'pitcher',
                  label: 'Pitcher',
                },
              ]}
            ></Field>
            <div>
              <label>Personal Info</label>
              {/* <Field name="firstName">
                {({ input }) => (
                  <div>
                    <label>test</label>
                    <input
                      {...input}
                      type="text"
                      placeholder="test"
                      onChange={event => {
                        input.onChange(+event.currentTarget.value);
                      }}
                    />
                  </div>
                )}
              </Field> */}
              <Field name="age" component={InputNum} placeholder="Age *" />
              <Field name="feet" component={InputNum} placeholder="Feet *" />
              <Field name="inches" component={InputNum} placeholder="Inches" />
              <Field name="weight" component={InputNum} placeholder="Weight *" />
              <Field
                name="throws_hand"
                component={ReactSelect}
                placeholder="Throws *"
                options={[
                  {
                    value: 'r',
                    label: 'R',
                  },
                  {
                    value: 'l',
                    label: 'L',
                  },
                ]}
              ></Field>
              <Field
                name="bats_hand"
                component={ReactSelect}
                placeholder="Bats *"
                options={[
                  {
                    value: 'r',
                    label: 'R',
                  },
                  {
                    value: 'l',
                    label: 'L',
                  },
                ]}
              ></Field>
            </div>
            <div>
              <label>School</label>
              <Field
                name="school"
                component={ReactSelectObj}
                placeholder="School"
                options={[
                  {
                    value: { id: '2', name: 'FSU' },
                    label: 'FSU',
                  },
                  {
                    value: { id: '3', name: 'Rockledge' },
                    label: 'Rockledge',
                  },
                  {
                    value: { id: '4', name: 'Good' },
                    label: 'Good',
                  },
                  {
                    value: { id: '5', name: 'asq3t' },
                    label: 'asq3t',
                  },
                  {
                    value: { id: '6', name: 'fxytdc' },
                    label: 'fxytdc',
                  },
                ]}
              />
            </div>
            <div>
              <label>School Year</label>
              <Field
                name="school_year"
                component={ReactSelect}
                placeholder="School Year"
                options={[
                  {
                    value: { id: '2', name: 'FSU' },
                    label: 'Freshman',
                  },
                  {
                    value: 'Sophomore',
                    label: 'Sophomore',
                  },
                  {
                    value: 'Junior',
                    label: 'Junior',
                  },
                  {
                    value: 'Senior',
                    label: 'Senior',
                  },
                  {
                    value: 'None',
                    label: 'None',
                  },
                ]}
              />
            </div>
            <div>
              <label>Team</label>
              <Field
                name="teams"
                component={ReactSelectMultiObj}
                placeholder="Team"
                options={[
                  {
                    value: { id: '6', name: 'Scorps' },
                    label: 'Scorps',
                  },
                  {
                    value: { id: '8', name: 'Good Team' },
                    label: 'Good Team',
                  },
                  {
                    value: { id: '7', name: 'FTB' },
                    label: 'FTB',
                  },
                  {
                    value: { id: '9', name: 'uigi' },
                    label: 'uigi',
                  },
                  {
                    value: { id: '10', name: 'ashas' },
                    label: 'ashas',
                  },
                ]}
              />
            </div>
            <div>
              <label>Facility</label>
              <div>
                <Field
                  name="facilities"
                  component={ReactSelectMultiObj}
                  placeholder="Facility"
                  options={[
                    {
                      value: { id: '32', u_name: 'Example' },
                      label: 'Example',
                    },
                  ]}
                />
              </div>
              <div>
                <label>About</label>
                <Field name="biography" component="textarea" placeholder="Describe yourself in a few words" />
              </div>
            </div>
            <ErrorWithDelay name="form" delay={1000}>
              {error => <span>{error}</span>}
            </ErrorWithDelay>
            <button type="submit">Sing in</button>
          </form>
        )}
      </Form>
    </>
  );
}

export default Profile;
