/* eslint-disable no-console */
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
import queryProfiles from './requests/queryProfiles';
import mutationUpdateProfile from '../LeaderBoard/requests/mutationUpdateFavoriteProfile';
import heart from '../img/heart.png';
import like from '../img/fullHeart.png';
import InputText from '../InputText/InputText';
import InputNum from '../InputNum/InputNum';
import TableNavigation from '../TableNavigation/TableNavigation';
import ReactSelect from '../ReactSelect/ReactSelect';
import Styles from './Network.module.css';
import Header from '../Header/Header';

function Network() {
  const [profiles, setProfiles] = useState('');
  const [totalCount, setTotalCount] = useState('');
  const [profilesСount, setProfilesСount] = useState(10);
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
        setTotalCount(response.data.data.profiles.total_count);
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

  return (
    <>
      <Header />
      <div className={Styles.mainContent}>
        <div className={Styles.container}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => {
              submit = handleSubmit;
              return (
                <form id="exampleForm" onSubmit={handleSubmit}>
                  <div className={Styles.pageHeader}>
                    <div className={Styles.networkText}>Network</div>
                    <div className={Styles.filtersContainer}>
                      <div>
                        <label>School</label>
                        <Field
                          name="school"
                          handleSubmit={submit}
                          component={InputText}
                          type="text"
                          placeholder="School"
                        />
                      </div>
                      <div>
                        <label>Team</label>
                        <Field name="team" handleSubmit={submit} component={InputText} type="text" placeholder="Team" />
                      </div>
                      <Field
                        name="position"
                        component={ReactSelect}
                        placeholder="Position"
                        handleSubmit={submit}
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
                        <Field name="age" handleSubmit={submit} component={InputNum} placeholder="Age" />
                      </div>
                      <Field
                        name="favorite"
                        component={ReactSelect}
                        placeholder="Favorite"
                        handleSubmit={submit}
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
                        setProfilesСount={setProfilesСount}
                        handleSubmit={submit}
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
                    </div>
                  </div>
                  <div className={Styles.tableFilter}>
                    <div className={Styles.availablePlayers}>{`Available Players ${totalCount}`}</div>
                    <div className={Styles.PlayerName}>
                      <Field
                        name="playerName"
                        handleSubmit={submit}
                        component={InputText}
                        type="text"
                        placeholder="Player Name"
                      />
                    </div>
                  </div>
                  <div className={Styles.tableWrapper}>
                    <div className={Styles.table}>
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
                            {console.log(profiles)}
                            {profiles.map(row => (
                              <TableRow key={row.id}>
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
                                  {!row.favorite && (
                                    <img onClick={() => updateFavorite(row.id, true)} src={heart} alt="Heart" />
                                  )}{' '}
                                  {row.favorite && (
                                    <img src={like} onClick={() => updateFavorite(row.id, false)} alt="Like" />
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div className={Styles.pagination}>
                      <Field
                        name="tableNavigation"
                        handleSubmit={submit}
                        component={TableNavigation}
                        profilesСount={profilesСount}
                        totalCount={totalCount}
                      />
                    </div>
                  </div>
                </form>
              );
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Network;
