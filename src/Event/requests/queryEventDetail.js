const axios = require('axios');

export default async function queryEventDetail(accessToken, client, uid, profileId) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query EventDetail($input:FilterEventDetailInput!)
      { event_detail(input: $input) {
            event {
              id
              date
              event_type
              event_name
          }
          is_pitcher
          data_rows_count
          profile
          opened
      }
    }`,
      variables: {
        input: { event_id: '87', profile_id: profileId },
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
