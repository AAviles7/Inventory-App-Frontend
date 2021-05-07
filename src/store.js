import { createStore, combineReducers } from 'redux'

import userReducer from './reducers/userReducer'
import restaurantReducer from './reducers/restaurantReducer'

const rootReducer = combineReducers({
    user: userReducer,
    restaurant: restaurantReducer
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);