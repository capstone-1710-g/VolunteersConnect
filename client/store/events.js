import history from '../history';
import firebase from 'firebase';

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS';
const ADD_NEW_EVENT = 'ADD_NEW_EVENT';
const GET_ORGANIZATION_EVENTS =
'GET_ORGANIZATION_EVENTS';
/**
 * ACTION CREATORS
 */
const getEvents = events => ({ type: GET_EVENTS, events });

const getEventsByOrganization = events => ({
  type: GET_ORGANIZATION_EVENTS, events
});


const addNewEvent = event => ({type: ADD_NEW_EVENT, event})

/**
 * THUNK CREATORS
 */
export const fetchEvents = () => dispatch => {
  firebase.database().ref('/events')
  .on('value', snapshot => {
    let allEvents = snapshot.val() || {};
    allEvents = Object.keys(allEvents).map((eventId) => {
      return allEvents[eventId];
    });
    dispatch(getEvents(allEvents));
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


export const fetchOrganizationEvents = function (orgId) {

  return function(dispatch) {
    const eventsRef = firebase.database().ref('/events').orderByChild('orgId').equalTo(orgId);
    eventsRef.on('value', (snapshot) => {
      let events = snapshot.val() || {};
      events = Object.keys(events).map((eventId) => {
        return events[eventId];
      })
      dispatch(getEventsByOrganization(events));
    })
  }
}
/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_EVENTS:
    case GET_ORGANIZATION_EVENTS:
      return action.events;

    case ADD_NEW_EVENT:
      return state;

    default:
      return state;
  }
}
