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

export const addOrganization = organization => dispatch => {
  const ref = firebase.database().ref('/organizations/');
  const key = ref.push().key;
  ref.child(key).update({ ...organization, id: key });
  ref.on('child_added', snapshot =>
    dispatch(addNewOrganization(snapshot.val()))
  );
  history.push('/organizations');
}


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
