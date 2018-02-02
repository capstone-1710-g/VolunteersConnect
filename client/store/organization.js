import axios from 'axios';
import history from '../history';
import firebase from 'firebase';

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
  const ref = firebase.database().ref('/organizations').child(organizationId);
  ref.on('value', snapshot =>
    dispatch(getOrganizationDetail(snapshot.val()))
  );
}

export const editOrganizationDetail = organization => dispatch => {
  console.log('ORGANIZATION', organization)
  const ref = firebase.database().ref('/organizations').child(organization.id);
  ref.update(organization);
  history.push('/organizations/' + organization.id);
}


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
