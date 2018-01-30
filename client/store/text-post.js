import firebase from 'firebase';

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

export const sendPostThunk = (post, eventId) => {
    return (dispatch) => {
        let createdAt = new Date().getTime();
        let feedTextPost = {
            type: 'text',
            createdAt: createdAt,
            eventId: eventId,
            content: post
        }
        firebase.database().ref('/posts')
        .push(feedTextPost)
        .set(feedTextPost, (error) => {
            if (error) {
                dispatch({ type: POST_FAIL, error })
            } else {
                dispatch({ type: POST_SUCCESS })

            }
        })
    }
}

const storeReference = (downloadUrl, eventId, type) => {
  let media = {
    type,
    eventId: eventId,
    url: downloadUrl
  }
  firebase.database().ref('/posts').push(media)

}

export const sendMediaThunk = (file, eventId) => {
    return (dispatch) => {
        const storageRef = firebase.storage().ref('media').child(file.name);
        const type = file.type
        storageRef.put(file)
        .then(() => {
            return storageRef.getDownloadURL()
        })
        .then((url) => {
            storeReference(url, eventId, type)
        })
        dispatch({ type: MEDIA_POST_SUCCESS })
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
