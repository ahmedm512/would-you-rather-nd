import { combineReducers } from 'redux';


import userReducer from './user/user.reducer';
import questionReducer from './questions/question.reducer';
import { loadingBarReducer } from 'react-redux-loading-bar'


const rootReducer = combineReducers({
    user: userReducer,
    question: questionReducer,
    loadingBar: loadingBarReducer,
});

export default rootReducer;