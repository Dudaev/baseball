const axios = require('axios');

export default async function queryProfiles(accessToken, client, uid, values) {
  const parameters = values;
  if (parameters.favorite === 'All') {
    delete parameters.favorite;
  }
  const { school, team, position, age, favorite, profilesСount = 10, playerName, tableNavigation } = parameters;

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
      variables: {
        input: {
          school,
          team,
          position,
          age,
          favorite,
          profiles_count: profilesСount,
          player_name: playerName,
          offset: (tableNavigation - 1) * profilesСount,
        },
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
