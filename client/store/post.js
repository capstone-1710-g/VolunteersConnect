import firebase from 'firebase';
require('babel-polyfill');

//ACTION TYPES

const POST_SENDING = 'POST_SENDING';
const POST_SUCCESS = 'POST_SUCCESS';
const POST_FAIL = 'POST_FAIL';
const POST_CHANGED = 'POST_CHANGED';
const MEDIA_POST_SUCCESS = 'MEDIA_POST_SUCCESS';
const FILE_SELECTED = 'FILE_SELECTED';


//INITIAL STATE

const initialState = {
    post: '',
    url: '',
    isSending: false,
    sendingError: null
}

//ACTION CREATORS

export const messageChanged = text => {
    return (dispatch) => {
        dispatch({ type: POST_CHANGED, text })
    }
}

export const fileSelected = file => {
    return (dispatch) => {
        dispatch({ type: FILE_SELECTED, file })
    }
}


//THUNK

const storeFile = async (file) => {
  const storageRef = await firebase.storage().ref('media').child(file.name);
  const snapshot = await storageRef.put(file);
  const url = await storageRef.getDownloadURL();
  return url;
}

export const sendPost = (content, file, eventId) => {
  return async (dispatch) => {
    let url = null;
    if (file) {
      url = await storeFile(file);
    }

    const feedPost = {
      createdAt: new Date().getTime(),
      eventId,
      content,
      url,
      type: file ? file.type : null,
    };

    firebase.database().ref('/posts')
    .push(feedPost)
    .set(feedPost, (error) => {
      if (error) {
          dispatch({ type: POST_FAIL, error })
      } else {
          dispatch({ type: POST_SUCCESS })
      }
    })
  }
}

//REDUCER

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_CHANGED:
            return { ...state, post: action.text, sendingError: null }
        case POST_SUCCESS:
            return { ...state, sendingError: null, post: '' }
        case POST_FAIL:
            return { ...state, sendingError: action.error }
        default:
            return state;
    }
}
