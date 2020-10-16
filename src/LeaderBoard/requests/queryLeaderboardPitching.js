const axios = require('axios');

export default async function queryLeaderboardPitching(accessToken, client, uid, values) {
  const parameters = values;
  if (parameters.type === 'exit_velocity' || parameters.type === 'carry_distance' || parameters.type === undefined) {
    parameters.type = 'pitch_velocity';
  }
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
