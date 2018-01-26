import axios from 'axios';

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
        const fakePosts = [
            { id: 1, type: 'text', content: 'this is a test message', uid: 2, time: Date.now(), event: 1 },
            { id: 2, type: 'text', content: 'i dont even know how i would test an image here', uid: 2, time: Date.now(), event: 1 },
            { id: 3, type: 'text', content: 'hopefully this shit renders', uid: 2, time: Date.now(), event: 1 },
            { id: 4, type: 'text', content: 'another one', uid: 2, time: Date.now(), event: 2 },
        ]
        dispatch(getPostsSuccess(fakePosts))
    }
}

export default function (state = [], action) {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            return action.posts
        default:
            return state
    }
}