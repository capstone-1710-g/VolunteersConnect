import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as reduxFormReducer } from 'redux-form'
import user from './user'
import events from './events'
import event from './event'
import organizations from './organizations'
import organization from './organization'
import posts from './posts'
import post from './post'
import searchedEvents from './search'
import messageSessions from './messageSessions'

const reducer = combineReducers({
  form: reduxFormReducer,
  user,
  events,
  event,
  posts,
  post,
  organizations,
  organization,
  searchedEvents,
  messageSessions,
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './events'
export * from './event'
export * from './organizations'
export * from './organization'
export * from './posts'
export * from './post'
export * from './search'
export * from './messageSessions'
