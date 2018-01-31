import history from '../history';
import firebase from 'firebase';

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS';
const GET_EVENTS_BY_CATEGORY = 'GET_EVENTS_BY_CATEGORY';
const GET_EVENTS_BY_KEYWORD = 'GET_EVENTS_BY_KEYWORD';
const ADD_NEW_EVENT = 'ADD_NEW_EVENT';

/**
 * ACTION CREATORS
 */
const getEvents = events => ({ type: GET_EVENTS, events });

const getEventsByCategory = events => ({
  type: GET_EVENTS_BY_CATEGORY, events,
});

const getEventsByKeyword = events => ({
  type: GET_EVENTS_BY_KEYWORD, events,
});

const addNewEvent = event => ({type: ADD_NEW_EVENT, event})

/**
 * THUNK CREATORS
 */
export const fetchEvents = () => dispatch => {
  firebase.database().ref('/events')
  .on('value', snapshot => {
    dispatch(getEvents(snapshot.val()));
  })
}

export const addEvent = event => dispatch => {
  const ref = firebase.database().ref('/events/');
  const key = ref.push().key;
  ref.child(key).update({...event, id: key});
  ref.on('child_added', snapshot =>
    dispatch(addNewEvent(snapshot.val()))
  );
  history.push('/events');
}


/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    case ADD_NEW_EVENT:
      return state;
    default:
      return state;
  }
}
