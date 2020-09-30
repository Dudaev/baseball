const axios = require('axios');

export default async function queryFacilities(accessToken, client, uid) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query Facilities($search:String!)
      { facilities(search: $search) {
            facilities {
              id
              email
              u_name
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
