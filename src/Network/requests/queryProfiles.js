const axios = require('axios');

export default async function queryProfiles(
  accessToken,
  client,
  uid,
  // , values
) {
  // console.log(values.type);
  // if (values.type === 'pitch_velocity' || values.type === 'spin_rate' || values.type === undefined) {
  //   // eslint-disable-next-line no-param-reassign
  //   values.type = 'exit_velocity';
  // }

  //   Invoke-WebRequest -Uri "https://baseballcloud-back.herokuapp.com/api/v1/graphql" `
  //   -Method "POST" `
  //   -Headers @{
  //   "Accept"="application/json, text/plain, */*"
  //     "access-token"="v-kgaQrzuGdlhmnrJS7oew"
  //     "uid"="dddd@mail.ru"
  //     "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  //     "client"="uMFwgD5XQ0o602uilFsd7w"
  //     "Origin"="https://baseballcloud-front.herokuapp.com"
  //     "Sec-Fetch-Site"="cross-site"
  //     "Sec-Fetch-Mode"="cors"
  //     "Sec-Fetch-Dest"="empty"
  //     "Referer"="https://baseballcloud-front.herokuapp.com/"
  //     "Accept-Encoding"="gzip, deflate, br"
  //     "Accept-Language"="ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
  //   } `
  //   -ContentType "application/json;charset=UTF-8" `
  //   -Body "{`"query`":`"query Profiles(`$input:FilterProfilesInput!)
  //   { profiles(input: `$input)
  //     { profiles
  //         {
  //           id
  //           first_name
  //           last_name
  //           position
  //           position2
  //           school_year
  //           feet
  //           inches
  //           weight
  //           age
  //           events {
  //             id
  //         }
  //         school {
  //             id
  //             name
  //         }
  //         teams {
  //             id
  //             name
  //         }
  //         favorite
  //     }
  //       total_count
  //   }
  // }`",`"variables`":{`"input`":{`"profiles_count`":10,`"offset`":0}}}"

  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query Profiles($input:FilterProfilesInput!) {
        profiles(input: $input)
        { profiles
            {
              id
              first_name
              last_name
              position
              position2
              school_year
              feet
              inches
              weight
              age
              events {
                id
            }
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
          total_count
      }
    }`,
      // query: ` query LeaderboardBatting($input: FilterLeaderboardInput!) {
      //   leaderboard_batting(input: $input) {
      //     leaderboard_batting {
      //       batter_name
      //       exit_velocity
      //       launch_angle
      //       distance
      //       batter_datraks_id
      //       age
      //       school {
      //         id
      //         name
      //       }
      //       teams {
      //         id
      //         name
      //       }
      //       favorite
      //     }
      //   }
      // }`
      variables: {
        input: {
          profiles_count: 10,
          offset: 0,
        },
        // input: { ...values },
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
