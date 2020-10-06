/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';
import { Field, Form } from 'react-final-form';
import queryLeaderBoard from './requests/queryLeaderBoard';
import queryLeaderboardPitching from './requests/queryLeaderboardPitching';
import mutationUpdateProfile from './requests/mutationUpdateFavoriteProfile';
import heart from '../img/heart.png';
import like from '../img/like.png';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

let submit;

const ReactSelect = ({ input, name, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        {...rest}
        onChange={option => {
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(option.value)) {
            input.onChange(option.value);
          } else {
            input.onChange(+option.value);
          }

          console.log(option);
          submit();
        }}
        value={options.find(option => option.value === input.value)}
        isSearchable={false}
      />
    </div>
  );
};

const inputText = ({ input, name, ...rest }) => (
  <div>
    <input
      {...input}
      {...rest}
      onChange={event => {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(event.currentTarget.value)) {
          input.onChange(event.currentTarget.value);
        } else {
          input.onChange(+event.currentTarget.value);
        }

        submit();
      }}
    />
  </div>
);

function LeaderBoard() {
  const [data, setData] = useState('');
  const [table, setTable] = useState('Batting');

  const onSubmit = async values => {
    if (table === 'Batting') {
      console.log(values);
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
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        submit();
      });
  }

  const classes = useStyles();
  if (data === '') {
    return <p>Loading…</p>;
  }
  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => {
          submit = handleSubmit;
          return (
            <form id="exampleForm" onSubmit={handleSubmit}>
              <div>
                <label>Last Week</label>
                <Field
                  name="date"
                  component={ReactSelect}
                  placeholder="Date"
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
                <label>School</label>
                <Field name="school" component={inputText} type="text" placeholder="School" />
              </div>
              <div>
                <label>Team</label>
                <Field name="team" component={inputText} type="text" placeholder="Team" />
              </div>
              <Field
                name="position"
                component={ReactSelect}
                placeholder="Position"
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
                <label>Age</label>
                <Field name="age" component={inputText} type="number" placeholder="Age" />
              </div>
              <Field
                name="favorite"
                component={ReactSelect}
                placeholder="Favorite"
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

              {table === 'Batting' && (
                <Field
                  name="type"
                  component={ReactSelect}
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
                  name="type2"
                  component={ReactSelect}
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

              <button
                onClick={() => {
                  setTable('Batting');
                  // submit();
                  console.log(`table = ${table}`);
                }}
              >
                Batting
              </button>
              <button
                onClick={() => {
                  setTable('Pitching');
                  // submit();
                  console.log(`table = ${table}`);
                }}
              >
                Pitching
              </button>
            </form>
          );
        }}
      />
      <h1>Leaderboard</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              {table === 'Batting' && <TableCell align="right">Batter Name</TableCell>}
              {table === 'Pitching' && <TableCell align="right">Pitcher Name</TableCell>}
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">School</TableCell>
              <TableCell align="right">Teams</TableCell>
              {table === 'Batting' && <TableCell align="right">Exit Velocity</TableCell>}
              {table === 'Pitching' && <TableCell align="right">Pitch Type</TableCell>}
              {table === 'Batting' && <TableCell align="right">Launch Angle</TableCell>}
              {table === 'Pitching' && <TableCell align="right">Velocity</TableCell>}

              {table === 'Batting' && <TableCell align="right">Distance</TableCell>}
              {table === 'Pitching' && <TableCell align="right">Spin Rate</TableCell>}

              <TableCell align="right">Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(person => (
              <TableRow key={person.rank}>
                <TableCell align="right">{person.rank}</TableCell>
                {table === 'Batting' && <TableCell align="right">{person.batter_name}</TableCell>}
                {table === 'Pitching' && <TableCell align="right">{person.pitcher_name}</TableCell>}

                <TableCell align="right">{person.age}</TableCell>
                <TableCell align="right">{person.school.name}</TableCell>
                <TableCell align="right">{person.teams.map(team => `${team.name}`)}</TableCell>
                {table === 'Batting' && <TableCell align="right">{person.exit_velocity}</TableCell>}
                {table === 'Pitching' && <TableCell align="right">{person.pitch_type}</TableCell>}

                {table === 'Batting' && <TableCell align="right">{person.launch_angle}</TableCell>}
                {table === 'Pitching' && <TableCell align="right">{person.velocity}</TableCell>}
                {table === 'Batting' && <TableCell align="right">{person.distance}</TableCell>}
                {table === 'Pitching' && <TableCell align="right">{person.spin_rate}</TableCell>}

                <TableCell align="right">
                  {!person.favorite && (
                    <img onClick={() => updateFavorite(person.batter_datraks_id, true)} src={heart} alt="Heart" />
                  )}{' '}
                  {person.favorite && (
                    <img src={like} onClick={() => updateFavorite(person.batter_datraks_id, false)} alt="Like" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {console.log(data)}
    </>
  );
}

export default LeaderBoard;
