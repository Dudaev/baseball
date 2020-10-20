import React from 'react';
import axios from 'axios';
import { Field, Form } from 'react-final-form';
import styles from './Login.module.css';

function Login() {

return (
  <>
  <div className={styles.mainContent}>
    <div className={styles.loginView}>
      <div className={styles.formContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.welcome}>
            <div className={styles.welcomeToBasebal}>
            Welcome to BaseballCloud!
            </div>
            <div className={styles.signIntoYour}>
            Sign into your account here:
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
                const {client, uid} = response.headers
                localStorage.accessToken = accessToken;
                localStorage.client = client;
                localStorage.uid = uid;
              });
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                <div className={styles.wrapper}>
                <Field name="email">{({ input }) => <input className={styles.input} placeholder="Email" type="email" {...input} />}</Field>

                </div>
                <div className={styles.wrapper}>
                <Field name="password">{({ input }) => <input className={styles.input} placeholder="Password" type="password" {...input} />}</Field>

                </div>
                    <button type="submit">Sing in</button>
                </form>
              )}
            </Form>
          </div>

        </div>

      </div>

    </div>

  </div>


  </>

)
}

export default Login;
