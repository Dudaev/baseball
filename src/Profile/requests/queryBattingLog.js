const axios = require('axios');

export default async function queryBattingLog(accessToken, client, personId, values) {
  console.log(values);
  const { playerName = '', pitchType = '', tableNavigation = 1 } = values;
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query BattingLog($input:FilterBattingLogInput!) { batting_log(input: $input) {
        batting_log {
          date
          pitcher_name
          pitcher_handedness
          pitch_type
          pitch_call
          exit_velocity
          launch_angle
          direction
          distance
          hit_spin_rate
          hang_time
          pitcher_datraks_id
      }
      total_count
  }
}`,
      variables: {
        input: {
          profile_id: personId,
          count: 10,
          offset: (tableNavigation - 1) * 10,
          pitcher_name: playerName,
          pitch_type: pitchType,
        },
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
