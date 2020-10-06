const axios = require('axios');

export default async function queryLeaderBoard(accessToken, client, uid, values) {
  console.log(values);
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query LeaderboardBatting($input: FilterLeaderboardInput!) {
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
      }`,
      variables: {
        input: { ...values, type: 'exit_velocity' },
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
