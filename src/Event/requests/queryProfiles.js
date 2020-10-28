const axios = require('axios');

export default async function queryProfiles(accessToken, client, uid, eventId) {
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
        input: { event: eventId, profiles_count: 100, offset: 0 },
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
