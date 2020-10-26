/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import Select from 'react-select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
// import DatePicker from 'react-datepicker';
import queryProfile from '../requests/queryProfile';
import styles from '../Profile.module.css';
import queryBattingLog from '../requests/queryBattingLog';
import ReactSelect from '../../ReactSelect/ReactSelect';
import InputText from '../../InputText/InputText';
import TableNavigation from '../../TableNavigation/TableNavigation';
import queryProfileNames from '../requests/queryProfileNames';
import queryBattingSummary from '../requests/queryBattingSummary';
import queryProfileEvents from '../requests/queryProfileEvents';

import Charts from './Charts/Charts';

const PlayerResults = ({ personId, profile = false, myProfile = false }) => {
  const [battingLog, setBattingLog] = useState('');
  const [comparedProfile, setСomparedProfile] = useState('');
  const [battingSummary, setBattingSummary] = useState('');
  const [profileNames, setProfileNames] = useState('');
  const [profileEvents, setProfileEvents] = useState('');
  const [currentProfile, setcurrentProfile] = useState(profile || myProfile);
  const [visible, setVisible] = useState('Summary');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    queryBattingLog(localStorage.accessToken, localStorage.client, personId, {})
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setBattingLog(response.data.data.batting_log);
      })
      .catch(error => {
        console.log(error);
      });
    queryBattingSummary(localStorage.accessToken, localStorage.client, personId)
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setBattingSummary(response.data.data.batting_summary);
      })
      .catch(error => {
        console.log(error);
      });
    queryProfileEvents(localStorage.accessToken, localStorage.client, personId, {})
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setProfileEvents(response.data.data.profile_events);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const Calendar = ({ input, handleSubmit, ...rest }) => (
    <div>
      <DatePicker
        {...input}
        {...rest}
        onChange={data => {
          input.onChange(data);
          handleSubmit();
        }}
      />
    </div>
  );

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
  const sessionReportsOnSubmit = async values => {
    console.log(values);
    queryProfileEvents(localStorage.accessToken, localStorage.client, personId, values)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setProfileEvents(response.data.data.profile_events);
      });
  };

  const handleProfileNames = playerName => {
    queryProfileNames(localStorage.accessToken, localStorage.client, personId, playerName, profile.position)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setProfileNames(response.data.data.profile_names.profile_names);
      });
  };

  const handleQueryProfile = playerId => {
    queryProfile(localStorage.accessToken, localStorage.client, playerId)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        setСomparedProfile(response.data.data.profile);
      });
  };

  let data;
  if (profileNames !== '' && !profileNames.length !== true && profileNames !== undefined) {
    data = profileNames.map(player => (
      // eslint-disable-next-line react/jsx-key
      <div onClick={() => console.log('1')}>
        {player.first_name} {player.last_name}
      </div>
    ));
  }

  if (battingLog === '' || battingSummary === '' || profileEvents === '') {
    return <p>Loading PlayerResults…</p>;
  }
  return (
    <div className={styles.playerResults}>
      <div className={styles.summaryEventsWrapper}>
        <div className={styles.topValuesWrapper}>
          <div className={(styles.topValuesWrapper2, styles.card)}>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>Top Batting Values</div>
            </div>

            <div className={styles.topValuesWrapper3}>
              {!battingSummary.top_values.length && (
                <>
                  <div className={styles.topValuesItem}>
                    <div className={styles.topValue}>
                      <div className={styles.topName}>Exit Velocity</div>
                      <div className={styles.topValue}>{'NA'}</div>
                    </div>
                    <div className={styles.topValueProgressBar}></div>
                  </div>

                  <div className={styles.topValuesItem}>
                    <div className={styles.topValue}>
                      <div className={styles.topName}>Carry Distance </div>
                      <div className={styles.topValue}>{'NA'}</div>
                    </div>
                    <div className={styles.topValueProgressBar}></div>
                  </div>
                  <div className={styles.topValuesItem}>
                    <div className={styles.topValue}>
                      <div className={styles.topName}>Launch Angle </div>
                      <div className={styles.topValue}>{'NA'}</div>
                    </div>
                    <div className={styles.topValueProgressBar}></div>
                  </div>
                </>
              )}
              {!!battingSummary.top_values.length && (
                <>
                  <div className={styles.topValuesItem}>
                    <div className={styles.topValue}>
                      <div className={styles.topName}>Exit Velocity</div>
                      <div className={styles.topValue}>{battingSummary.top_values[0].exit_velocity}</div>
                    </div>
                    <div className={styles.topValueProgressBar}></div>
                  </div>

                  <div className={styles.topValuesItem}>
                    <div className={styles.topValue}>
                      <div className={styles.topName}>Carry Distance </div>
                      <div className={styles.topValue}>{battingSummary.top_values[0].distance}</div>
                    </div>
                    <div className={styles.topValueProgressBar}></div>
                  </div>
                  <div className={styles.topValuesItem}>
                    <div className={styles.topValue}>
                      <div className={styles.topName}>Launch Angle </div>
                      <div className={styles.topValue}>{battingSummary.top_values[0].launch_angle}</div>
                    </div>
                    <div className={styles.topValueProgressBar}></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {myProfile && (
          <div className={styles.card}>
            <div className={styles.recentSessionReportsTitle}>Recent Session Reports</div>
            <div className={styles.recentSessionReportsP}>No data currently linked to this profile</div>
          </div>
        )}
      </div>
      <div className={styles.card}>
        <Select
          options={[
            { value: 'Summary', label: 'Summary' },
            { value: 'Charts', label: 'Charts' },
            { value: 'Log', label: 'Log' },
          ]}
          onChange={e => setVisible(e.value)}
        />
        <ul className={styles.buttonsWrapper}>
          {/* <li className={styles.buttonBatting}>Batting</li> */}
          {myProfile && (
            <li onClick={() => setVisible('sessionReports')} className={styles.button}>
              Session Reports
            </li>
          )}

          <li onClick={() => setVisible('Сomparison')} className={styles.button}>
            Сomparison
          </li>
        </ul>
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
              render={({ handleSubmit, form }) => (
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
                  <Field
                    totalCount={battingLog.total_count}
                    profilesСount={10}
                    name="tableNavigation"
                    handleSubmit={handleSubmit}
                    component={TableNavigation}
                  />
                </form>
              )}
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
        {visible === 'Сomparison' && (
          <div>
            <div>
              <div>
                <div>
                  {currentProfile.first_name} {currentProfile.last_name}
                </div>
                <div>
                  <span>svg </span>
                  <span>age</span>
                  <span> {currentProfile.age} </span>
                </div>
                <div>
                  <span>svg </span>
                  <span>Height</span>
                  <span>
                    ft {currentProfile.feet} in {currentProfile.inches}
                  </span>
                </div>
                <div>
                  <span>svg </span>
                  <span>Weight</span>
                  <span>{currentProfile.weight}</span>
                </div>
              </div>
              <div>
                <Tooltip
                  title={<>{data}</>}
                  aria-label="add"
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  open={open}
                >
                  <input
                    onChange={event => {
                      handleProfileNames(event.currentTarget.value);
                      setOpen(true);
                    }}
                    onBlur={() => setOpen(false)}
                  />
                </Tooltip>
                {comparedProfile !== '' && (
                  <div>
                    <div>
                      {comparedProfile.first_name} {comparedProfile.last_name}
                    </div>
                    <div>
                      <span>svg </span>
                      <span>age</span>
                      <span> {comparedProfile.age} </span>
                    </div>
                    <div>
                      <span>svg </span>
                      <span>Height</span>
                      <span>
                        ft {comparedProfile.feet} in {comparedProfile.inches}
                      </span>
                    </div>
                    <div>
                      <span>svg </span>
                      <span>Weight</span>
                      <span>{comparedProfile.weight}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
        )}
        {visible === 'sessionReports' && (
          <div className={styles.reportsWrapper}>
            <div className={styles.reportsElementControlWrapper}>
              <div className={styles.reportsSessions}>Sessions</div>
              <Form
                className={styles.sessionReportsForm}
                onSubmit={sessionReportsOnSubmit}
                render={({ handleSubmit, form }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.reportsElementControl}>
                      <div className={styles.clearFilters}>
                        <button
                          onClick={() => {
                            form.reset();
                          }}
                        >
                          Clear Filters
                        </button>
                      </div>
                      <div>
                        <Field name="datePicker" handleSubmit={handleSubmit} component={Calendar}></Field>
                      </div>
                      <div>
                        <Field
                          name="type"
                          handleSubmit={handleSubmit}
                          component={ReactSelect}
                          placeholder="Type"
                          options={[
                            {
                              value: 'None',
                              label: 'None',
                            },
                            {
                              value: 'Game',
                              label: 'Game',
                            },
                            {
                              value: 'Practice',
                              label: 'Practice',
                            },
                          ]}
                        ></Field>
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>
            <div className={styles.reportsTableWrapper}>
              <div>
                <div>Date</div>
                <div>Type</div>
                <div>Name</div>
                <div>Purchased</div>
              </div>
              {!profileEvents.events.length && <div>The player haven&apos;t had any sessions yet!</div>}
              {!!profileEvents.events.length && <div>{profileEvents.events.length}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PlayerResults.propTypes = {
  personId: PropTypes.number,
  profile: PropTypes.object,
};

export default PlayerResults;
