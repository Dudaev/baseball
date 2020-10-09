/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
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
import styles from './Profile.module.css';

const LeftPanel = ({ profile }) => {
  if (profile === '') {
    return <p>Loading…</p>;
  }
  return (
    <>
      {profile !== '' && (
        <div className={styles.sideBar}>
          <div>
            <div>Аватарка</div>
            <div>
              {profile.first_name} {profile.last_name}
            </div>
            <div>
              {profile.position} {profile.position2}
            </div>
          </div>
          <div className={styles.container}>
            <div>
              <span>svg </span>
              <span>age</span>
              <span> {profile.age} </span>
            </div>
            <div>
              <span>svg </span>
              <span>Height</span>
              <span>
                ft {profile.feet} in {profile.inches}
              </span>
            </div>
            <div>
              <span>svg </span>
              <span>Weight</span>
              <span>{profile.weight}</span>
            </div>
            <div>
              <span>svg </span>
              <span>Throws </span>
              <span>{profile.throws_hand}</span>
            </div>
            <div>
              <span>svg </span>
              <span>Bats </span>
              <span>{profile.bats_hand}</span>
            </div>
          </div>
          <div>
            {profile.School != null && (
              <div>
                <div>School</div>
                <div>{profile.school.name}</div>
              </div>
            )}

            {profile.school_year != null && (
              <div>
                <div>School Year</div>
                <div>{profile.school_year}</div>
              </div>
            )}
            {profile.teams != '' && (
              <div>
                <div>Team</div>
                <div>{profile.teams.map(team => `${team.name}, `)}</div>
              </div>
            )}
            {profile.facilities != '' && (
              <div>
                <div>Facility</div>
                <div>{profile.facilities[0].u_name}</div>
              </div>
            )}
            {profile.biography != '' && (
              <div>
                <div>About</div>
                <div>{profile.biography}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const ReactSelectMultiObj = ({ input, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        onChange={selectedOptions => {
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

      <div className={styles.error}>
        <ErrorWithDelay name={input.name} delay={1000}>
          {error => <span>{error}</span>}
        </ErrorWithDelay>
      </div>
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

    <div className={styles.error}>
      <ErrorWithDelay name={input.name} delay={1000}>
        {error => <span>{error}</span>}
      </ErrorWithDelay>
    </div>
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
  const [schools, setSchools] = useState('');
  const [teams, setTeams] = useState('');
  const [facilities, setFacilities] = useState('');
  const [profile, setProfile] = useState('');
  const [visibleForm, setVisibleForm] = useState(false);
  const { personId } = useParams();

  useEffect(() => {
    // eslint-disable-next-line no-lone-blocks
    {
      if (!personId) {
        queryCurrentProfile(localStorage.accessToken, localStorage.client, localStorage.uid)
          .catch(error => {
            console.log(error);
          })
          .then(response => {
            console.log(JSON.stringify(response.data, undefined, 2));
            setProfile(response.data.data.current_profile);
          });
        querySchools(localStorage.accessToken, localStorage.client, localStorage.uid)
          .catch(error => {
            console.log(error);
          })
          .then(response => {
            console.log(JSON.stringify(response.data, undefined, 2));
            setSchools(response.data.data.schools.schools);
          });
        queryTeams(localStorage.accessToken, localStorage.client, localStorage.uid)
          .catch(error => {
            console.log(error);
          })
          .then(response => {
            console.log(JSON.stringify(response.data, undefined, 2));
            setTeams(response.data.data.teams.teams);
          });
        queryFacilities(localStorage.accessToken, localStorage.client, localStorage.uid)
          .catch(error => {
            console.log(error);
          })
          .then(response => {
            console.log(JSON.stringify(response.data, undefined, 2));
            setFacilities(response.data.data.facilities.facilities);
          });
        queryLeaderBoard(localStorage.accessToken, localStorage.client, localStorage.uid);
        queryNotifications(localStorage.accessToken, localStorage.client, localStorage.uid);
        // queryProfile(localStorage.accessToken, localStorage.client, personId);
        queryProfileEvents(localStorage.accessToken, localStorage.client, localStorage.uid);
        queryBattingSummary(localStorage.accessToken, localStorage.client, localStorage.uid);
      } else {
        queryProfile(localStorage.accessToken, localStorage.client, personId)
          .catch(error => {
            console.log(error);
          })
          .then(response => {
            console.log(JSON.stringify(response.data, undefined, 2));
            setProfile(response.data.data.profile);
          });
      }
    }
  }, []);
  console.log(personId);
  // if (schools === '' || teams === '' || facilities === '') {
  //   return <p>Loading…</p>;
  // }
  return (
    <>
      <h1>Profile</h1>
      {visibleForm && (
        <Form
          onSubmit={formObj => {
            console.log('formObj', formObj);
            setVisibleForm(false);
            mutationUpdateProfile(localStorage.accessToken, localStorage.client, localStorage.uid, formObj)
              .catch(error => {
                console.log(error);
              })
              .then(response => {
                console.log(JSON.stringify(response, undefined, 2));
                setProfile(response.data.data.update_profile.profile);
              });
          }}
          validate={values => {
            const errors = {};
            if (!values.first_name) {
              errors.first_name = 'First Name Required';
            }
            if (!values.last_name) {
              errors.last_name = 'Last Name Required';
            }
            if (!values.position) {
              errors.position = 'Position Required';
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
            if (
              JSON.stringify(errors) !==
              (JSON.stringify({}) || JSON.stringify({ form: 'Fill out the required fields' }))
            ) {
              errors.form = 'Fill out the required fields';
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
                    <div className={styles.error}>
                      <ErrorWithDelay name="first_name" delay={1000}>
                        {error => <span>{error}</span>}
                      </ErrorWithDelay>
                    </div>
                  </div>
                )}
              </Field>
              <Field name="last_name">
                {({ input }) => (
                  <div>
                    <input placeholder="lastName *" type="text" {...input} />
                    <div className={styles.error}>
                      <ErrorWithDelay name="last_name" delay={1000}>
                        {error => <span>{error}</span>}
                      </ErrorWithDelay>
                    </div>
                  </div>
                )}
              </Field>
              <Field
                name="position"
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
                name="position2"
                component={ReactSelect}
                placeholder="Secondary Position in Game"
                options={[
                  {
                    value: null,
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
                  defaultValue={null}
                  options={schools.map(school => ({
                    value: school,
                    label: school.name,
                  }))}
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
                      value: 'Freshman',
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
                  options={teams.map(team => ({
                    value: team,
                    label: team.name,
                  }))}
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
                        value: facilities[0],
                        label: 'Example',
                      },
                    ]}
                  />
                </div>
                <div>
                  <label>About</label>
                  <Field
                    name="biography"
                    component="textarea"
                    placeholder="Describe yourself in a few words"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className={styles.error}>
                <ErrorWithDelay name="form" delay={1000}>
                  {error => <span>{error}</span>}
                </ErrorWithDelay>
              </div>

              <button type="submit">Save</button>
            </form>
          )}
        </Form>
      )}
      {!visibleForm && (
        <>
          {' '}
          {!personId && <button onClick={() => setVisibleForm(true)}>Кнопка редактирования</button>}
          <LeftPanel profile={profile} />{' '}
        </>
      )}
    </>
  );
}

export default Profile;
