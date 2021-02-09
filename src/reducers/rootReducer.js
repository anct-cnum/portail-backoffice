import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import conseillersReducer from './conseillersReducer';
import conseillerReducer from './conseillerReducer';
import structureReducer from './structureReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    createAccount: createAccountReducer,
    conseillers: conseillersReducer,
    conseiller: conseillerReducer,
    structure: structureReducer
})

export default rootReducer;
