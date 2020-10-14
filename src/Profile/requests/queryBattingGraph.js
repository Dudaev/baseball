const axios = require('axios');

export default async function queryBattingGraph(accessToken, client, playerId, pitchType) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query BattingGraph($input:FilterGraphInput!)
      { batting_graph(input: $input) {
          graph_rows
      }
  }`,
      variables: { input: { profile_id: playerId, pitch_type: pitchType } },
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
