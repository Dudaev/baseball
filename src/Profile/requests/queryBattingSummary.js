const axios = require('axios');

export default async function queryBattingSummary(accessToken, client, personId) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query BattingSummary($id:ID!)
      { batting_summary(id: $id) {
            top_values {
              id
              distance
              pitch_type
              launch_angle
              exit_velocity
          }
          average_values{
              id
              distance
              pitch_type
              launch_angle
              exit_velocity
          }
      }
    }`,
      variables: {
        id: personId,
      },
    },
    {
      headers: {
        'access-token': accessToken,
        client,
        uid: localStorage.uid,
      },
    },
  );
}
