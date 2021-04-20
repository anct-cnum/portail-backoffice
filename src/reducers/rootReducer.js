import authenticationReducer from './authenticationReducer';
import createAccountReducer from './createAccountReducer';
import conseillersReducer from './conseillersReducer';
import conseillerReducer from './conseillerReducer';
import structureReducer from './structureReducer';
import structuresReducer from './structuresReducer';
import statsReducer from './statsReducer';
import dashboardStatsReducer from './dashboardStatsReducer';
import filtersAndSorts from './filtersAndSortsReducer';
import menu from './menuReducer';
import searchReducer from './searchReducer';
import searchDateReducer from './searchDateReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createAccount: createAccountReducer,
  conseillers: conseillersReducer,
  conseiller: conseillerReducer,
  structure: structureReducer,
  structures: structuresReducer,
  stats: statsReducer,
  filtersAndSorts: filtersAndSorts,
  menu: menu,
  dashboardStats: dashboardStatsReducer,
  search: searchReducer,
  searchDate: searchDateReducer,
});

export default rootReducer;
