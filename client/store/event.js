import axios from 'axios';
import history from '../history';
import firebase from 'firebase';

/**
 * ACTION TYPES
 */
const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL';
const UPDATE_EVENT_DETAIL = 'UPDATE_EVENT_DETAIL';

/**
 * ACTION CREATORS
 */
const getEventDetail = event => ({ type: GET_EVENT_DETAIL, event });
const updateEventDetail = event => ({type: UPDATE_EVENT_DETAIL, event});

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


/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_EVENT_DETAIL:
    case UPDATE_EVENT_DETAIL:
      return action.event;
    default:
      return state;
  }
}
