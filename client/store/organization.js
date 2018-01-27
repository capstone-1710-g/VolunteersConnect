import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ORGANIZATION_DETAIL = 'GET_ORGANIZATION_DETAIL';
const UPDATE_ORGANIZATION_DETAIL = 'UPDATE_ORGANIZATION_DETAIL';

/**
 * ACTION CREATORS
 */
const getOrganizationDetail = organization => ({ type: GET_ORGANIZATION_DETAIL, organization });
const updateOrganizationDetail = organization => ({ type: UPDATE_ORGANIZATION_DETAIL, organization});

/**
 * THUNK CREATORS
 */
export const fetchOrganizationDetail = (organizationId) => dispatch => {
  const fakeOrganization = { id: organizationId, name: 'Organization ' + organizationId, description: 'blah blah' };
  return dispatch(getOrganizationDetail(fakeOrganization));
}
  // axios.get('/api/events/' + eventId)
  // .then(res => {
  //   return dispatch(getEventDetail(res.data))
  // })
  // .catch(err => console.log(err))

export const editOrganizationDetail = organization => dispatch =>
  axios.put('/api/organizations/' + organization.id, organization)
  .then(res => {
    dispatch(updateOrganizationDetail(res.data));
    history.push('/organizations/' + organization.id);
  })


/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_ORGANIZATION_DETAIL:
    case UPDATE_ORGANIZATION_DETAIL:
      return action.organization;
    default:
      return state;
  }
}
