/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import Select from 'react-select';
import Pagination from '@material-ui/lab/Pagination';
import queryProfiles from './requests/queryProfiles';
import mutationUpdateProfile from '../LeaderBoard/requests/mutationUpdateFavoriteProfile';
import heart from '../img/heart.png';
import like from '../img/like.png';

function Network() {
  const [profiles, setProfiles] = useState('');
  const [totalCount, setTotalCount] = useState('');
  useEffect(() => {
    queryProfiles(localStorage.accessToken, localStorage.client, localStorage.uid, {})
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        setProfiles(response.data.data.profiles.profiles);
        console.log(response.data.data.profiles.total_count);
        setTotalCount(response.data.data.profiles.total_count);
      });
  }, []);

  const onSubmit = async values => {
    console.log(values);
    queryProfiles(localStorage.accessToken, localStorage.client, localStorage.uid, values)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
        setProfiles(response.data.data.profiles.profiles);
      });
  };

  if (profiles === '' || totalCount === '') {
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
          if (isNaN(event.currentTarget.value) || event.currentTarget.value === '') {
            input.onChange(event.currentTarget.value);
          } else {
            input.onChange(+event.currentTarget.value);
          }

          submit();
        }}
      />
    </div>
  );

  const pagination = ({ input }) => (
    <div>
      <Pagination
        count={6}
        variant="outlined"
        shape="rounded"
        onChange={(event, page) => {
          console.log(page);
          input.onChange(page);
          submit();
        }}
      />
    </div>
  );

  return (
    <>
      <h1>Network</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => {
          submit = handleSubmit;
          return (
            <form id="exampleForm" onSubmit={handleSubmit}>
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
                <Field name="age" component={inputText} placeholder="Age" />
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
              <Field
                name="profilesСount"
                component={ReactSelect}
                placeholder="Profiles Сount"
                options={[
                  {
                    value: '10',
                    label: '10',
                  },
                  {
                    value: '15',
                    label: '15',
                  },
                  {
                    value: '25',
                    label: '25',
                  },
                ]}
              ></Field>

              <Field name="playerName" component={inputText} type="text" placeholder="Player Name" />
              <Field name="tableNavigation" component={pagination} />
            </form>
          );
        }}
      />
      {`Available Players ${totalCount}`}
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
                {/* <TableCell component="th" scope="row">
                  {row.first_name} {row.last_name}
                </TableCell> */}
                <TableCell align="center">
                  <Link to={`/profile/${row.id}`}>
                    {row.first_name} {row.last_name}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {row.events.length !== 0 && row.events.length} {row.events.length === 0 && '-'}
                </TableCell>
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
