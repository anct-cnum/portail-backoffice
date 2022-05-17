import authenticationReducer from './authenticationReducer';
import motDePasseOublieReducer from './motDePasseOublieReducer';
import createAccountReducer from './createAccountReducer';
import conseillersReducer from './conseillersReducer';
import conseillerReducer from './conseillerReducer';
import structureReducer from './structureReducer';
import structuresReducer from './structuresReducer';
import statsReducer from './statsReducer';
import statistiquesPrefetReducer from './statistiquesPrefetReducer';
import dashboardStatsReducer from './dashboardStatsReducer';
import filtersAndSorts from './filtersAndSortsReducer';
import menu from './menuReducer';
import searchReducer from './searchReducer';
import filterDateReducer from './filterDateReducer';
import pagination from './paginationReducer';
import exportsReducer from './exportsReducer';
import sondagesReducer from './sondagesReducer';
import userReducer from './userReducer';
import pilotageReducer from './pilotageReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  motDePasseOublie: motDePasseOublieReducer,
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
  filterDate: filterDateReducer,
  pagination: pagination,
  exports: exportsReducer,
  sondages: sondagesReducer,
  user: userReducer,
  pilotage: pilotageReducer,
  statistiquesPrefet: statistiquesPrefetReducer,
});

export default rootReducer;
