import { combineReducers } from 'redux'
import DrawerReducer from './reducer_drawer'

let rootReducer = combineReducers({
    drawer: DrawerReducer
})

export default rootReducer;