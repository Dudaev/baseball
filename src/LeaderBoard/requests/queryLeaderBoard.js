const axios = require('axios');

export default async function queryLeaderBoard(accessToken, client, uid, values) {
  console.log(values.type);
  if (values.type === 'pitch_velocity' || values.type === 'spin_rate' || values.type === undefined) {
    // eslint-disable-next-line no-param-reassign
    values.type = 'exit_velocity';
  }
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
        input: { ...values },
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
}
