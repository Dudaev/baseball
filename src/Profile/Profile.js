/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import Select from 'react-select';
import { useParams, Link, useHistory } from 'react-router-dom';
import mutationUpdateProfile from './requests/mutationUpdateProfile';
import queryCurrentProfile from './requests/queryCurrentProfile';
import queryFacilities from './requests/queryFacilities';
import queryNotifications from './requests/queryNotifications';
import queryProfile from './requests/queryProfile';
import querySchools from './requests/querySchools';
import queryTeams from './requests/queryTeams';
import ErrorWithDelay from '../ErrorWithDelay';
import styles from './Profile.module.css';
// import ReactSelect from '../ReactSelect/ReactSelect';
import ReactSelectProfile from '../ReactSelect/ReactSelectProfile';
import LeftPanel from './LeftPanel/LeftPanel';
import PlayerResults from './PlayerResults/PlayerResults';
import Header from '../Header/Header';
import ScoutResult from './PlayerResults/ScoutResult';
import queryMyFavoriteProfiles from './requests/queryMyFavoriteProfiles';

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

const InputNum = ({ input, placeholder }) => (
  <div>
    <input
      {...input}
      type="text"
      placeholder={placeholder}
      onChange={event => input.onChange(+event.currentTarget.value)}
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
  const [playerResults, setPlayerResults] = useState(true);
  const [favoriteProfiles, setFavoriteProfiles] = useState('');
  const { personId } = useParams();
  const history = useHistory();

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
      }
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
      queryNotifications(localStorage.accessToken, localStorage.client, localStorage.uid);
      // queryProfile(localStorage.accessToken, localStorage.client, personId);
      // queryProfileEvents(localStorage.accessToken, localStorage.client, localStorage.uid);
      if (personId) {
        queryProfile(localStorage.accessToken, localStorage.client, personId)
          .catch(error => {
            console.log(error);
          })
          .then(response => {
            console.log(JSON.stringify(response.data, undefined, 2));
            setProfile(response.data.data.profile);
          });
      }
      queryMyFavoriteProfiles(localStorage.accessToken, localStorage.client, localStorage.uid)
        .catch(error => {
          console.log(error);
        })
        .then(response => {
          console.log(JSON.stringify(response.data, undefined, 2));
          setFavoriteProfiles(response.data.data.my_favorite.profiles);
        });
    }
  }, []);
  if (schools === '' || teams === '' || facilities === '' || profile === '' || favoriteProfiles === '') {
    return <p>Loading Профиль…</p>;
  }

  return (
    <>
      <Header profile={profile} />
      <div className={styles.mainContent}>
        <div className={styles.profileContainer}>
          <div className={styles.formWrapper}>
            {profile !== null && (
              <>
                {(visibleForm || profile.first_name === null) && (
                  <Form
                    onSubmit={formObj => {
                      setVisibleForm(false);
                      mutationUpdateProfile(
                        localStorage.accessToken,
                        localStorage.client,
                        localStorage.uid,
                        formObj,
                        profile.id,
                      )
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
                      } else if (values.age > 30) {
                        errors.age = 'Must not be older than 30';
                      } else if (values.age < 0) {
                        errors.age = 'You must be older than 0';
                      }
                      if (!values.feet) {
                        errors.feet = 'Feet Required';
                      } else if (values.feet < 4) {
                        errors.feet = 'Minimal height is 4';
                      } else if (values.feet > 7) {
                        errors.feet = 'Maximum height is 7';
                      }
                      if (values.inches) {
                        if (values.inches < 0) {
                          errors.inches = 'Inches can be from 0 to 11';
                        } else if (values.inches > 11) {
                          errors.inches = 'Inches can be from 0 to 11';
                        }
                      }
                      if (!values.weight) {
                        errors.weight = 'Weight Required';
                      } else if (values.weight > 350) {
                        errors.weight = 'Maximum weight is 350 lbs';
                      } else if (values.weight < 50) {
                        errors.weight = 'Minimal weight is 50 lbs';
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
                      <form onSubmit={handleSubmit} className={styles.form}>
                        <div>
                          <div>
                            <Field name="first_name">
                              {({ input }) => (
                                <div>
                                  <div>
                                    <input placeholder="firstName *" type="text" {...input} />
                                  </div>

                                  <div className={styles.error}>
                                    <ErrorWithDelay name="first_name" delay={1000}>
                                      {error => <span>{error}</span>}
                                    </ErrorWithDelay>
                                  </div>
                                </div>
                              )}
                            </Field>
                          </div>
                          <div>
                            <Field name="last_name">
                              {({ input }) => (
                                <div>
                                  <div>
                                    <input placeholder="lastName *" type="text" {...input} />
                                  </div>

                                  <div className={styles.error}>
                                    <ErrorWithDelay name="last_name" delay={1000}>
                                      {error => <span>{error}</span>}
                                    </ErrorWithDelay>
                                  </div>
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>
                        <div>
                          <Field
                            name="position"
                            handleSubmit={handleSubmit}
                            component={ReactSelectProfile}
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
                        </div>

                        <Field
                          name="position2"
                          handleSubmit={handleSubmit}
                          component={ReactSelectProfile}
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
                        <div className={styles.label}>Personal Info</div>
                        <div>
                          <Field name="age" component={InputNum} placeholder="Age *" />
                        </div>
                        <div>
                          <Field name="feet" component={InputNum} placeholder="Feet *" />
                        </div>
                        <div>
                          <Field name="inches" component={InputNum} placeholder="Inches" />
                        </div>
                        <div>
                          <Field name="weight" component={InputNum} placeholder="Weight *" />
                        </div>
                        <div>
                          <Field
                            name="throws_hand"
                            handleSubmit={handleSubmit}
                            component={ReactSelectProfile}
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
                        </div>
                        <div>
                          <Field
                            name="bats_hand"
                            handleSubmit={handleSubmit}
                            component={ReactSelectProfile}
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
                        <div className={styles.label}>School</div>
                        <div>
                          <Field
                            name="school"
                            handleSubmit={handleSubmit}
                            component={ReactSelectObj}
                            defaultValue={null}
                            options={schools.map(school => ({
                              value: school,
                              label: school.name,
                            }))}
                          />
                        </div>
                        <div className={styles.label}>School Year</div>
                        <div>
                          <Field
                            name="school_year"
                            handleSubmit={handleSubmit}
                            component={ReactSelectProfile}
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
                        <div className={styles.label}>Team</div>
                        <div>
                          <Field
                            name="teams"
                            handleSubmit={handleSubmit}
                            component={ReactSelectMultiObj}
                            placeholder="Team"
                            options={teams.map(team => ({
                              value: team,
                              label: team.name,
                            }))}
                          />
                        </div>
                        <div className={styles.label}>Facility</div>
                        <div>
                          <div>
                            <Field
                              name="facilities"
                              handleSubmit={handleSubmit}
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
                          <div className={styles.label}>About</div>
                          <div>
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
                        <div className={styles.buttonsWrapper}>
                          <button
                            className={styles.cancelButton}
                            onClick={() => {
                              if (profile.first_name !== null) {
                                setVisibleForm(false);
                              }
                            }}
                          >
                            Cancel
                          </button>
                          <button className={styles.saveButton} type="submit">
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  </Form>
                )}
                {!visibleForm && !(profile.first_name === null) && (
                  <div>
                    <div>
                      <LeftPanel profile={profile} personId={personId} setVisibleForm={setVisibleForm} />
                    </div>
                  </div>
                )}
              </>
            )}
            {profile === null && (
              <>
                {favoriteProfiles.map(player => (
                  <div
                    key={player.id}
                    className={styles.favorite}
                    onClick={() => history.push(`/profile/${player.id}`)}
                  >
                    {player.first_name} {player.last_name}
                  </div>
                ))}
              </>
            )}
          </div>
          {profile !== null && (
            <>
              {!(profile.first_name === null) && (
                <>
                  {personId !== undefined && (
                    <>
                      <PlayerResults personId={personId} />
                    </>
                  )}
                  {personId === undefined && (
                    <>
                      <PlayerResults personId={profile.id} />
                    </>
                  )}
                </>
              )}

              {profile.first_name === null && (
                <div className={styles.NoPlayerResults}>
                  <div>
                    <div>
                      <div></div>
                      <div>Your Account</div>
                      <div>
                        Changing your profile options lets you control how others see you and your profile. These
                        settings include things like your name, personal info and school.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {profile === null && (
            <>
              <ScoutResult />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
