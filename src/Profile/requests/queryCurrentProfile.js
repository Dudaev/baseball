const axios = require('axios');

export default async function queryCurrentProfile(accessToken, client, uid) {
  const data = await axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: `{ current_profile ()
      {
          id
          first_name
          last_name
          position
          position2
          avatar
          throws_hand
          bats_hand
          biography
          school_year
          feet
          inches
          weight
          age
          school {
            id
            name
        }
        teams {
            id
            name
        }
        facilities {
            id
            email
            u_name
        }
    }}`,
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
