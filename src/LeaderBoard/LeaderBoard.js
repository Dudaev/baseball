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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const onSubmit = async values => {
  console.log(JSON.stringify(values, 0, 2));
};
let submit;

const ReactSelect = ({ input, name, ...rest }) => {
  const { options } = rest;
  return (
    <div>
      <Select
        {...input}
        {...rest}
        onChange={option => {
          input.onChange(option.value);
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
        input.onChange(event.currentTarget.value);
        submit();
      }}
    />
  </div>
);

function LeaderBoard() {
  const [data, setData] = useState('');

  useEffect(() => {
    queryLeaderBoard(localStorage.accessToken, localStorage.client, localStorage.uid)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        let i = 1;
        // eslint-disable-next-line no-plusplus
        setData(response.data.data.leaderboard_batting.leaderboard_batting.map(person => ({ ...person, rank: i++ })));
      });
  }, []);

  const classes = useStyles();
  if (data === '') {
    return <p>Loading…</p>;
  }
  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          submit = handleSubmit;
          return (
            <form id="exampleForm" onSubmit={handleSubmit}>
              <div>
                <label>Last Week</label>
                <Field
                  name="date"
                  component={ReactSelect}
                  placeholder="Position in Game *"
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
                name="Favorite"
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

              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                  Reset
                </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
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
              <TableCell align="right">Batter Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">School</TableCell>
              <TableCell align="right">Teams</TableCell>
              <TableCell align="right">Exit Velocity</TableCell>
              <TableCell align="right">Launch Angle</TableCell>
              <TableCell align="right">Distance</TableCell>
              <TableCell align="right">Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(person => (
              <TableRow key={person.rank}>
                <TableCell align="right">{person.rank}</TableCell>
                <TableCell align="right">{person.batter_name}</TableCell>
                <TableCell align="right">{person.age}</TableCell>
                <TableCell align="right">{person.school.name}</TableCell>
                <TableCell align="right">{person.teams.map(team => `${team.name}`)}</TableCell>
                <TableCell align="right">{person.exit_velocity}</TableCell>
                <TableCell align="right">{person.launch_angle}</TableCell>
                <TableCell align="right">{person.distance}</TableCell>
                <TableCell align="right">{String(person.favorite)}</TableCell>
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
