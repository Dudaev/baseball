const axios = require('axios');

export default async function queryNotifications(accessToken, client, uid) {
  axios
    .post(
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
    )
    .catch(error => {
      console.log(error);
    })
    .then(response => {
      console.log(JSON.stringify(response.data, undefined, 2));
    });
}
