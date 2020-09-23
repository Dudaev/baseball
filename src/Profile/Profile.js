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

const ReactSelectAdapter = ({ input, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        onChange={selectedOptions => {
          if (!selectedOptions) {
            input.onChange(null);
            return;
          }
          input.onChange(selectedOptions.map(option => option.value));
        }}
        value={options.filter(option => input.value && input.value.includes(option.value))}
        {...rest}
        isMulti
      />
    </div>
  );
};

const ReactSelect = ({ input, ...rest }) => {
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
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName *">{({ input }) => <input placeholder="First Name" type="text" {...input} />}</Field>
            {/* {({ input }) => <TextField placeholder="First Name" label="Outlined" variant="outlined" {...input}/>}</Field> */}
            <Field name="lastName *">{({ input }) => <input placeholder="Last Name" type="text" {...input} />}</Field>
            <Field
              name="positionInGame"
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
              name="secondaryPositionInGame"
              component={ReactSelectAdapter}
              placeholder="Secondary Position in Game *"
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
            <div>
              <label>Personal Info</label>
              <Field name="age" component="input" type="number" placeholder="Age *" />
              <Field name="feet" component="input" type="number" placeholder="Feet *" />
              <Field name="inches" component="input" type="number" placeholder="Inches" />
              <Field name="weight" component="input" type="number" placeholder="Weight *" />
              <Field name="throws" component="select">
                <option>R</option>
                <option>L</option>
              </Field>
              <Field name="bats" component="select">
                <option>R</option>
                <option>L</option>
              </Field>
            </div>
            <div>
              <label>School</label>
              <Field name="school" component="select">
                <option>FSU</option>
                <option>Rockledge</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>None</option>
              </Field>
            </div>
            <div>
              <label>Team</label>
              <Field
                name="teams"
                component={ReactSelectAdapter}
                options={[
                  {
                    value: 'Scorps',
                    label: 'Scorps',
                  },
                  {
                    value: 'Good Team',
                    label: 'Good Team',
                  },
                  {
                    value: 'FTB',
                    label: 'FTB',
                  },
                  {
                    value: 'uigi',
                    label: 'uigi',
                  },
                  {
                    value: 'ashas',
                    label: 'ashas',
                  },
                ]}
              />
            </div>
            <div>
              <label>Facility</label>
              <div>
                <Field
                  name="facility"
                  component={ReactSelectAdapter}
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
                <Field name="about" component="textarea" placeholder="Describe yourself in a few words" />
              </div>
            </div>
            <button type="submit">Sing in</button>
          </form>
        )}
      </Form>
    </>
  );
}

export default Profile;
