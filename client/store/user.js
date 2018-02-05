import firebase from 'firebase';
require('babel-polyfill');

// const provider = new firebase.auth.FacebookAuthProvider();
var provider = new firebase.auth.GoogleAuthProvider();


//ACTION TYPES
const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';
const FACEBOOK_LOGIN_FAIL = 'FACEBOOK_LOGIN_FAIL';
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';


const defaultUser = {}

//ACTION CREATORS

const getUser = user => ({ type: GET_USER, user })


//THUNKS

export const me = () => dispatch => {
  dispatch(getUser(firebase.auth().currentUser || {}));
}

export const createUser = (user) => dispatch => {
  let newUser = {
    id: user.uid,
    displayName: user.displayName,
    profileImage: user.photoURL,
    email: user.email
  }
  firebase.database().ref('/users').child(user.uid)
    .set(newUser, () => {
      dispatch(getUser(newUser))
    });
}

export const onSignIn = () => dispatch => {
  firebase.auth().signInWithPopup(provider).then((result) => {
    let user = result.user;
    const query = firebase.database().ref('/users')
      .orderByChild('id')
      .equalTo(user.uid);
    query.on('value', snapshot => {
      if (snapshot.val()) {
        const existingUser = snapshot.val()[user.uid];
        dispatch(getUser(existingUser))
      } else {
        dispatch(createUser(user))
      }
    });
  })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(error.code)
      console.log(error.message)
    });
}

export const logout = () => dispatch => {
  console.log(firebase.auth().currentUser)
  firebase.auth().signOut()
    .then(() => {
      dispatch(me())
    })
}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return state
  }
}


// export const facebookLogin = () => {
//     firebase.auth().signInWithPopup(provider)
//     .then((result) => {
//         let facebookUser = result.user
//         console.log('resulllllttttt', facebookUser)
//     })
// }

// export const facebookLogout = () => {
//     console.log(firebase.auth().currentUser)
//     firebase.auth().signOut()
//         .then(() => {
//             localStorage.clear();
//             console.log('Signout successful!')
//             console.log(firebase.auth().currentUser)

//         })
// }
