import {combineReducers} from 'redux';
import apiReducer from './apiReducer';
import searchReducer from './searchReducer';


let reducers = combineReducers({
    apiReducer:apiReducer,
    searchReducer:searchReducer
})

const rootReducer = (state,action) => {
    return reducers(state,action);
}

export default rootReducer;