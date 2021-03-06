const axios = require('axios');

export default async function queryTeams(accessToken, client, uid) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query Teams($search:String!)
      { teams(search: $search) {
            teams {
              id
              name
          }
    }}`,
      variables: {
        search: '',
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
