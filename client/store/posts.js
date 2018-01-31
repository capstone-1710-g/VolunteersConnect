import firebase from 'firebase';

//ACTION TYPES

const GET_POSTS_SUCCESS = 'GET_POSTS';

//ACTION CREATORS

export const getPostsSuccess = (posts) => {
    const action = { type: GET_POSTS_SUCCESS, posts }
    return action
}

//THUNKS

export const getEventPosts = (eventId) => {
    return (dispatch) => {
        const query = firebase.database().ref('/posts')
        .orderByChild('eventId')
        .equalTo(eventId);
        query.on('value', snapshot => {
            dispatch(getPostsSuccess(snapshot.val() || {}))
        });
    }
}

export default function (state = {}, action) {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            return action.posts
        default:
            return state
    }
}
