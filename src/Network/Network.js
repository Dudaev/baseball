import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import queryProfiles from './requests/queryProfiles';
import mutationUpdateProfile from '../LeaderBoard/requests/mutationUpdateFavoriteProfile';
import heart from '../img/heart.png';
import like from '../img/like.png';

function Network() {
  const [profiles, setProfiles] = useState('');
  useEffect(() => {
    queryProfiles(localStorage.accessToken, localStorage.client, localStorage.uid)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        // eslint-disable-next-line no-plusplus
        setProfiles(response.data.data.profiles.profiles);
        // .map(person => {
        //   const { id, position, position2, school_year, feet, inches, weight, ...data } = person;
        //   return data;
        // }),
      });
  }, []);

  if (profiles === '') {
    return <p>Loading…</p>;
  }

  function updateFavorite(PersonId, isFavorite) {
    mutationUpdateProfile(localStorage.accessToken, localStorage.client, localStorage.uid, PersonId, isFavorite)
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        setProfiles(
          profiles.map(data => {
            const player = data;
            if (player.id === PersonId) {
              player.favorite = isFavorite;
            }
            return player;
          }),
        );
      });
  }

  return (
    <>
      <h1>Network</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell align="center">Sessions</TableCell>
              <TableCell align="center">School</TableCell>
              <TableCell align="center">Teams</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.first_name} {row.last_name}
                </TableCell>
                <TableCell align="center">
                  {row.events.length !== 0 && row.events.length} {row.events.length === 0 && '-'}
                </TableCell>
                {/* {!row.school && <TableCell align="center">-</TableCell>} */}
                <TableCell align="center">
                  {row.school && row.school.name} {!row.school && '-'}
                </TableCell>
                <TableCell align="center">
                  {+row.teams !== 0 && row.teams.map(team => `${team.name}`)} {+row.teams === 0 && '-'}
                </TableCell>
                <TableCell align="center">{row.age}</TableCell>
                <TableCell align="center">
                  {!row.favorite && <img onClick={() => updateFavorite(row.id, true)} src={heart} alt="Heart" />}{' '}
                  {row.favorite && <img src={like} onClick={() => updateFavorite(row.id, false)} alt="Like" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Network;
