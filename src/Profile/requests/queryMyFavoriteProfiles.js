const axios = require('axios');

export default async function queryMyFavoriteProfiles(accessToken, client, uid) {
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
      variables: { input: { profiles_count: 50, offset: 0 } },
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
