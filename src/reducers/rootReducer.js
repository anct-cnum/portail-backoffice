import authenticationReducer from './authenticationReducer';
import conseillersReducer from './conseillersReducer';
import conseillerReducer from './conseillerReducer';
import structureReducer from './structureReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    conseillers: conseillersReducer,
    conseiller: conseillerReducer,
    structure: structureReducer
})

export default rootReducer;
