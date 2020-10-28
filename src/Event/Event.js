import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { light } from '@material-ui/core/styles/createPalette';
import Header from '../Header/Header';
import queryProfiles from './requests/queryProfiles';
import queryProfileEvents from './requests/queryProfileEvents';
import styles from './Event.module.css';
import queryEventDetail from './requests/queryEventDetail';

const Event = () => {
  const [profiles, setProfiles] = useState('');
  const [profilesVisible, setProfilesVisible] = useState('false');
  const [profileEvents, setProfileEvents] = useState('');
  const [eventDetail, setEventDetail] = useState('');
  const { eventId, profileId } = useParams();
  const history = useHistory();

  useEffect(() => {
    queryProfiles(localStorage.accessToken, localStorage.client, localStorage.uid, eventId)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        setProfiles(response.data.data.profiles.profiles);
        console.log(response.data.data.profiles.total_count);
      });
    queryProfileEvents(localStorage.accessToken, localStorage.client, profileId)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setProfileEvents(response.data.data.profile_events);
      });
    queryEventDetail(localStorage.accessToken, localStorage.client, localStorage.uid, profileId)
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        console.log(JSON.stringify(response, undefined, 2));
        setEventDetail(response.data.data.event_detail);
      });
  }, [profileId]);
  if (profiles === '' || profileEvents === '' || eventDetail === '') {
    return <p>Event load...</p>;
  }
  return (
    <>
      <Header />
      <div className={styles.mainContent}>
        <div>
          <div>
            <button onClick={() => setProfilesVisible(!profilesVisible)}>{eventDetail.profile}</button>
            {!profilesVisible && (
              <div>
                {profiles.map(profile => (
                  <div
                    key={profile.id}
                    onClick={() => {
                      history.push(`/event/${eventId}/${profile.id}`);
                      setProfilesVisible(!profilesVisible);
                    }}
                  >
                    {profile.first_name} {profile.last_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <aside>
              <ul>
                {profileEvents.events.map(event => (
                  <li key={event.id}>
                    <span>{event.date}</span>
                    <span>{event.event_type}</span>
                    <span>{event.event_name}</span>
                  </li>
                ))}
              </ul>
            </aside>
            <aside>
              <ul>
                <li>Player Summary</li>
                <li>Player Log</li>
                <li>Session Hitting</li>
                <li>Session Pitching</li>
              </ul>
            </aside>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
