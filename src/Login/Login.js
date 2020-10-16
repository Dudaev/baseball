import React from 'react';
import axios from 'axios';
import { Field, Form } from 'react-final-form';

function Login() {

return (
  <>
  <h1>Login</h1>
     <Form
    onSubmit={formObj => {
        axios
    .post(`https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_in`, {
      email: formObj.email,
      password: formObj.password,
    })
    .then(response => {
      console.log(response);
      // eslint-disable-next-line prettier/prettier
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
        <Field name="email">{({ input }) => <input placeholder="Email" type="email" {...input} />}</Field>
        <Field name="password">{({ input }) => <input placeholder="Password" type="password" {...input} />}</Field>
        <button type="submit">Sing in</button>
      </form>
    )}
  </Form>
  </>

)
}

export default Login;
