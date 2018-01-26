import axios from 'axios';
import history from '../history';

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
  const fakeEvent = { id: eventId, title: 'Event ' + eventId, description: 'blah blah' };
  return dispatch(getEventDetail(fakeEvent));
}
  // axios.get('/api/events/' + eventId)
  // .then(res => {
  //   return dispatch(getEventDetail(res.data))
  // })
  // .catch(err => console.log(err))

export const editEventDetail = event => dispatch =>
  axios.put('/api/events/' + event.id, event)
  .then(res => {
    dispatch(updateEventDetail(res.data));
    history.push('/events/' + event.id);
  })


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
