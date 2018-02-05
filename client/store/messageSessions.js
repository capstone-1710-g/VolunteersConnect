import history from '../history';
import firebase from 'firebase';

//ACTION TYPES

const GET_MESSAGE_SESSIONS_BY_USER = 'GET_MESSAGE_SESSIONS_BY_USER';
const CREATE_NEW_MESSAGE_SESSION = 'CREATE_NEW_MESSAGE_SESSION';

//ACTION CREATORS

export const getMessageSessionsByUser = messageSessions => ({
  type: GET_MESSAGE_SESSIONS_BY_USER,
  messageSessions
})

export const createNewMessageSession = messageSession => ({
  type: CREATE_NEW_MESSAGE_SESSION,
  messageSession
})

//THUNKS

export const getMessageSessions = messageSessionIds => dispatch => {
  // get all messages for specified message sessions
  Promise.all(messageSessionIds.map(messageSessionId =>
    firebase.database().ref('/messageSessions').child(messageSessionId)
    .once('value')
  ))
  .then(snapshots => {
    const messageSessions = snapshots.map(snapshot => snapshot.val());
    return dispatch(getMessageSessionsByUser(messageSessions));
  }, console.error);
}

export const createMessageSession = (sender, recipient) => dispatch => {
  // create message session info on both sender and recipient
  const messageSessionsRef = firebase.database().ref('/messageSessions');
  const sessionId = messageSessionsRef.push().key;
  const messageSession = {
    id: sessionId,
    timestamp: new Date().getTime(),
    participants: [
      { id: sender.id,
        displayName: sender.displayName,
        profileImage: sender.profileImage,
      },
      { id: sender.id,
        displayName: recipient.displayName,
        profileImage: recipient.profileImage,
      },
    ],
  };

  let updates = {};
  // for each user, note who the other user is
  updates['/users/' + sender.id + '/messageSessions/' + sessionId] = recipient.id;
  updates['/users/' + recipient.id + '/messageSessions/' + sessionId] = sender.id;
  // and persist the session info as well
  updates['/messageSessions/' +  sessionId] = messageSession;
  firebase.database().ref().update(updates)
  .then(() => {
    history.push('/messages/');
    return dispatch(createNewMessageSession(messageSession));
  });
};

export const sendMessage = (message, messageSessionId) => dispatch => {
  const ref = firebase.database().ref('/messageSessions')
  .child(messageSessionId)
  .child('/messages');
  ref.push({
    ...message,
    timestamp: new Date().getTime(),
  });
  ref.on('child_added', snapshot => {
    // dispatch(sendMessage(snapshot.val()))
  });
};

// REDUCER

export default function (state = [], action) {
  switch (action.type) {
    case GET_MESSAGE_SESSIONS_BY_USER:
      return action.messageSessions;
    case CREATE_NEW_MESSAGE_SESSION:
      // return [...state, action.messageSession];
    default:
      return state;
  }
}
