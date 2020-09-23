const axios = require('axios');

export default async function queryNotifications(accessToken, client, uid) {
  const data = await axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query Notifications($input:FilterNotificationsInput!) {
        notifications(input: $input) {
          notifications {
            id
            description
            link
        }
    }
  }`,
      variables: {
        input: { count: 5, offset: 0 },
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
