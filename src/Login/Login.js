import React, { useState } from 'react';
import axios from 'axios';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import Header from '../Header/Header';
import ErrorWithDelay from '../ErrorWithDelay';

function Login() {
  const history = useHistory();
  const [formError, setFormError] = useState(false);
  return (
    <>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.loginView}>
          <div className={styles.formContainer}>
            <div className={styles.flexContainer}>
              <div className={styles.welcome}>
                <div className={styles.welcomeToBasebal}>Welcome to BaseballCloud!</div>
                <div className={styles.signIntoYour}>Sign into your account here:</div>
              </div>

              <Form
                onSubmit={formObj => {
                  axios
                    .post(`https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_in`, {
                      email: formObj.email,
                      password: formObj.password,
                    })
                    .then(response => {
                      const accessToken = response.headers.[`access-token`];
                      const { client, uid } = response.headers;
                      localStorage.accessToken = accessToken;
                      localStorage.client = client;
                      localStorage.uid = uid;
                      history.push('/profile');
                    })
                    .catch(error => {
                      setFormError(true);
                      console.log(error);
                    });
                }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Email Required';
                  }
                  if (!values.password) {
                    errors.password = 'Email Required';
                  }
                  return errors;
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.wrapper}>
                      <div className={styles.wrapper2}>
                        <Field name="email">
                          {({ input }) => (
                            <input className={styles.input} placeholder="Email" type="email" {...input} />
                          )}
                        </Field>
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIuMDAyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0yMTAuMzUxNTYyIDI0Ni42MzI4MTJjMzMuODgyODEzIDAgNjMuMjIyNjU3LTEyLjE1MjM0MyA4Ny4xOTUzMTMtMzYuMTI4OTA2IDIzLjk3MjY1Ni0yMy45NzI2NTYgMzYuMTI1LTUzLjMwNDY4NyAzNi4xMjUtODcuMTkxNDA2IDAtMzMuODc1LTEyLjE1MjM0NC02My4yMTA5MzgtMzYuMTI4OTA2LTg3LjE5MTQwNi0yMy45NzY1NjMtMjMuOTY4NzUtNTMuMzEyNS0zNi4xMjEwOTQtODcuMTkxNDA3LTM2LjEyMTA5NC0zMy44ODY3MTggMC02My4yMTg3NSAxMi4xNTIzNDQtODcuMTkxNDA2IDM2LjEyNXMtMzYuMTI4OTA2IDUzLjMwODU5NC0zNi4xMjg5MDYgODcuMTg3NWMwIDMzLjg4NjcxOSAxMi4xNTYyNSA2My4yMjI2NTYgMzYuMTMyODEyIDg3LjE5NTMxMiAyMy45NzY1NjMgMjMuOTY4NzUgNTMuMzEyNSAzNi4xMjUgODcuMTg3NSAzNi4xMjV6bTAgMCIgZmlsbD0iIzY2Nzc4NCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTQyNi4xMjg5MDYgMzkzLjcwMzEyNWMtLjY5MTQwNi05Ljk3NjU2My0yLjA4OTg0NC0yMC44NTkzNzUtNC4xNDg0MzctMzIuMzUxNTYzLTIuMDc4MTI1LTExLjU3ODEyNC00Ljc1MzkwNy0yMi41MjM0MzctNy45NTcwMzEtMzIuNTI3MzQzLTMuMzA4NTk0LTEwLjMzOTg0NC03LjgwODU5NC0yMC41NTA3ODEtMTMuMzcxMDk0LTMwLjMzNTkzOC01Ljc3MzQzOC0xMC4xNTYyNS0xMi41NTQ2ODgtMTktMjAuMTY0MDYzLTI2LjI3NzM0My03Ljk1NzAzMS03LjYxMzI4Mi0xNy42OTkyMTktMTMuNzM0Mzc2LTI4Ljk2NDg0My0xOC4xOTkyMTktMTEuMjI2NTYzLTQuNDQxNDA3LTIzLjY2Nzk2OS02LjY5MTQwNy0zNi45NzY1NjMtNi42OTE0MDctNS4yMjY1NjMgMC0xMC4yODEyNSAyLjE0NDUzMi0yMC4wNDI5NjkgOC41LTYuMDA3ODEyIDMuOTE3OTY5LTEzLjAzNTE1NiA4LjQ0OTIxOS0yMC44Nzg5MDYgMTMuNDYwOTM4LTYuNzA3MDMxIDQuMjczNDM4LTE1Ljc5Mjk2OSA4LjI3NzM0NC0yNy4wMTU2MjUgMTEuOTAyMzQ0LTEwLjk0OTIxOSAzLjU0Mjk2OC0yMi4wNjY0MDYgNS4zMzk4NDQtMzMuMDM5MDYzIDUuMzM5ODQ0LTEwLjk3MjY1NiAwLTIyLjA4NTkzNy0xLjc5Njg3Ni0zMy4wNDY4NzQtNS4zMzk4NDQtMTEuMjEwOTM4LTMuNjIxMDk0LTIwLjI5Njg3Ni03LjYyNS0yNi45OTYwOTQtMTEuODk4NDM4LTcuNzY5NTMyLTQuOTY0ODQ0LTE0LjgwMDc4Mi05LjQ5NjA5NC0yMC44OTg0MzgtMTMuNDY4NzUtOS43NS02LjM1NTQ2OC0xNC44MDg1OTQtOC41LTIwLjAzNTE1Ni04LjUtMTMuMzEyNSAwLTI1Ljc1IDIuMjUzOTA2LTM2Ljk3MjY1NiA2LjY5OTIxOS0xMS4yNTc4MTMgNC40NTcwMzEtMjEuMDAzOTA2IDEwLjU3ODEyNS0yOC45Njg3NSAxOC4xOTkyMTktNy42MDU0NjkgNy4yODEyNS0xNC4zOTA2MjUgMTYuMTIxMDk0LTIwLjE1NjI1IDI2LjI3MzQzNy01LjU1ODU5NCA5Ljc4NTE1Ny0xMC4wNTg1OTQgMTkuOTkyMTg4LTEzLjM3MTA5NCAzMC4zMzk4NDQtMy4xOTkyMTkgMTAuMDAzOTA2LTUuODc1IDIwLjk0NTMxMy03Ljk1MzEyNSAzMi41MjM0MzctMi4wNTg1OTQgMTEuNDc2NTYzLTMuNDU3MDMxIDIyLjM2MzI4Mi00LjE0ODQzNyAzMi4zNjMyODItLjY3OTY4OCA5Ljc5Njg3NS0xLjAyMzQzOCAxOS45NjQ4NDQtMS4wMjM0MzggMzAuMjM0Mzc1IDAgMjYuNzI2NTYyIDguNDk2MDk0IDQ4LjM2MzI4MSAyNS4yNSA2NC4zMjAzMTIgMTYuNTQ2ODc1IDE1Ljc0NjA5NCAzOC40NDE0MDYgMjMuNzM0Mzc1IDY1LjA2NjQwNiAyMy43MzQzNzVoMjQ2LjUzMTI1YzI2LjYyNSAwIDQ4LjUxMTcxOS03Ljk4NDM3NSA2NS4wNjI1LTIzLjczNDM3NSAxNi43NTc4MTMtMTUuOTQ1MzEyIDI1LjI1MzkwNi0zNy41ODU5MzcgMjUuMjUzOTA2LTY0LjMyNDIxOS0uMDAzOTA2LTEwLjMxNjQwNi0uMzUxNTYyLTIwLjQ5MjE4Ny0xLjAzNTE1Ni0zMC4yNDIxODd6bTAgMCIgZmlsbD0iIzY2Nzc4NCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4="
                          className={styles.iconWrapper}
                        />
                        <div className={styles.error}>
                          <ErrorWithDelay name="email" delay={1000}>
                            {error => <span>{error}</span>}
                          </ErrorWithDelay>
                        </div>
                      </div>
                    </div>

                    <div className={styles.wrapper}>
                      <div className={styles.wrapper2}>
                        <Field name="password">
                          {({ input }) => (
                            <input className={styles.input} placeholder="Password" type="password" {...input} />
                          )}
                        </Field>
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQwMS45OTggNDAxLjk5OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNMzU3LjQ1LDE5MC43MjFjLTUuMzMxLTUuMzMtMTEuOC03Ljk5My0xOS40MTctNy45OTNoLTkuMTMxdi01NC44MjFjMC0zNS4wMjItMTIuNTU5LTY1LjA5My0zNy42ODUtOTAuMjE4ICAgQzI2Ni4wOTMsMTIuNTYzLDIzNi4wMjUsMCwyMDAuOTk4LDBjLTM1LjAyNiwwLTY1LjEsMTIuNTYzLTkwLjIyMiwzNy42ODhDODUuNjUsNjIuODE0LDczLjA5MSw5Mi44ODQsNzMuMDkxLDEyNy45MDd2NTQuODIxICAgaC05LjEzNWMtNy42MTEsMC0xNC4wODQsMi42NjMtMTkuNDE0LDcuOTkzYy01LjMzLDUuMzI2LTcuOTk0LDExLjc5OS03Ljk5NCwxOS40MTdWMzc0LjU5YzAsNy42MTEsMi42NjUsMTQuMDg2LDcuOTk0LDE5LjQxNyAgIGM1LjMzLDUuMzI1LDExLjgwMyw3Ljk5MSwxOS40MTQsNy45OTFIMzM4LjA0YzcuNjE3LDAsMTQuMDg1LTIuNjYzLDE5LjQxNy03Ljk5MWM1LjMyNS01LjMzMSw3Ljk5NC0xMS44MDYsNy45OTQtMTkuNDE3VjIxMC4xMzUgICBDMzY1LjQ1NSwyMDIuNTIzLDM2Mi43ODIsMTk2LjA1MSwzNTcuNDUsMTkwLjcyMXogTTI3NC4wODcsMTgyLjcyOEgxMjcuOTA5di01NC44MjFjMC0yMC4xNzUsNy4xMzktMzcuNDAyLDIxLjQxNC01MS42NzUgICBjMTQuMjc3LTE0LjI3NSwzMS41MDEtMjEuNDExLDUxLjY3OC0yMS40MTFjMjAuMTc5LDAsMzcuMzk5LDcuMTM1LDUxLjY3NywyMS40MTFjMTQuMjcxLDE0LjI3MiwyMS40MDksMzEuNSwyMS40MDksNTEuNjc1VjE4Mi43MjggICB6IiBmaWxsPSIjNjY3Nzg0IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                          className={styles.iconWrapper}
                        />
                        <div className={styles.error}>
                          <ErrorWithDelay name="password" delay={1000}>
                            {error => <span>{error}</span>}
                          </ErrorWithDelay>
                        </div>
                      </div>
                    </div>
                    {formError && <div className={styles.error}>Invalid login credentials. Please try again.</div>}

                    <button type="submit" className={styles.button}>
                      Sign In
                    </button>
                    <div className={styles.forgottenPasswordWrapper}>
                      <a href="/">Forgotten password?</a>
                    </div>
                    <div className={styles.singUpWrapper}>
                      <div className={styles.dontHaveAnAccount}>Don’t have an account?</div>
                      <a className={styles.singUp} href="/registration">
                        Sign Up
                      </a>
                    </div>
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
