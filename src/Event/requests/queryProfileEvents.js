const axios = require('axios');

export default async function queryProfileEvents(accessToken, client, profileId) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query ProfileEvents($input:FilterProfileEventsInput!)
      { profile_events(input: $input) {
        events {
          id
          date
          event_type
          event_name
        }
        total_count
        }
      }`,
      variables: {
        input: { profile_id: profileId, count: 100, offset: 0 },
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
