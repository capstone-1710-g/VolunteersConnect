import axios from 'axios';
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
        console.log(eventId)
        const query = firebase.database().ref('/posts').orderByChild('eventId').equalTo(eventId);
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

// const fakePosts = [
        //     { id: 1, user: 'Johnyy Rocket', type: 'text', content: 'this is a test message', uid: 2, time: Date.now(), event: 1, userImage: 'http://i.pravatar.cc/50' },
        //     { id: 2, user: 'Johnyy Rocket', type: 'text', content: 'i dont even know how i would test an image here', uid: 2, time: Date.now(), event: 1, userImage: 'http://i.pravatar.cc/50' },
        //     { id: 3, user: 'Johnyy Rocket', type: 'text', content: 'hopefully this shit renders', uid: 2, time: Date.now(), event: 1, userImage: 'http://i.pravatar.cc/50' },
        //     { id: 4, user: 'Johnyy Rocket', type: 'text', content: 'another one', uid: 2, time: Date.now(), event: 2, userImage: 'http://i.pravatar.cc/50' },
        //     { id: 5, user: 'Johnyy Rocket', type: 'video', content: 'BZP1rYjoBgI', uid: 2, time: Date.now(), event: 2, userImage: 'http://i.pravatar.cc/50' },
        //     { id: 6, user: 'Johnyy Rocket', type: 'image', content: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Basketball.png/170px-Basketball.png', uid: 2, time: Date.now(), event: 2, userImage: 'http://i.pravatar.cc/50' },
        //     { id: 7, user: 'Johnyy Rocket', type: 'text', content: 'throw another text in the mix here', uid: 2, time: Date.now(), event: 2, userImage: 'http://i.pravatar.cc/50' },
        //     { id: 8, user: 'Johnyy Rocket', type: 'image', content: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/bk62a4eqnmvneaj5hc6y/elite-competition-8-panel-size-7-mens-basketball-KyTw2JoV.jpg', uid: 2, time: Date.now(), event: 2, userImage: 'http://i.pravatar.cc/50' },
        //     { id: 9, user: 'Johnyy Rocket', type: 'image', content: 'https://www.wpclipart.com/recreation/sports/basketball/large_basketball_textured.png', uid: 2, time: Date.now(), event: 2, userImage: 'http://i.pravatar.cc/50' },

        // ]
