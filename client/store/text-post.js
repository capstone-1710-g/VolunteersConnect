import firebase from 'firebase';

//ACTION TYPES

const POST_SENDING = 'POST_SENDING';
const POST_SUCCESS = 'POST_SUCCESS';
const POST_FAIL = 'POST_FAIL';
const POST_CHANGED = 'POST_CHANGED';


//INITIAL STATE

const initialState = {
    post: '',
    isSending: false,
    sendingError: null
}

//ACTION CREATORS

export const messageChanged = text => {
    return (dispatch) => {
        dispatch({ type: POST_CHANGED, text })
    }
}

//THUNK

export const sendPostThunk = (post, eventId) => {
    console.log('evtnrttttttiDDDDDDD', eventId)
    return (dispatch) => {
        let createdAt = new Date().getTime();
        let feedTextPost = {
            type: 'text',
            createdAt: createdAt,
            eventId: Number(eventId),
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