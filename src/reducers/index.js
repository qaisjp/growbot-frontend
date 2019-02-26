import { combineReducers } from 'redux'
import DrawerReducer from './reducer_drawer'
import AuthReducer from './reducer_auth'
import RobotsReducer from './reducer_robots'

let rootReducer = combineReducers({
    drawer: DrawerReducer,
    auth: AuthReducer,
    robots: RobotsReducer
})

export default rootReducer;