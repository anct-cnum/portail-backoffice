import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import conseillersReducer from './conseillersReducer';
import conseillerReducer from './conseillerReducer';
import structureReducer from './structureReducer';
import structuresReducer from './structuresReducer';
import statsReducer from './statsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  conseillers: conseillersReducer,
  conseiller: conseillerReducer,
  structure: structureReducer,
  structures: structuresReducer,
  stats: statsReducer,
});

export default rootReducer;
