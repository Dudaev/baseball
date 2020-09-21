import React, { useEffect, useState } from 'react';
// import { Field, Form } from 'react-final-form';
import { GraphQLClient, gql } from 'graphql-request';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

let response;

async function queryLeaderboardBatting(accessToken, client, uid) {
  const endpoint = 'https://baseballcloud-back.herokuapp.com/api/v1/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'access-token': accessToken,
      client,
      uid,
    },
  });

  const variables = {
    input: { type: 'exit_velocity' },
  };

  const query = gql`
    query LeaderboardBatting($input: FilterLeaderboardInput!) {
      leaderboard_batting(input: $input) {
        leaderboard_batting {
          batter_name
          exit_velocity
          launch_angle
          distance
          batter_datraks_id
          age
          school {
            id
            name
          }
          teams {
            id
            name
          }
          favorite
        }
      }
    }
  `;
  const data = await graphQLClient.request(query, variables);
  console.log(JSON.stringify(data, undefined, 2));
  return data;
}

function LeaderBoard() {
  const [data, setData] = useState('Дефолт');

  useEffect(() => {
    queryLeaderboardBatting(localStorage.accessToken, localStorage.client, localStorage.uid).then(v => {
      setData(v.leaderboard_batting.leaderboard_batting); // prints 60 after 4 seconds.
    });
    // setData(response);
    // console.log(`data = ${data}`);
  }, []);

  const classes = useStyles();

  return (
    <>
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
              <TableCell align="right">Launch Angle</TableCell>
              <TableCell align="right">Distance</TableCell>
              <TableCell align="right">Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {/* <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {console.log(data)}
      {console.log(rows)}
    </>
  );
}

export default LeaderBoard;
