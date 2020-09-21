import React from 'react';
import axios from 'axios';
import { Field, Form } from 'react-final-form';
import { GraphQLClient,  gql } from 'graphql-request';

function Login() {
  async function queryLogin(accessToken, client, uid) {

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
      const accessToken = response.headers.[`access-token`];
      const {client, uid} = response.headers
      localStorage.accessToken = accessToken;
      localStorage.client = client;
      localStorage.uid = uid;
      queryLogin(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
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
