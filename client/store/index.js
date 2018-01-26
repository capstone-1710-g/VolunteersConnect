import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import events from './events'
import event from './event'
import organizations from './organizations'
import organization from './organization'
import posts from './posts'

const reducer = combineReducers({
  user,
  events,
  event,
  organizations,
  organization,
  posts,
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
