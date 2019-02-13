import { combineReducers } from 'redux'
import AppbarReducer from './reducer_appbar'

let rootReducer = combineReducers({
    appbar: AppbarReducer
})

export default rootReducer;