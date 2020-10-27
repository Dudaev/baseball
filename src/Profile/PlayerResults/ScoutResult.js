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
import queryProfile from '../requests/queryProfile';
import styles from '../Profile.module.css';
import queryBattingLog from '../requests/queryBattingLog';
import ReactSelect from '../../ReactSelect/ReactSelect';
import InputText from '../../InputText/InputText';
import TableNavigation from '../../TableNavigation/TableNavigation';
import queryProfileNames from '../requests/queryProfileNames';
import queryBattingSummary from '../requests/queryBattingSummary';
import queryProfileEvents from '../requests/queryProfileEvents';
import UserImg from '../../img/user.png';
import Charts from './Charts/Charts';
import queryCurrentProfile from '../requests/queryCurrentProfile';
import queryMyFavoriteProfiles from '../requests/queryMyFavoriteProfiles';


const ScoutResult = ({ personId = false }) => {
  const [battingLog, setBattingLog] = useState('');
  const [comparedProfile, setСomparedProfile] = useState('');
  const [battingSummary, setBattingSummary] = useState('');
  const [profileNames, setProfileNames] = useState('');
  const [profileEvents, setProfileEvents] = useState('');
  const [currentProfile, setcurrentProfile] = useState('');
  const [visible, setVisible] = useState('Summary');
  const [profileSelection, setProfileSelection] = useState(false);
  const [valuesType, setValuesType] = useState('Exit Velocity');
  const [tableInput, setTableInput] = useState('');


  const [favoriteProfiles, setFavoriteProfiles] = useState('');
  const [firstProfile, setFirstProfile] = useState('');
  const [secondProfile, setSecondProfile] = useState('');
  const [secondProfileBox, setSecondProfileBox] = useState(false);
  const [firstProfileBox, setFirstProfileBox] = useState(false);

  useEffect(() => {
    queryMyFavoriteProfiles(localStorage.accessToken, localStorage.client, localStorage.uid)
    .catch(error => {
      console.log(error);
    })
    .then(response => {
      console.log(JSON.stringify(response.data, undefined, 2));
      setFavoriteProfiles(response.data.data.my_favorite.profiles);
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
    queryProfileNames(localStorage.accessToken, localStorage.client, personId, playerName, firstProfile.position)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setProfileNames(response.data.data.profile_names.profile_names);
      });
  };

  const handleQuerySecondProfile = playerId => {
    queryProfile(localStorage.accessToken, localStorage.client, playerId)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        setSecondProfile(response.data.data.profile);
      });
  };
  const handleQueryFirstProfile = playerId => {
    queryProfile(localStorage.accessToken, localStorage.client, playerId)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        setFirstProfile(response.data.data.profile);
      });
  };

  if (favoriteProfiles === '') {
    return <p>Loading PlayerResults…</p>;
  }

  return (
    <div className={styles.playerResults}>
      <div className={styles.summaryEventsWrapper}>
        <div className={styles.topValuesWrapper}>

          <div className={styles.card}>
            <div className={styles.recentSessionReportsTitle}>Recent Session Reports</div>
            <div className={styles.recentSessionReportsP}>No data currently linked to this profile</div>
          </div>

          <div className={styles.comparisonWrapper}>
            <div>
              <div>
                <div className={styles.comparisonHeader}>
                  <div>
                    {firstProfile !== '' && (
                      <>
                        {firstProfile.avatar !== null && <img src={firstProfile.avatar} alt="avatar" />}
                        {firstProfile.avatar === null && <img src={UserImg} alt="avatar" />}
                      </>
                    )}
                    {firstProfile === '' && <img src={UserImg} alt="avatar" />}

                    <div className={styles.comparedProfilesWrapper}>

                    <button onClick={() => setFirstProfileBox(!firstProfileBox)}>
                        {firstProfile.first_name !== null && (
                        <>
                          {firstProfile.first_name} {firstProfile.last_name}
                        </>
                      )}
                      {firstProfile === '' && <>Select Profile</>}
                    </button>


                    {firstProfileBox && favoriteProfiles !== '' && (
                      <div className={styles.profileSelection}>
                      {console.log(favoriteProfiles)}
                        {
                          favoriteProfiles.map(player => (
                          <div key={player.id} onClick={() => {handleQueryFirstProfile(player.id)}    }>
                            {player.first_name} {player.last_name}
                          </div>
                        ))}
                      </div>
                    )}
                    </div>

                  </div>
                  <div>
                    {secondProfile !== '' && (
                      <>
                        {secondProfile.avatar !== null && <img src={secondProfile.avatar} alt="avatar" />}
                        {secondProfile.avatar === null && <img src={UserImg} alt="avatar" />}
                      </>
                    )}
                    {secondProfile === '' && <img src={UserImg} alt="avatar" />}
                    <div className={styles.comparedProfilesWrapper}>


                      <button onClick={() => setSecondProfileBox(!secondProfileBox)}>
                          {secondProfile.first_name !== null && (
                          <>
                            {secondProfile.first_name} {secondProfile.last_name}
                          </>
                        )}
                        {secondProfile === '' && <>Select Profile</>}
                      </button>


                      {secondProfileBox && favoriteProfiles !== '' && (
                        <div className={styles.profileSelection}>
                        {console.log(favoriteProfiles)}
                          {
                            favoriteProfiles.map(player => (
                            <div key={player.id} onClick={() => {handleQuerySecondProfile(player.id)}    }>
                              {player.first_name} {player.last_name}
                            </div>
                          ))}
                        </div>
                      )}


                    </div>
                  </div>
                </div>
                <div className={styles.comparisonTable}>
                  <div>
                    <div>
                      <span>Age</span>
                      <span> {firstProfile.age} </span>
                    </div>
                    <div>
                      <span>Age</span>
                      {secondProfile !== '' && <span> {secondProfile.age} </span>}
                      {secondProfile === '' && <span> - </span>}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>Height </span>
                      <span>
                        {firstProfile.feet} ft {firstProfile.inches} in
                      </span>
                    </div>
                    <div>
                      <span>Height </span>
                      {secondProfile !== '' && (
                        <span>
                          {secondProfile.feet} ft {secondProfile.inches} in
                        </span>
                      )}
                      {secondProfile === '' && <span> - </span>}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>Weight </span>
                      <span>{firstProfile.weight} lbs</span>
                    </div>
                    <div>
                      <span>Weight </span>
                      {secondProfile !== '' && <span>{secondProfile.weight} lbs</span>}
                      {secondProfile === '' && <span> - </span>}
                    </div>
                  </div>
                  <div className={styles.tableWrapper}>
                    <Select
                      options={[
                        { value: 'Distance', label: 'Distance' },
                        { value: 'Launch Angle', label: 'Launch Angle' },
                        { value: 'Exit Velocity', label: 'Exit Velocity' },
                      ]}
                      onChange={e => setValuesType(e.value)}
                      value={valuesType}
                      placeholder={valuesType}
                    />
                    <div>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableBody>
                            {['Fastball', 'Curveball', 'Changeup', 'Slider'].map(pitchType => (
                              // eslint-disable-next-line react/jsx-key
                              <TableRow>
                                <TableCell align="left">{pitchType}</TableCell>

                                {firstProfile !== '' && ( <>
                                {firstProfile.batting_top_values.some(v => v.pitch_type === pitchType) && (
                                  <>
                                    {firstProfile.batting_top_values.map(data => {
                                      if (data.pitch_type === pitchType) {
                                        return (
                                          <>
                                            {valuesType === 'Distance' && (
                                              <TableCell align="center">{data.distance}</TableCell>
                                            )}
                                            {valuesType === 'Launch Angle' && (
                                              <TableCell align="center">{data.launch_angle}</TableCell>
                                            )}
                                            {valuesType === 'Exit Velocity' && (
                                              <TableCell align="center">{data.exit_velocity}</TableCell>
                                            )}
                                          </>
                                        );
                                      }
                                    })}
                                  </>
                                )}

                                {!firstProfile.batting_top_values.some(v => v.pitch_type === pitchType) && (
                                  <TableCell align="center">-</TableCell>
                                )}
                                </>
                                )}
                                {firstProfile === '' && <TableCell align="center">-</TableCell>}
                                {secondProfile !== '' && (
                                  <>
                                    {secondProfile.batting_top_values.some(v => v.pitch_type === pitchType) && (
                                      <>
                                        {secondProfile.batting_top_values.map(data => {
                                          if (data.pitch_type === pitchType) {
                                            return (
                                              <>
                                                {valuesType === 'Distance' && (
                                                  <TableCell align="center">{data.distance}</TableCell>
                                                )}
                                                {valuesType === 'Launch Angle' && (
                                                  <TableCell align="center">{data.launch_angle}</TableCell>
                                                )}
                                                {valuesType === 'Exit Velocity' && (
                                                  <TableCell align="center">{data.exit_velocity}</TableCell>
                                                )}
                                              </>
                                            );
                                          }
                                        })}
                                        {!secondProfile.batting_top_values.length && (
                                          <TableCell align="center">-</TableCell>
                                        )}
                                      </>
                                    )}
                                    {!secondProfile.batting_top_values.some(v => v.pitch_type === pitchType) && (
                                      <TableCell align="center">-</TableCell>
                                    )}
                                  </>
                                )}
                                {secondProfile === '' && <TableCell align="center">-</TableCell>}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
      </div>
    </div>
  );
};

export default ScoutResult;
