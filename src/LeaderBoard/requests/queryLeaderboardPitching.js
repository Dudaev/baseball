const axios = require('axios');

export default async function queryLeaderboardPitching(accessToken, client, uid, values) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: `query LeaderboardPitching($input:FilterLeaderboardInput!){
        leaderboard_pitching(input: $input) {
          leaderboard_pitching {
          pitcher_name
          pitch_type
          velocity
          spin_rate
          vertical_break
          horizontal_break
          pitcher_datraks_id
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
    }`,
      variables: {
        input: { type: 'pitch_velocity', ...values },
        // input: formObj,
      },
    },
    {
      headers: {
        'access-token': accessToken,
        client,
        uid,
      },
    },
  );

  // .catch(error => {
  //   console.log(error);
  // })
  // .then(response => {
  //   console.log(JSON.stringify(response.data, undefined, 2));
  // });
}
