import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'

const reducers = combineReducers({})

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store
