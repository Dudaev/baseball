const axios = require('axios');

export default async function mutationUpdateProfile(accessToken, client, uid, id, isFavorite) {
  return axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: `mutation UpdateFavoriteProfile($form: UpdateFavoriteProfileInput!) {
       update_favorite_profile(input: $form) {
         favorite
        }
      }`,
      variables: {
        form: {
          profile_id: id,
          favorite: isFavorite,
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
}
