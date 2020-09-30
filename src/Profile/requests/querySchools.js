const axios = require('axios');

export default async function querySchools(accessToken, client, uid) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query Schools($search:String!)
      { schools(search: $search) {
            schools {
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
