import { structureService } from '../services/structure.service.js';

export const structureActions = {
  get,
  getAll,
};

function get() {
  return dispatch => {
    dispatch(request());

    structureService.get()
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STRUCTURE_REQUEST' };
  }
  function success(structure) {
    return { type: 'GET_STRUCTURE_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'GET_STRUCTURE_FAILURE', error };
  }
}


function getAll({ departement, page = 0, filter, sortData = 'siret', sortOrder = 1 }) {
  return dispatch => {
    dispatch(request());

    structureService.getAll(departement, page, filter, sortData, sortOrder)
    .then(
      structures => dispatch(success(structures)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_REQUEST' };
  }
  function success(structures) {
    return { type: 'GETALL_SUCCESS', structures };
  }
  function failure(error) {
    return { type: 'GETALL_FAILURE', error };
  }
}
