import { structureService } from '../services/structure.service.js';

export const structureActions = {
  get,
  getAll,
  resendInscription,
};

function get(id) {
  return dispatch => {
    dispatch(request());

    structureService.get(id)
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

function getAll({ departement = null, region = null, search = '', start = '', end = '', type = null,
  page = 0, filter, sortData = 'createdAt', sortOrder = 1 }) {

  return dispatch => {
    dispatch(request());

    structureService.getAll(departement, region, search, start, end, type, page, filter, sortData, sortOrder)
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

function resendInscription(id) {
  return dispatch => {
    dispatch(request());

    structureService.resendInscription(id)
    .then(
      structure => dispatch(success(structure)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'RESUBMIT_INSCRIPTION_REQUEST' };
  }
  function success(structure) {
    return { type: 'RESUBMIT_INSCRIPTION_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'RESUBMIT_INSCRIPTION_FAILURE', error };
  }
}
