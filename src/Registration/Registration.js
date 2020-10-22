import React from 'react';
import axios from 'axios';
import { Field, Form } from 'react-final-form';
import { GraphQLClient,  gql } from 'graphql-request';
import styles from './Registration.module.css';

function Registration() {
  async function queryRegistration(accessToken, client, uid) {

    const endpoint = 'https://baseballcloud-back.herokuapp.com/api/v1/graphql';

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "access-token": accessToken,
        "client": client,
        "uid": uid
      },
    });

    const variables = {
      input: {type: "exit_velocity"},
    }

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
  }

return (
      <div className={styles.signUpView }>
        <div className={styles.formContainer}>
          <div className={styles.signUpContent}>
            <div className={styles.flexContainer}>
              <div className={styles.topBlock}>
                <button className={styles.asPlayerButton}>
                  <span className={styles.asPlayerSpan}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15"><path fill="#FFF" fillRule="evenodd" d="M6.116 10.884l5.482-5.482a.566.566 0 0 0 0-.804l-.91-.91a.566.566 0 0 0-.804 0l-4.17 4.17L3.83 5.972a.566.566 0 0 0-.803 0l-.91.91a.566.566 0 0 0 0 .804l3.196 3.197c.223.223.58.223.803 0zM13.714 3v8.571a2.572 2.572 0 0 1-2.571 2.572H2.57A2.572 2.572 0 0 1 0 11.57V3A2.572 2.572 0 0 1 2.571.429h8.572A2.572 2.572 0 0 1 13.714 3z"></path></svg>
                  </span>
                  Sign Up as Player
                </button>
                <button className={styles.asScoutButton}>
                  <span className={styles.asScoutSpan}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15"><path fill="#FFF" fillRule="evenodd" d="M6.116 10.884l5.482-5.482a.566.566 0 0 0 0-.804l-.91-.91a.566.566 0 0 0-.804 0l-4.17 4.17L3.83 5.972a.566.566 0 0 0-.803 0l-.91.91a.566.566 0 0 0 0 .804l3.196 3.197c.223.223.58.223.803 0zM13.714 3v8.571a2.572 2.572 0 0 1-2.571 2.572H2.57A2.572 2.572 0 0 1 0 11.57V3A2.572 2.572 0 0 1 2.571.429h8.572A2.572 2.572 0 0 1 13.714 3z"></path></svg>
                     </span>
                  Sign Up as Scout
                </button>
              </div>
              <div className={styles.playersBox}>
                <div className={styles.players}>
                  Players
                </div>
                <div className={styles.playersDescription}>
                  <p className={styles.playersDescriptioP}>
                  У игроков есть собственный профиль в системе, и они планируют собирать данные.
                  </p>
                </div>
              </div>
              <Form
    onSubmit={formObj => {
        axios
    .post(`https://baseballcloud-back.herokuapp.com/api/v1/auth`, {
      email: formObj.email,
      password: formObj.password,
      password_confirmation: formObj.passwordConfirmation,
      role: "player"
    })
    .then(response => {
      console.log(response);
      const accessToken = response.headers.[`access-token`];
      const {client, uid} = response.headers
      localStorage.accessToken = accessToken;
      localStorage.client = client;
      localStorage.uid = uid;
      queryRegistration(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
    });
    }}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <div className={styles.innerInputWrapper}>
          <Field name="email">{({ input }) => <input className={styles.input} placeholder="Email" type="email" {...input} />}</Field>
          </div>
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIuMDAyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0yMTAuMzUxNTYyIDI0Ni42MzI4MTJjMzMuODgyODEzIDAgNjMuMjIyNjU3LTEyLjE1MjM0MyA4Ny4xOTUzMTMtMzYuMTI4OTA2IDIzLjk3MjY1Ni0yMy45NzI2NTYgMzYuMTI1LTUzLjMwNDY4NyAzNi4xMjUtODcuMTkxNDA2IDAtMzMuODc1LTEyLjE1MjM0NC02My4yMTA5MzgtMzYuMTI4OTA2LTg3LjE5MTQwNi0yMy45NzY1NjMtMjMuOTY4NzUtNTMuMzEyNS0zNi4xMjEwOTQtODcuMTkxNDA3LTM2LjEyMTA5NC0zMy44ODY3MTggMC02My4yMTg3NSAxMi4xNTIzNDQtODcuMTkxNDA2IDM2LjEyNXMtMzYuMTI4OTA2IDUzLjMwODU5NC0zNi4xMjg5MDYgODcuMTg3NWMwIDMzLjg4NjcxOSAxMi4xNTYyNSA2My4yMjI2NTYgMzYuMTMyODEyIDg3LjE5NTMxMiAyMy45NzY1NjMgMjMuOTY4NzUgNTMuMzEyNSAzNi4xMjUgODcuMTg3NSAzNi4xMjV6bTAgMCIgZmlsbD0iIzY2Nzc4NCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTQyNi4xMjg5MDYgMzkzLjcwMzEyNWMtLjY5MTQwNi05Ljk3NjU2My0yLjA4OTg0NC0yMC44NTkzNzUtNC4xNDg0MzctMzIuMzUxNTYzLTIuMDc4MTI1LTExLjU3ODEyNC00Ljc1MzkwNy0yMi41MjM0MzctNy45NTcwMzEtMzIuNTI3MzQzLTMuMzA4NTk0LTEwLjMzOTg0NC03LjgwODU5NC0yMC41NTA3ODEtMTMuMzcxMDk0LTMwLjMzNTkzOC01Ljc3MzQzOC0xMC4xNTYyNS0xMi41NTQ2ODgtMTktMjAuMTY0MDYzLTI2LjI3NzM0My03Ljk1NzAzMS03LjYxMzI4Mi0xNy42OTkyMTktMTMuNzM0Mzc2LTI4Ljk2NDg0My0xOC4xOTkyMTktMTEuMjI2NTYzLTQuNDQxNDA3LTIzLjY2Nzk2OS02LjY5MTQwNy0zNi45NzY1NjMtNi42OTE0MDctNS4yMjY1NjMgMC0xMC4yODEyNSAyLjE0NDUzMi0yMC4wNDI5NjkgOC41LTYuMDA3ODEyIDMuOTE3OTY5LTEzLjAzNTE1NiA4LjQ0OTIxOS0yMC44Nzg5MDYgMTMuNDYwOTM4LTYuNzA3MDMxIDQuMjczNDM4LTE1Ljc5Mjk2OSA4LjI3NzM0NC0yNy4wMTU2MjUgMTEuOTAyMzQ0LTEwLjk0OTIxOSAzLjU0Mjk2OC0yMi4wNjY0MDYgNS4zMzk4NDQtMzMuMDM5MDYzIDUuMzM5ODQ0LTEwLjk3MjY1NiAwLTIyLjA4NTkzNy0xLjc5Njg3Ni0zMy4wNDY4NzQtNS4zMzk4NDQtMTEuMjEwOTM4LTMuNjIxMDk0LTIwLjI5Njg3Ni03LjYyNS0yNi45OTYwOTQtMTEuODk4NDM4LTcuNzY5NTMyLTQuOTY0ODQ0LTE0LjgwMDc4Mi05LjQ5NjA5NC0yMC44OTg0MzgtMTMuNDY4NzUtOS43NS02LjM1NTQ2OC0xNC44MDg1OTQtOC41LTIwLjAzNTE1Ni04LjUtMTMuMzEyNSAwLTI1Ljc1IDIuMjUzOTA2LTM2Ljk3MjY1NiA2LjY5OTIxOS0xMS4yNTc4MTMgNC40NTcwMzEtMjEuMDAzOTA2IDEwLjU3ODEyNS0yOC45Njg3NSAxOC4xOTkyMTktNy42MDU0NjkgNy4yODEyNS0xNC4zOTA2MjUgMTYuMTIxMDk0LTIwLjE1NjI1IDI2LjI3MzQzNy01LjU1ODU5NCA5Ljc4NTE1Ny0xMC4wNTg1OTQgMTkuOTkyMTg4LTEzLjM3MTA5NCAzMC4zMzk4NDQtMy4xOTkyMTkgMTAuMDAzOTA2LTUuODc1IDIwLjk0NTMxMy03Ljk1MzEyNSAzMi41MjM0MzctMi4wNTg1OTQgMTEuNDc2NTYzLTMuNDU3MDMxIDIyLjM2MzI4Mi00LjE0ODQzNyAzMi4zNjMyODItLjY3OTY4OCA5Ljc5Njg3NS0xLjAyMzQzOCAxOS45NjQ4NDQtMS4wMjM0MzggMzAuMjM0Mzc1IDAgMjYuNzI2NTYyIDguNDk2MDk0IDQ4LjM2MzI4MSAyNS4yNSA2NC4zMjAzMTIgMTYuNTQ2ODc1IDE1Ljc0NjA5NCAzOC40NDE0MDYgMjMuNzM0Mzc1IDY1LjA2NjQwNiAyMy43MzQzNzVoMjQ2LjUzMTI1YzI2LjYyNSAwIDQ4LjUxMTcxOS03Ljk4NDM3NSA2NS4wNjI1LTIzLjczNDM3NSAxNi43NTc4MTMtMTUuOTQ1MzEyIDI1LjI1MzkwNi0zNy41ODU5MzcgMjUuMjUzOTA2LTY0LjMyNDIxOS0uMDAzOTA2LTEwLjMxNjQwNi0uMzUxNTYyLTIwLjQ5MjE4Ny0xLjAzNTE1Ni0zMC4yNDIxODd6bTAgMCIgZmlsbD0iIzY2Nzc4NCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4=" className={styles.iconWrapper}/>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.innerInputWrapper}>
          <Field name="password">{({ input }) => <input className={styles.input} placeholder="Password" type="password" {...input} />}</Field>
          </div>
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQwMS45OTggNDAxLjk5OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNMzU3LjQ1LDE5MC43MjFjLTUuMzMxLTUuMzMtMTEuOC03Ljk5My0xOS40MTctNy45OTNoLTkuMTMxdi01NC44MjFjMC0zNS4wMjItMTIuNTU5LTY1LjA5My0zNy42ODUtOTAuMjE4ICAgQzI2Ni4wOTMsMTIuNTYzLDIzNi4wMjUsMCwyMDAuOTk4LDBjLTM1LjAyNiwwLTY1LjEsMTIuNTYzLTkwLjIyMiwzNy42ODhDODUuNjUsNjIuODE0LDczLjA5MSw5Mi44ODQsNzMuMDkxLDEyNy45MDd2NTQuODIxICAgaC05LjEzNWMtNy42MTEsMC0xNC4wODQsMi42NjMtMTkuNDE0LDcuOTkzYy01LjMzLDUuMzI2LTcuOTk0LDExLjc5OS03Ljk5NCwxOS40MTdWMzc0LjU5YzAsNy42MTEsMi42NjUsMTQuMDg2LDcuOTk0LDE5LjQxNyAgIGM1LjMzLDUuMzI1LDExLjgwMyw3Ljk5MSwxOS40MTQsNy45OTFIMzM4LjA0YzcuNjE3LDAsMTQuMDg1LTIuNjYzLDE5LjQxNy03Ljk5MWM1LjMyNS01LjMzMSw3Ljk5NC0xMS44MDYsNy45OTQtMTkuNDE3VjIxMC4xMzUgICBDMzY1LjQ1NSwyMDIuNTIzLDM2Mi43ODIsMTk2LjA1MSwzNTcuNDUsMTkwLjcyMXogTTI3NC4wODcsMTgyLjcyOEgxMjcuOTA5di01NC44MjFjMC0yMC4xNzUsNy4xMzktMzcuNDAyLDIxLjQxNC01MS42NzUgICBjMTQuMjc3LTE0LjI3NSwzMS41MDEtMjEuNDExLDUxLjY3OC0yMS40MTFjMjAuMTc5LDAsMzcuMzk5LDcuMTM1LDUxLjY3NywyMS40MTFjMTQuMjcxLDE0LjI3MiwyMS40MDksMzEuNSwyMS40MDksNTEuNjc1VjE4Mi43MjggICB6IiBmaWxsPSIjNjY3Nzg0IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==" className={styles.iconWrapper}/>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.innerInputWrapper}>
          <Field name="passwordConfirmation">{({ input }) => <input className={styles.input} placeholder="Password confirmation" type="password" {...input}/>}</Field>
          </div>
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQxNy44MTMzMyA0MTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTE1OS45ODgyODEgMzE4LjU4MjAzMWMtMy45ODgyODEgNC4wMTE3MTktOS40Mjk2ODcgNi4yNS0xNS4wODIwMzEgNi4yNXMtMTEuMDkzNzUtMi4yMzgyODEtMTUuMDgyMDMxLTYuMjVsLTEyMC40NDkyMTktMTIwLjQ2ODc1Yy0xMi41LTEyLjUtMTIuNS0zMi43Njk1MzEgMC00NS4yNDYwOTNsMTUuMDgyMDMxLTE1LjA4NTkzOGMxMi41MDM5MDctMTIuNSAzMi43NS0xMi41IDQ1LjI1IDBsNzUuMTk5MjE5IDc1LjIwMzEyNSAyMDMuMTk5MjE5LTIwMy4yMDMxMjVjMTIuNTAzOTA2LTEyLjUgMzIuNzY5NTMxLTEyLjUgNDUuMjUgMGwxNS4wODIwMzEgMTUuMDg1OTM4YzEyLjUgMTIuNSAxMi41IDMyLjc2NTYyNCAwIDQ1LjI0NjA5M3ptMCAwIiBmaWxsPSIjNjY3Nzg0IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PC9nPjwvc3ZnPg==" className={styles.iconWrapper}/>
        </div>
        <div className={styles.privacyPolicy}>
          By clicking Sign Up, you agree to our <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
        </div>

        <button  className={styles.singUpButton} type="submit">Sing in</button>
      </form>
    )}
  </Form>
            </div>
          </div>
        </div>
      </div>
)
}

export default Registration;
