import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Profile from './Profile/Profile';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import Network from './Network/Network';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import Event from './Event/Event';

export default function App() {
  return (
    <Router>
      <div className={styles.main}>
        <Route path="/profile/:personId?">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/network">
          <Network />
        </Route>
        <Route path="/leaderboard">
          <LeaderBoard />
        </Route>
        <Route path="/event/:eventId?/:profileId?">
          <Event />
        </Route>
        <footer>
          <div className={styles.legal}>
            <span>© 2018 BaseballCloud</span>
            <a href="/">Terms of Service</a>
            <a href="/">Privacy Policy</a>
          </div>
          <div className={styles.socialMedia}>
            <a href="https://baseballcloud.blog" target="_blank" rel="noopener noreferrer">
              Blog
            </a>
            <a href="http://twitter.com/baseballcloudus" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="http://www.instagram.com/baseballcloudus/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="http://www.facebook.com/BaseballCloudUS/" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}
