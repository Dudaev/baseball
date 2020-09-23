const axios = require('axios');

export default async function mutationUpdateProfile(accessToken, client, uid, formObj) {
  const data = await axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: `mutation UpdateProfile($form: UpdateProfileInput!) {
      update_profile(input: $form) {
        profile {
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
          recent_events {
            id
            event_type
            event_name
            date
            recent_avatars {
              id
              first_name
              last_name
              avatar
            }
          }
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
        }
      }
    }`,
      variables: {
        form: {
          avatar: null,
          bats_hand: 'l',
          biography: '66v',
          facilities: [{ id: '32', email: 'facility@example.com', u_name: 'Example' }],
          feet: 7,
          first_name: 'cc',
          id: localStorage.id,
          inches: 4,
          last_name: 'ccc',
          position: 'catcher',
          position2: 'first_base',
          school: { id: '2', name: 'FSU' },
          school_year: 'freshman',
          teams: [{ id: '7', name: 'FTB' }],
          throws_hand: 'r',
          weight: 50,
          // age: +formObj.age,
          // bats_hand: formObj.bats,
          // biography: formObj.about,
          // facilities: [{id: "32", u_name: "Example"}],
          // // formObj.facility,
          // feet: +formObj.feet,
          // first_name: formObj.firstName,
          // id: '558',
          // inches: +formObj.inches,
          // last_name: formObj.lastName,
          // position: "catcher",
          // // formObj.positionInGame,
          // position2: "first_base",
          // // formObj.secondaryPositionInGame,
          // teams: [{id: "7", name: "FTB"}],
          // // formObj.teams.map(item => item.value),
          // throws_hand: formObj.throws,
          // weight: +formObj.weight,
          // school: {id: "2", name: "FSU"},
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
  console.log(formObj);
}
