import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import * as actionCreators from './actionCreators'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
