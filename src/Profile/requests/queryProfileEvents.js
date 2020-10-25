const axios = require('axios');

export default async function queryProfileEvents(accessToken, client, personId, values) {
  console.log(values);
  const { count = 10, offset = 0, type = 'None', datePicker = '' } = values;
  let date;
  if (datePicker !== '') {
    let day;
    let month;
    if (datePicker.getDate() < 10) {
      day = `0${datePicker.getDate()}`;
    } else {
      day = datePicker.getDate();
    }
    if (datePicker.getMonth() + 1 < 10) {
      month = `0${datePicker.getMonth() + 1}`;
    } else {
      month = datePicker.getMonth() + 1;
    }
    date = `${day}-${month}-${datePicker.getFullYear()}`;
  }
  let input;
  if (type === 'None') {
    input = {
      count,
      offset,
      date,
      profile_id: personId,
    };
  } else {
    input = {
      count,
      offset,
      date,
      event_type: type,
      profile_id: personId,
    };
  }
  return axios.post(
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
        input,
      },
    },
    {
      headers: {
        'access-token': accessToken,
        client,
        uid: localStorage.uid,
      },
    },
  );
}
