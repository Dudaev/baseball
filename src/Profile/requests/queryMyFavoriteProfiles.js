const axios = require('axios');

export default async function queryMyFavoriteProfiles(accessToken, client, uid) {
  // const parameters = values;
  // if (parameters.favorite === 'All') {
  //   delete parameters.favorite;
  // }
  // const { school, team, position, age, favorite, profilesСount = 10, playerName, tableNavigation } = parameters;




  // Invoke-WebRequest -Uri "https://baseballcloud-back.herokuapp.com/api/v1/graphql" `
  // -Method "POST" `
  // -Headers @{
  // "Accept"="application/json, text/plain, */*"
  //   "access-token"="yJN2sG7EO5ckZdYpqKs1Sw"
  //   "uid"="w@w.ru"
  //   "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36"
  //   "client"="unIYbmP2Y1ZlZn33mhqzlQ"
  //   "Origin"="https://baseballcloud-front.herokuapp.com"
  //   "Sec-Fetch-Site"="cross-site"
  //   "Sec-Fetch-Mode"="cors"
  //   "Sec-Fetch-Dest"="empty"
  //   "Referer"="https://baseballcloud-front.herokuapp.com/"
  //   "Accept-Encoding"="gzip, deflate, br"
  //   "Accept-Language"="ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
  // } `
  // -ContentType "application/json;charset=UTF-8" `
  // -Body "{`"query`":`"query MyFavoriteProfiles(`$input:FilterProfilesInput!)
  //     { my_favorite(input: `$input) {
  //           profiles {
  //             id
  //             first_name
  //             last_name
  //             recent_events {
  //               id
  //               event_type
  //               event_name
  //               date
  //               recent_avatars {
  //                 id
  //                 first_name
  //                 last_name
  //                 avatar
  //             }
  //         }
  //       }
  //         total_count
  //     }
  //   }`",`"variables`":{`"input`":{`"profiles_count`":50,`"offset`":0}}}"




  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query MyFavoriteProfiles($input:FilterProfilesInput!)
      { my_favorite(input: $input) {
            profiles {
              id
              first_name
              last_name
              recent_events {
                id
                event_type
                event_name
                date
                recent_avatars {
                  id
                  first_name
                  last_name
                  avatar
              }
          }
        }
          total_count
      }
    }`,
      variables: {input: {profiles_count: 50, offset: 0}},





      // query: ` query Profiles($input:FilterProfilesInput!) {
      //   profiles(input: $input)
      //   { profiles
      //       {
      //         id
      //         first_name
      //         last_name
      //         position
      //         position2
      //         school_year
      //         feet
      //         inches
      //         weight
      //         age
      //         events {
      //           id
      //       }
      //       school {
      //           id
      //           name
      //       }
      //       teams {
      //           id
      //           name
      //       }
      //       favorite
      //   }
      //     total_count
      //   }
      // }`,
      // variables: {
      //   input: {
      //     school,
      //     team,
      //     position,
      //     age,
      //     favorite,
      //     profiles_count: profilesСount,
      //     player_name: playerName,
      //     offset: (tableNavigation - 1) * profilesСount,
      //   },
      // },




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
