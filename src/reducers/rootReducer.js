import authenticationReducer from './authenticationReducer';
import conseillersReducer from './conseillersReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    conseillers: conseillersReducer
})

export default rootReducer;
