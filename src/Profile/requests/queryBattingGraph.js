const axios = require('axios');

export default async function queryBattingGraph(accessToken, client, playerId, pitchType) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      //       fetch("https://baseballcloud-back.herokuapp.com/api/v1/graphql", {
      //   "headers": {
      //     "accept": "application/json, text/plain, */*",
      //     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      //     "access-token": "Eml70_xOqGER-TmOr-Cl6w",
      //     "client": "GuBAmd_kRVxzhTFDL1jPjg",
      //     "content-type": "application/json;charset=UTF-8",
      //     "sec-fetch-dest": "empty",
      //     "sec-fetch-mode": "cors",
      //     "sec-fetch-site": "cross-site",
      //     "uid": "d@mail.ru"
      //   },
      //   "referrer": "https://baseballcloud-front.herokuapp.com/",
      //   "referrerPolicy": "strict-origin-when-cross-origin",
      //   "body": "{\"query\":\"

      //   query BattingGraph($input:FilterGraphInput!)
      //     { batting_graph(input: $input) {
      //         graph_rows
      //     }
      // },

      // \"variables\":{\"input\":{\"profile_id\":\"415\"}}}",
      //   "method": "POST",
      //   "mode": "cors",
      //   "credentials": "omit"
      // });

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
