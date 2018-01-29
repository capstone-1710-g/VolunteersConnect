import axios from 'axios';
import history from '../history';
import firebase from 'firebase';

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS';
// const GET_EVENTS_BY_CATEGORY = 'GET_EVENTS_BY_CATEGORY';
const GET_EVENTS_BY_KEYWORD = 'GET_EVENTS_BY_KEYWORD';
const ADD_NEW_EVENT = 'ADD_NEW_EVENT';

/**
 * ACTION CREATORS
 */
const getEvents = events => ({ type: GET_EVENTS, events });

// const getEventsByCategory = events => ({
//   type: GET_EVENTS_BY_CATEGORY, events,
// });

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
  // const fakeEvents = [
  //   {id: 1, title: 'Event 1', description: 'blah blah'},
  //   {id: 2, title: 'Event 2', description: 'blah blah'},
  // ];

export const fetchProductsByKeyword = keyword => dispatch =>
  axios.get(`/api/events/search/${keyword}`)
    .then(res => dispatch(getEventsByKeyword(res.data)))
    .catch(err => console.log(err));

export const addEvent = event => dispatch =>
  axios.post('/api/events', event)
  .then(res => {
    dispatch(addNewEvent(res.data));
    history.push('/events');
  })
  .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    // case GET_PRODUCTS_BY_CATEGORY:
    //   return action.products;
    // case GET_PRODUCTS_BY_SEARCH:
    //   return action.products;
    case ADD_NEW_EVENT:
      return [...state, action.event];
    default:
      return state;
  }
}
