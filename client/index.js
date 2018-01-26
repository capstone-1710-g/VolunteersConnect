import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import firebase from 'firebase';

// establishes socket connection
import './socket'

var config = {
    apiKey: "AIzaSyDRkfexwX3hUY0ehoz0Y7FQ-xRQ0PJ5dbE",
    authDomain: "capstone-bb16d.firebaseapp.com",
    databaseURL: "https://capstone-bb16d.firebaseio.com",
    projectId: "capstone-bb16d",
    storageBucket: "capstone-bb16d.appspot.com",
    messagingSenderId: "947620558752"
  };
  firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
