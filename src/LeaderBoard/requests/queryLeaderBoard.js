const axios = require('axios');

export default async function queryLeaderBoard(accessToken, client, uid, values) {
  const parameters = values;
  if (parameters.type === 'pitch_velocity' || parameters.type === 'spin_rate' || parameters.type === undefined) {
    parameters.type = 'exit_velocity';
  }
  if (parameters.favorite === 'All') {
    delete parameters.favorite;
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
        input: { ...parameters },
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
