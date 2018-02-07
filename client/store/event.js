import history from '../history';
import firebase from 'firebase';

/**
 * ACTION TYPES
 */
const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL';
const UPDATE_EVENT_DETAIL = 'UPDATE_EVENT_DETAIL';
const VOLUNTEER_ADDED = 'VOLUNTEER_ADDED';
const VOLUNTEER_APPROVED = 'VOLUNTEER_APPROVED'
const VOLUNTEER_REJECTED = 'VOLUNTEER_REJECTED';

/**
 * ACTION CREATORS
 */
const getEventDetail = event => ({ type: GET_EVENT_DETAIL, event });
const updateEventDetail = event => ({ type: UPDATE_EVENT_DETAIL, event });
const volunteerAdded = volunteer => ({ type: VOLUNTEER_ADDED, volunteer });
const volunteerApproved = volunteer => ({ type: VOLUNTEER_APPROVED, volunteer })
const volunteerRejected = volunteer => ({ type: VOLUNTEER_REJECTED, volunteer })

/**
 * THUNK CREATORS
 */
export const fetchEventDetail = (eventId) => dispatch => {
  const ref = firebase.database().ref('/events').child(eventId);
  ref.on('value', snapshot =>
    dispatch(getEventDetail(snapshot.val()))
  );
}

export const editEventDetail = event => dispatch => {
  const ref = firebase.database().ref('/events').child(event.id);
  ref.update(event);
  history.push('/events/' + event.id);
}

export const addVolunteerToEvent = (request) => dispatch => {
  const { event, user, reasonToVolunteer } = request;
  const updatedUser = {
    ...user,
    status: 'pending',
    reasonToVolunteer,
  }
  const ref = firebase.database().ref('/events').child(event.id)
  .child('volunteers')
  .child(user.id);
  ref.set(updatedUser, () => {
    dispatch(volunteerAdded(updatedUser));
  });
}

export const rejectVolunteer = (volunteer, event) => dispatch => {
  const ref = firebase.database().ref('/events').child(event.id)
    .child('volunteers')
    .child(volunteer.id);
  ref.remove(() => {
    dispatch(volunteerRejected(volunteer));
  });
}

export const approveVolunteer = (volunteer, event) => dispatch => {
  const updatedVolunteer = {
    ...volunteer,
    status: 'approved'
  }
  const ref = firebase.database().ref('/events').child(event.id)
    .child('volunteers')
    .child(volunteer.id);
  ref.set(updatedVolunteer, () => {
    dispatch(volunteerApproved(updatedVolunteer));
  });
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_EVENT_DETAIL:
    case UPDATE_EVENT_DETAIL:
      return action.event;
    case VOLUNTEER_ADDED:
    case VOLUNTEER_APPROVED:
    case VOLUNTEER_REJECTED:
    default:
      return state;
  }
}
