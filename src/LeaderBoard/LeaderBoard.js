/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import queryLeaderBoard from './requests/queryLeaderBoard';
import queryLeaderboardPitching from './requests/queryLeaderboardPitching';
import mutationUpdateProfile from './requests/mutationUpdateFavoriteProfile';
import heart from '../img/heart.png';
import like from '../img/fullHeart.png';
import inputText from '../InputText/InputText';
import InputNum from '../InputNum/InputNum';
import ReactSelect from '../ReactSelect/ReactSelect';
import Styles from './LeaderBoard.module.css';
import Header from '../Header/Header';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function LeaderBoard() {
  const [data, setData] = useState('');
  const [table, setTable] = useState('Batting');

  const onSubmit = async values => {
    if (table === 'Batting') {
      queryLeaderBoard(localStorage.accessToken, localStorage.client, localStorage.uid, values)
        .catch(error => {
          console.log(error);
        })
        .then(response => {
          console.log(JSON.stringify(response.data, undefined, 2));
          let i = 1;
          // eslint-disable-next-line no-plusplus
          setData(response.data.data.leaderboard_batting.leaderboard_batting.map(person => ({ ...person, rank: i++ })));
        });
    } else {
      queryLeaderboardPitching(localStorage.accessToken, localStorage.client, localStorage.uid, values)
        .catch(error => {
          console.log(error);
        })
        .then(response => {
          console.log(JSON.stringify(response.data, undefined, 2));
          let i = 1;

          setData(
            // eslint-disable-next-line no-plusplus
            response.data.data.leaderboard_pitching.leaderboard_pitching.map(person => ({ ...person, rank: i++ })),
          );
        });
    }
  };

  useEffect(() => {
    if (table === 'Batting') {
      queryLeaderBoard(localStorage.accessToken, localStorage.client, localStorage.uid, {})
        .catch(error => {
          console.log(error);
        })
        .then(response => {
          console.log(JSON.stringify(response.data, undefined, 2));
          let i = 1;
          // eslint-disable-next-line no-plusplus
          setData(response.data.data.leaderboard_batting.leaderboard_batting.map(person => ({ ...person, rank: i++ })));
        });
    }
  }, []);

  function updateFavorite(PersonId, isFavorite) {
    mutationUpdateProfile(localStorage.accessToken, localStorage.client, localStorage.uid, PersonId, isFavorite)
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        setData(
          data.map(d => {
            const player = d;
            if (player.batter_datraks_id === PersonId) {
              player.favorite = isFavorite;
            }
            return player;
          }),
        );
      });
  }

  const classes = useStyles();
  if (data === '') {
    return <p>Loading…</p>;
  }
  return (
    <>
      <Header />
      <div className={Styles.mainContent}>
        <div className={Styles.container}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
              <form id="exampleForm" onSubmit={handleSubmit}>
                <div className={Styles.pageHeader}>
                  <div className={Styles.leaderboardTitle}>Leaderboard</div>
                  <div className={Styles.filtersContainer}>
                    <div>
                      <Field
                        name="date"
                        component={ReactSelect}
                        placeholder="Date"
                        handleSubmit={handleSubmit}
                        options={[
                          {
                            value: 'All',
                            label: 'All',
                          },
                          {
                            value: 'last_week',
                            label: 'Last Week',
                          },
                          {
                            value: 'last_month',
                            label: 'Last Month',
                          },
                        ]}
                      ></Field>
                    </div>
                    <div>
                      <Field
                        name="school"
                        handleSubmit={handleSubmit}
                        component={inputText}
                        type="text"
                        placeholder="School"
                      />
                    </div>
                    <div>
                      <Field
                        name="team"
                        handleSubmit={handleSubmit}
                        component={inputText}
                        type="text"
                        placeholder="Team"
                      />
                    </div>
                    <Field
                      name="position"
                      component={ReactSelect}
                      placeholder="Position"
                      handleSubmit={handleSubmit}
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
                      <Field
                        name="age"
                        handleSubmit={handleSubmit}
                        component={InputNum}
                        type="number"
                        placeholder="Age"
                      />
                    </div>
                    <div className={Styles.favorite}>
                      <Field
                        name="favorite"
                        component={ReactSelect}
                        placeholder="Favorite"
                        handleSubmit={handleSubmit}
                        options={[
                          {
                            value: 'All',
                            label: 'All',
                          },
                          {
                            value: '1',
                            label: 'Favorite',
                          },
                        ]}
                      ></Field>
                    </div>
                  </div>
                </div>
                <main>
                  <div className={Styles.batttinOrPichingWrapper}>
                    <ul className={Styles.batttinOrPiching}>
                      <button
                        onClick={() => {
                          setTable('Batting');
                        }}
                        className={Styles.battingButton}
                      >
                        Batting
                      </button>
                      <button
                        onClick={() => {
                          setTable('Pitching');
                        }}
                        className={Styles.pitchingButton}
                      >
                        Pitching
                      </button>
                    </ul>
                    <div className={Styles.velocityOrDistance}>
                      {table === 'Batting' && (
                        <Field
                          name="type"
                          component={ReactSelect}
                          handleSubmit={handleSubmit}
                          placeholder="Exit Velocity"
                          options={[
                            {
                              value: 'exit_velocity',
                              label: 'Exit Velocity',
                            },
                            {
                              value: 'carry_distance',
                              label: 'Carry Distance',
                            },
                          ]}
                        ></Field>
                      )}
                      {table === 'Pitching' && (
                        <Field
                          name="type"
                          component={ReactSelect}
                          handleSubmit={handleSubmit}
                          placeholder="Exit Velocity"
                          options={[
                            {
                              value: 'pitch_velocity',
                              label: 'Pitch Velocity',
                            },
                            {
                              value: 'spin_rate',
                              label: 'Spin Rate',
                            },
                          ]}
                        ></Field>
                      )}
                    </div>
                  </div>
                  <div className={Styles.tableWrapper}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Rank</TableCell>
                            {table === 'Batting' && <TableCell align="center">Batter Name</TableCell>}
                            {table === 'Pitching' && <TableCell align="center">Pitcher Name</TableCell>}
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">School</TableCell>
                            <TableCell align="center">Teams</TableCell>
                            {table === 'Batting' && <TableCell align="center">Exit Velocity</TableCell>}
                            {table === 'Pitching' && <TableCell align="center">Pitch Type</TableCell>}
                            {table === 'Batting' && <TableCell align="center">Launch Angle</TableCell>}
                            {table === 'Pitching' && <TableCell align="center">Velocity</TableCell>}
                            {table === 'Batting' && <TableCell align="center">Distance</TableCell>}
                            {table === 'Pitching' && <TableCell align="center">Spin Rate</TableCell>}

                            <TableCell align="center">Favorite</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.map(person => (
                            <TableRow key={person.rank}>
                              <TableCell align="center">{person.rank}</TableCell>
                              {table === 'Batting' && (
                                <TableCell align="center">
                                  <Link to={`/profile/${person.batter_datraks_id}`}>{person.batter_name}</Link>
                                </TableCell>
                              )}
                              {table === 'Pitching' && (
                                <TableCell align="center">
                                  <Link to={`/profile/${person.pitcher_datraks_id}`}>{person.pitcher_name}</Link>
                                </TableCell>
                              )}

                              <TableCell align="center">{person.age}</TableCell>
                              <TableCell align="center">{person.school.name}</TableCell>
                              <TableCell align="center">{person.teams.map(team => `${team.name}`)}</TableCell>
                              {table === 'Batting' && <TableCell align="center">{person.exit_velocity}</TableCell>}
                              {table === 'Pitching' && <TableCell align="center">{person.pitch_type}</TableCell>}

                              {table === 'Batting' && <TableCell align="center">{person.launch_angle}</TableCell>}
                              {table === 'Pitching' && <TableCell align="center">{person.velocity}</TableCell>}
                              {table === 'Batting' && <TableCell align="center">{person.distance}</TableCell>}
                              {table === 'Pitching' && <TableCell align="center">{person.spin_rate}</TableCell>}

                              <TableCell align="center">
                                {!person.favorite && (
                                  <img
                                    onClick={() => updateFavorite(person.batter_datraks_id, true)}
                                    src={heart}
                                    alt="Heart"
                                  />
                                )}{' '}
                                {person.favorite && (
                                  <img
                                    src={like}
                                    onClick={() => updateFavorite(person.batter_datraks_id, false)}
                                    alt="Like"
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </main>
              </form>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default LeaderBoard;
