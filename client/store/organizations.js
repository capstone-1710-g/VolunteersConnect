import axios from 'axios';
import history from '../history';
import firebase from 'firebase';

/**
 * ACTION TYPES
 */
const GET_ORGANIZATIONS = 'GET_ORGANIZATIONS';
const ADD_NEW_ORGANIZATION = 'ADD_NEW_ORGANIZATION';

/**
 * ACTION CREATORS
 */
const getOrganizations = organizations => ({ type: GET_ORGANIZATIONS, organizations });

const addNewOrganization = organization => ({ type: ADD_NEW_ORGANIZATION, organization})

/**
 * THUNK CREATORS
 */
export const fetchOrganizations = () => dispatch => {
  firebase.database().ref('/organizations')
  .on('value', snapshot => {
    dispatch(getOrganizations(snapshot.val()));
  })
}

export const addOrganization = organization => dispatch =>
  axios.post('/api/organizations', organization)
  .then(res => {
    dispatch(addNewOrganization(res.data));
    history.push('/organizations');
  })
  .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ORGANIZATIONS:
      return action.organizations;
    case ADD_NEW_ORGANIZATION:
      return [...state, action.organization];
    default:
      return state;
  }
}
