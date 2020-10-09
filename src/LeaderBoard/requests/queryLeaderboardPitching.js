const axios = require('axios');

export default async function queryLeaderboardPitching(accessToken, client, uid, values) {
  if (values.type === 'exit_velocity' || values.type === 'carry_distance' || values.type === undefined) {
    // eslint-disable-next-line no-param-reassign
    values.type = 'pitch_velocity';
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
