const axios = require('axios');

export default async function queryProfileEvents(accessToken, client, uid) {
  const data = await axios.post(
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
        input: {
          count: 10,
          offset: 0,
          profile_id: localStorage.id,
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
  console.log(JSON.stringify(data.data, undefined, 2));
}
