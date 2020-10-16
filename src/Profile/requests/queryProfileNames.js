const axios = require('axios');

export default async function queryProfileNames(accessToken, client, personId, playerName = '', position = '') {
  console.log(playerName);
  console.log(position);
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      // fetch("https://baseballcloud-back.herokuapp.com/api/v1/graphql", {
      //   "headers": {
      //     "accept": "application/json, text/plain, */*",
      //     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      //     "access-token": "gLxoNVV_7uurSinOCraQHg",
      //     "client": "w4gOPezlDUcv6wBWWRg7Lw",
      //     "content-type": "application/json;charset=UTF-8",
      //     "sec-fetch-dest": "empty",
      //     "sec-fetch-mode": "cors",
      //     "sec-fetch-site": "cross-site",
      //     "uid": "dudaev.nik@mail.ru"
      //   },
      //   "referrer": "https://baseballcloud-front.herokuapp.com/",
      //   "referrerPolicy": "strict-origin-when-cross-origin",
      //   "body": "{\"query\":\"query ProfileNames($input:FilterProfileNamesInput!)
      //      { profile_names(input: $input) {
      //            profile_names {
      //              id
      //              position
      //              first_name
      //              last_name
      //              inches
      //              feet
      //              weight
      //              age
      //          }
      //      }
      //    }\",\"variables\":{\"input\":{\"player_name\":\"d\",\"position\":\"pitcher\"}}}",
      //   "method": "POST",
      //   "mode": "cors",
      //   "credentials": "omit"
      // });

      query: ` query ProfileNames($input:FilterProfileNamesInput!)
      { profile_names(input: $input) {
            profile_names {
              id
              position
              first_name
              last_name
              inches
              feet
              weight
              age
          }
      }
    }`,

      //       query: ` query BattingLog($input:FilterBattingLogInput!) { batting_log(input: $input) {
      //         batting_log {
      //           date
      //           pitcher_name
      //           pitcher_handedness
      //           pitch_type
      //           pitch_call
      //           exit_velocity
      //           launch_angle
      //           direction
      //           distance
      //           hit_spin_rate
      //           hang_time
      //           pitcher_datraks_id
      //       }
      //       total_count
      //   }
      // }`,
      variables: { input: { player_name: playerName, position } },
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
