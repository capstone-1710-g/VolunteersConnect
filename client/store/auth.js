import firebase from 'firebase';
require('babel-polyfill');

const provider = new firebase.auth.FacebookAuthProvider();

//ACTION TYPES
const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';
const FACEBOOK_LOGIN_FAIL = 'FACEBOOK_LOGIN_FAIL';


//THUNKS

export const facebookLogin = () => {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        console.log(result)
    })
}

export const facebookSignout = () => {
    firebase.auth().signOut()
    .then(() => {
        console.log('Signout successful!')
    })
}
