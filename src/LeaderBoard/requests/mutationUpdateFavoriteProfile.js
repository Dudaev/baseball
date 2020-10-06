/* eslint-disable no-param-reassign */
/* eslint-disable no-lone-blocks */
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

      //   query: `mutation UpdateProfile($form: UpdateProfileInput!) {
      //   update_profile(input: $form) {
      //     profile {
      //       id
      //       first_name
      //       last_name
      //       position
      //       position2
      //       avatar
      //       throws_hand
      //       bats_hand
      //       biography
      //       school_year
      //       feet
      //       inches
      //       weight
      //       age
      //       recent_events {
      //         id
      //         event_type
      //         event_name
      //         date
      //         recent_avatars {
      //           id
      //           first_name
      //           last_name
      //           avatar
      //         }
      //       }
      //       school {
      //         id
      //         name
      //       }
      //       teams {
      //         id
      //         name
      //       }
      //       facilities {
      //         id
      //         email
      //         u_name
      //       }
      //     }
      //   }
      // }`,
      //   variables: {
      //     form: {
      //       id: localStorage.id,
      //       ...formObj,
      //     },
      //   },
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
