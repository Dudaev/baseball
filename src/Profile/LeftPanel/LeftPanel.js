import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Profile.module.css';

const LeftPanel = ({ profile, personId, setVisibleForm }) => {
  if (profile === '') {
    return <p>Loading LeftPanel…</p>;
  }
  return (
    <>
      {profile !== '' && (
        <div className={styles.sideBar}>
          {personId === undefined && <button onClick={() => setVisibleForm(true)}>Edit</button>}
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
            {profile.teams !== '' && (
              <div>
                <div>Team</div>
                <div>{profile.teams.map(team => `${team.name}, `)}</div>
              </div>
            )}
            {!profile.facilities.length !== true && (
              <div>
                <div>Facility</div>
                <div>{profile.facilities[0].u_name}</div>
              </div>
            )}
            {profile.biography !== '' && (
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

LeftPanel.propTypes = {
  profile: PropTypes.object,
  setVisibleForm: PropTypes.func,
  personId: PropTypes.object,
};

export default LeftPanel;
