/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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
import queryBattingGraph from './requests/queryBattingGraph';
import PageNavigation from '../PageNavigation/PageNavigation';
import queryBattingLog from './requests/queryBattingLog';
import ReactSelect from '../ReactSelect/ReactSelect';
import InputText from '../InputText/InputText';
import TableNavigation from '../TableNavigation/TableNavigation';

function Charts({ personId }) {
  const [chart, setChart] = useState('');
  useEffect(() => {
    queryBattingGraph(localStorage.accessToken, localStorage.client, personId, '')
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        setChart(response.data.data.batting_graph.graph_rows);
      });
  }, []);
  if (chart === '') {
    return <p>Loading Charts…</p>;
  }
  if (!chart.length) {
    return <p>There&apos;s no info yet!</p>;
  }
  const options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Rolling Exit Velocity for Corey Whiting',
    },

    subtitle: {
      text: 'Average over last 11 batted balls',
    },

    yAxis: {
      title: {
        text: 'Exit Velocity',
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 1,
      },
    },

    series: [
      {
        name: 'Exit Velocity',
        data: chart,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };

  const handleChange = event => {
    queryBattingGraph(localStorage.accessToken, localStorage.client, personId, event.value)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        setChart(response.data.data.batting_graph.graph_rows);
      });
  };

  return (
    <>
      <Select
        options={[
          { value: '', label: 'None' },
          { value: 'Four Seam Fastball', label: 'Four Seam Fastball' },
          { value: 'Two Seam Fastball', label: 'Two Seam Fastball' },
          { value: 'Curveball', label: 'Curveball' },
          { value: 'Changeup', label: 'Changeup' },
          { value: 'Slider', label: 'Slider' },
        ]}
        onChange={handleChange}
      />
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}

const PlayerResults = ({ personId }) => {
  const [battingLog, setBattingLog] = useState('');
  const [battingSummary, setBattingSummary] = useState('');
  const [visible, setVisible] = useState('Summary');

  useEffect(() => {
    queryBattingLog(localStorage.accessToken, localStorage.client, personId, {})
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setBattingLog(response.data.data.batting_log);
      });
    queryBattingSummary(localStorage.accessToken, localStorage.client, personId)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setBattingSummary(response.data.data.batting_summary);
      });
  }, []);

  const onSubmit = async values => {
    console.log(values);
    queryBattingLog(localStorage.accessToken, localStorage.client, personId, values)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setBattingLog(response.data.data.batting_log);
      });
  };
  let submit;

  console.log(battingLog);
  console.log(battingSummary);

  const handleChange = e => {
    console.log(e);
    setVisible(e.value);
  };

  if (battingLog === '' || battingSummary === '') {
    return <p>Loading PlayerResults…</p>;
  }
  return (
    <div className={styles.playerResults}>
      <div>Top Batting Values</div>
      <div className={styles.topBattingValues}>
        {!battingSummary.top_values.length && (
          <>
            <div>
              <p>Exit Velocity {'NA'}</p>
            </div>
            <div>
              <p>Carry Distance {'NA'}</p>
            </div>
            <div>
              <p>Launch Angle {'NA'}</p>
            </div>
          </>
        )}
        {!!battingSummary.top_values.length && (
          <>
            <div>
              <p>Exit Velocity {battingSummary.top_values[0].exit_velocity}</p>
            </div>
            <div>
              <p>Carry Distance {battingSummary.top_values[0].distance}</p>
            </div>
            <div>
              <p>Launch Angle {battingSummary.top_values[0].launch_angle}</p>
            </div>
          </>
        )}
      </div>

      <div>
        <p>Recent Session Reports</p>
        <p>No data currently linked to this profile</p>
      </div>
      <Select
        options={[
          { value: 'Summary', label: 'Summary' },
          { value: 'Charts', label: 'Charts' },
          { value: 'Log', label: 'Log' },
        ]}
        onChange={handleChange}
      />
      {visible === 'Summary' && (
        <>
          {!battingSummary.top_values.length && !battingSummary.average_values.length && (
            <p>There&apos;s no info yet!</p>
          )}
          {!!battingSummary.top_values.length && !!battingSummary.average_values.length && (
            <>
              <div>
                <p>Top Batting Values</p>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Pitch Type</TableCell>
                        <TableCell align="center">Distance</TableCell>
                        <TableCell align="center">Launch Angle</TableCell>
                        <TableCell align="center">Exit Velocity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {battingSummary.top_values.map(row => (
                        <TableRow key={row.exit_velocity}>
                          <TableCell align="center">{row.pitch_type}</TableCell>
                          <TableCell align="center">{row.distance}</TableCell>
                          <TableCell align="center">{row.launch_angle}</TableCell>
                          <TableCell align="center">{row.exit_velocity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div>
                <p>Average Batting Values</p>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Pitch Type</TableCell>
                        <TableCell align="center">Distance</TableCell>
                        <TableCell align="center">Launch Angle</TableCell>
                        <TableCell align="center">Exit Velocity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {battingSummary.average_values.map(row => (
                        <TableRow key={row.exit_velocity}>
                          <TableCell align="center">{row.pitch_type}</TableCell>
                          <TableCell align="center">{row.distance}</TableCell>
                          <TableCell align="center">{row.launch_angle}</TableCell>
                          <TableCell align="center">{row.exit_velocity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          )}
        </>
      )}
      {visible === 'Charts' && (
        <div>
          <Charts personId={personId} />
        </div>
      )}
      {visible === 'Log' && (
        <div>
          <p>Batting Log</p>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => {
              submit = handleSubmit;
              return (
                <form id="exampleForm" onSubmit={handleSubmit}>
                  <Field
                    handleSubmit={handleSubmit}
                    name="pitchType"
                    component={ReactSelect}
                    placeholder="Pitch Type"
                    options={[
                      {
                        value: '',
                        label: 'None',
                      },
                      {
                        value: 'Four Seam Fastball',
                        label: 'Four Seam Fastball',
                      },
                      {
                        value: 'Two Seam Fastball',
                        label: 'Two Seam Fastball',
                      },
                      {
                        value: 'Curveball',
                        label: 'Curveball',
                      },
                      {
                        value: 'Changeup',
                        label: 'Changeup',
                      },
                      {
                        value: 'Slider',
                        label: 'Slider',
                      },
                    ]}
                  ></Field>

                  <Field
                    handleSubmit={handleSubmit}
                    name="playerName"
                    component={InputText}
                    type="text"
                    placeholder="Player Name"
                  />
                  {console.log(battingLog.total_count)}
                  <Field
                    totalCount={battingLog.total_count}
                    name="tableNavigation"
                    handleSubmit={handleSubmit}
                    component={TableNavigation}
                  />
                </form>
              );
            }}
          />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Pitcher Name</TableCell>
                  <TableCell align="center">Pitcher Handedness</TableCell>
                  <TableCell align="center">Pitch Type</TableCell>
                  <TableCell align="center">Pitch Call</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(battingLog)}
                {!battingLog.batting_log.length && <p>There&apos;s no info yet!</p>}
                {!!battingLog.batting_log.length &&
                  battingLog.batting_log.map(row => (
                    // eslint-disable-next-line react/jsx-key
                    <TableRow>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.pitcher_name}</TableCell>
                      <TableCell align="center">{row.pitcher_handedness}</TableCell>
                      <TableCell align="center">{row.pitch_type}</TableCell>
                      <TableCell align="center">{row.pitch_call}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

const LeftPanel = ({ profile, personId, setVisibleForm }) => {
  console.log(`Мой профиль2 ${profile}`);
  console.log(profile);

  if (profile === '') {
    return <p>Loading LeftPanel…</p>;
  }
  return (
    <>
      {profile !== '' && (
        <div className={styles.sideBar}>
          {!personId && <button onClick={() => setVisibleForm(true)}>Кнопка редактирования</button>}
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
      console.log(personId);
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
    }
  }, []);
  console.log(schools);
  console.log(teams);
  console.log(facilities);
  console.log(profile);
  if (schools === '' || teams === '' || facilities === '' || profile === '') {
    return <p>Loading Профиль…</p>;
  }
  return (
    <>
      <h1>Profile</h1>
      <div className={styles.PlayerResultsContainer}>
        <div>
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
                    handleSubmit={handleSubmit}
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
                    handleSubmit={handleSubmit}
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
                      handleSubmit={handleSubmit}
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
                      handleSubmit={handleSubmit}
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
                      handleSubmit={handleSubmit}
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
                      handleSubmit={handleSubmit}
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
                      handleSubmit={handleSubmit}
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
        </div>

        {!visibleForm && (
          <div>
            <div>
              {personId !== undefined && (
                <>
                  <LeftPanel profile={profile} personId={personId} setVisibleForm={setVisibleForm} />
                </>
              )}
              {personId === undefined && (
                <>
                  <LeftPanel profile={profile} personId={profile.id} setVisibleForm={setVisibleForm} />
                </>
              )}
            </div>
            <div>
              <button onClick={() => setVisibleForm(true)}>Редактировать</button>
            </div>
          </div>
        )}
        <div>
          {personId !== undefined && (
            <>
              {console.log(`personId ${personId}`)}
              <PlayerResults personId={personId} />
            </>
          )}
          {console.log(profile.id)}
          {personId === undefined && (
            <>
              {console.log(`Мой профиль ${profile}`)}
              <PlayerResults personId={profile.id} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
