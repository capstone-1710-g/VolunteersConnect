import history from '../history';
import firebase from 'firebase';

/**
 * ACTION TYPES
 */
const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL';
const UPDATE_EVENT_DETAIL = 'UPDATE_EVENT_DETAIL';
const VOLUNTEER_ADDED = 'VOLUNTEER_ADDED';

/**
 * ACTION CREATORS
 */
const getEventDetail = event => ({ type: GET_EVENT_DETAIL, event });
const updateEventDetail = event => ({type: UPDATE_EVENT_DETAIL, event});
const volunteerAdded = volunteer => ({type:VOLUNTEER_ADDED, volunteer});

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
  const { event, user } = request
  const ref = firebase.database().ref('/events').child(event.id)
  .child('volunteers')
  .child(user.id);
  ref.set(user, () => {
    dispatch(volunteerAdded(user))
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
      // return Object.assign({}, state, {
      //   volunteers: {
      //     ...state.volunteers,
      //     [action.volunteer.id]: action.volunteer
      //   }
      // });
    default:
      return state;
  }
}
