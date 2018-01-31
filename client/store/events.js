import history from '../history';
import firebase from 'firebase';

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS';
const GET_EVENTS_BY_CATEGORY = 'GET_EVENTS_BY_CATEGORY';
const GET_EVENTS_BY_KEYWORD = 'GET_EVENTS_BY_KEYWORD';
const GET_EVENTS_BY_LOCATION = 'GET_EVENTS_BY_LOCATION';
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

const getEventsByLocation = events => ({
  type: GET_EVENTS_BY_LOCATION, events,
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

export const fetchEventsByLocation = (zipCode, radius) => async dispatch => {
  //getting all zip codes in radius
  const zipCodesSnapshot = await firebase.database().ref('/zipcodesByDistance').child(zipCode).child(`${radius}miles`)
  .once('value');

  //getting all the events for each zipcode
  const eventIdPromises = Object.keys(zipCodesSnapshot.val()).map(zipCode => {
    return firebase.database().ref('/eventZipCodes').child(zipCode).child('eventIds').once('value');
  })
  const eventIdSnapShots = await Promise.all(eventIdPromises);

  const eventIdObj = eventIdSnapShots.reduce((result, snapshot) => {
    const val = snapshot.val();
    if (val) {
      result = {...result, ...val}
    }
    return result;
  }, {});

  //getting list of actual events
  const eventPromises = Object.keys(eventIdObj).map((eventId) => {
    return firebase.database().ref('/events').child(eventId).once('value');
  });

  const eventSnapShots = await Promise.all(eventPromises);

  const events = eventSnapShots.map((snapshot) => {
    return snapshot.val();
  });

  dispatch(getEventsByLocation(events));
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
    case GET_EVENTS_BY_LOCATION:
      return action.events;
    default:
      return state;
  }
}
