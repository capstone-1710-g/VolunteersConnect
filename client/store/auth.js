import firebase from 'firebase';
require('babel-polyfill');

const provider = new firebase.auth.FacebookAuthProvider();

//ACTION TYPES
const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';
const FACEBOOK_LOGIN_FAIL = 'FACEBOOK_LOGIN_FAIL';


//THUNKS

export const facebookLogin = async () => {
    try {
        let result = await firebase.auth().signInWithPopup(provider);
        console.log(result)
        let token = result.credential.accessToken
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
  // ...
    }
}
