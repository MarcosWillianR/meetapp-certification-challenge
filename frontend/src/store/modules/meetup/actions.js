export function getMeetupsRequest() {
  return {
    type: '@meetup/GET_REQUEST',
  };
}

export function getMeetupsSuccess(meetups) {
  return {
    type: '@meetup/GET_SUCCESS',
    payload: { meetups },
  };
}

export function cancelMeetupRequest(id) {
  return {
    type: '@meetup/CANCEL_REQUEST',
    payload: { id },
  };
}

export function updateMeetupRequest(data, id) {
  return {
    type: '@Meetup/UPDATE_REQUEST',
    payload: { data, id },
  };
}

export function meetupUpdateSuccess(meetup) {
  return {
    type: '@Meetup/MEETUP_UPDATE_SUCCESS',
    payload: { meetup },
  };
}

export function meetupFailure() {
  return {
    type: '@Meetup/MEETUP_FAILURE',
  };
}
