import authenticationReducer from './authenticationReducer';
import conseillersReducer from './conseillersReducer';
import structureReducer from './structureReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    conseillers: conseillersReducer,
    structure: structureReducer
})

export default rootReducer;
