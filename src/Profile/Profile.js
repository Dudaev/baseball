/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import Select from 'react-select';

const axios = require('axios');

// eslint-disable-next-line react/prop-types
const ReactSelectAdapter = ({ input, ...rest }) => (
  <div>
    <Select {...input} {...rest} isMulti />
    {/* {console.log(`INPUT ${JSON.stringify(props, undefined, 2)}`)} */}
  </div>
);

// eslint-disable-next-line react/prop-types
const ReactSelect = ({ input, ...rest }) => (
  <div>
    <Select {...input} {...rest} isSearchable={false} />
  </div>
);

async function queryCurrentProfile(accessToken, client, uid) {
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

async function mutationUpdateProfile(
  accessToken,
  client,
  uid,
  // , formObj
) {
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
}

async function queryLeaderBoard(accessToken, client, uid) {
  const data = await axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query LeaderboardBatting($input: FilterLeaderboardInput!) {
        leaderboard_batting(input: $input) {
          leaderboard_batting {
            batter_name
            exit_velocity
            launch_angle
            distance
            batter_datraks_id
            age
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
        }
      }`,
      variables: {
        input: { type: 'exit_velocity' },
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

async function queryNotifications(accessToken, client, uid) {
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

async function querySchools(accessToken, client, uid) {
  const data = await axios.post(
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
  console.log(JSON.stringify(data.data, undefined, 2));
}

async function queryTeams(accessToken, client, uid) {
  const data = await axios.post(
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
  console.log(JSON.stringify(data.data, undefined, 2));
}

async function queryFacilities(accessToken, client, uid) {
  const data = await axios.post(
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
  console.log(JSON.stringify(data.data, undefined, 2));
}

async function queryProfile(accessToken, client, uid) {
  const data = await axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: `query Profile($id:String!)
      { profile(id: $id)
        {
          id
          first_name
          last_name
          position
          position2
          school_year
          avatar
          throws_hand
          bats_hand
          biography
          feet
          inches
          weight
          age
          recent_events {
            id
            event_type
            event_name
            date
            is_pitcher
            data_rows_count
            recent_avatars {
              id
              first_name
              last_name
              avatar
            }
          }
          winsgspan
          grip_right
          grip_left
          wrist_to_elbow
          broad_jump
          grip_left
          act_score
          gpa_score
          sat_score
          batting_top_values {
            pitch_type
            distance
            launch_angle
            exit_velocity
          }
          pitching_top_values {
            velocity
            spin_rate
            pitch_type
          }
          pitcher_summary {
            velocity
            spin_rate
            horizontal_break
          }
          batter_summary {
            exit_velocity
            distance
            launch_angle
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
          favorite
          events_opened
          paid
        }
      }`,
      variables: {
        id: localStorage.id,
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

async function queryProfileEvents(accessToken, client, uid) {
  const data = await axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query ProfileEvents($input:FilterProfileEventsInput!)
      { profile_events(input: $input) {
        events {
          id
          date
          event_type
          event_name
        }
        total_count
        }
      }`,
      variables: {
        input: {
          count: 10,
          offset: 0,
          profile_id: localStorage.id,
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

async function queryBattingSummary(accessToken, client, uid) {
  const data = await axios.post(
    'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    {
      query: ` query BattingSummary($id:ID!)
      { batting_summary(id: $id) {
            top_values {
              id
              distance
              pitch_type
              launch_angle
              exit_velocity
          }
          average_values{
              id
              distance
              pitch_type
              launch_angle
              exit_velocity
          }
      }
    }`,
      variables: {
        id: localStorage.id,
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

function Profile() {
  useEffect(() => {
    queryCurrentProfile(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    queryLeaderBoard(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    queryNotifications(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    querySchools(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
    queryTeams(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
    queryFacilities(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    queryProfile(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error => console.error(error));
    queryProfileEvents(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
    queryBattingSummary(localStorage.accessToken, localStorage.client, localStorage.uid).catch(error =>
      console.error(error),
    );
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <Form
        onSubmit={formObj => {
          mutationUpdateProfile(localStorage.accessToken, localStorage.client, localStorage.uid, formObj).catch(error =>
            console.error(error),
          );
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName *">{({ input }) => <input placeholder="First Name" type="text" {...input} />}</Field>
            {/* {({ input }) => <TextField placeholder="First Name" label="Outlined" variant="outlined" {...input}/>}</Field> */}
            <Field name="lastName *">{({ input }) => <input placeholder="Last Name" type="text" {...input} />}</Field>
            <Field
              name="positionInGame"
              component={ReactSelect}
              placeholder="Position in Game *"
              options={[
                {
                  value: 'catcher',
                  label: 'Catcher',
                },
                {
                  value: 'first_base',
                  label: 'First Base',
                },
                {
                  value: 'second_base',
                  label: 'Second Base',
                },
                {
                  value: 'shortstop',
                  label: 'Shortstop',
                },
                {
                  value: 'third_base',
                  label: 'Third Base',
                },
                {
                  value: 'outfield',
                  label: 'Outfield',
                },
                {
                  value: 'pitcher',
                  label: 'Pitcher',
                },
              ]}
            ></Field>
            <Field
              name="secondaryPositionInGame"
              component={ReactSelect}
              placeholder="Secondary Position in Game *"
              options={['catcher', 'first_base', 'second_base', 'shortstop', 'third_base', 'outfield', 'pitcher']}
            ></Field>
            <div>
              <label>Personal Info</label>
              <Field name="age" component="input" type="number" placeholder="Age *" />
              <Field name="feet" component="input" type="number" placeholder="Feet *" />
              <Field name="inches" component="input" type="number" placeholder="Inches" />
              <Field name="weight" component="input" type="number" placeholder="Weight *" />
              <Field name="throws" component="select">
                <option>R</option>
                <option>L</option>
              </Field>
              <Field name="bats" component="select">
                <option>R</option>
                <option>L</option>
              </Field>
            </div>
            <div>
              <label>School</label>
              <Field name="school" component="select">
                <option>FSU</option>
                <option>Rockledge</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>None</option>
              </Field>
            </div>
            <div>
              <label>Team</label>
              <Field
                name="teams"
                component={ReactSelectAdapter}
                options={[
                  {
                    value: 'Scorps',
                    label: 'Scorps',
                  },
                  {
                    value: 'Good Team',
                    label: 'Good Team',
                  },
                  {
                    value: 'FTB',
                    label: 'FTB',
                  },
                  {
                    value: 'uigi',
                    label: 'uigi',
                  },
                  {
                    value: 'ashas',
                    label: 'ashas',
                  },
                ]}
              />
            </div>
            <div>
              <label>Facility</label>
              <div>
                <Field
                  name="facility"
                  component={ReactSelectAdapter}
                  options={[
                    {
                      value: { id: '32', u_name: 'Example' },
                      label: 'Example',
                    },
                  ]}
                />
              </div>
              <div>
                <label>About</label>
                <Field name="about" component="textarea" placeholder="Describe yourself in a few words" />
              </div>
            </div>
            <button type="submit">Sing in</button>
          </form>
        )}
      </Form>
    </>
  );
}

export default Profile;
