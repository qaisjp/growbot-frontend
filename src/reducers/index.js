import { combineReducers } from 'redux'
import DrawerReducer from './reducer_drawer'
import AuthReducer from './reducer_auth'

let rootReducer = combineReducers({
    drawer: DrawerReducer,
    auth: AuthReducer
})

export default rootReducer;