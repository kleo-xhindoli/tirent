import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import session from './session'
import houses from './houses'

export default combineReducers({
    routing: routerReducer,
    counter,
    session,
    houses
})