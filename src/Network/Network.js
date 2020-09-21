import React, { useEffect } from 'react';

const axios = require('axios');

async function queryProfiles(accessToken, client, uid) {
  const data = await axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query Profiles($input:FilterProfilesInput!)
      { profiles(input: $input)
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
          profiles_count: 10,
          offset: 0,
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

function Network() {
  useEffect(() => {
    queryProfiles(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
  }, []);
  return (
    <>
      <h1>Network</h1>
    </>
  );
}

export default Network;
