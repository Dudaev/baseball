const axios = require('axios');

export default async function queryProfileNames(accessToken, client, personId, playerName = '', position = '') {
  console.log(playerName);
  console.log(position);
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
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
