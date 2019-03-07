import { combineReducers } from 'redux'
import AuthReducer from './reducer_auth'

let rootReducer = combineReducers({
    auth: AuthReducer
})

export default rootReducer;