import { conseillerService } from '../services/conseiller.service.js';

export const conseillerActions = {
  get,
  getAll,
  updateStatus,
  updateDateRecrutement,
};

function get(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.get(id)
    .then(
      conseiller => dispatch(success(conseiller)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CONSEILLER_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'GET_CONSEILLER_FAILURE', error };
  }

}

function getAll({ departement, region, misesEnRelation, page = 0, filter, sortData = 'conseillerCreatedAt', sortOrder = 1, persoFilters }) {
  return dispatch => {
    dispatch(request());

    const getAll = misesEnRelation ? conseillerService.getAllMisesEnRelation : conseillerService.getAll;

    getAll(departement, region, page, filter, sortData, sortOrder, persoFilters)
    .then(
      conseillers => dispatch(success(conseillers)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_REQUEST' };
  }
  function success(conseillers) {
    return { type: 'GETALL_SUCCESS', conseillers };
  }
  function failure(error) {
    return { type: 'GETALL_FAILURE', error };
  }
}

function updateStatus({ id, statut }) {
  return dispatch => {
    dispatch(request());

    conseillerService.updateStatus(id, statut)
    .then(
      miseEnRelation => dispatch(success(miseEnRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_STATUS_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_STATUS_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_STATUS_FAILURE', error };
  }
}

function updateDateRecrutement({ id, date }) {
  return dispatch => {
    dispatch(request());

    conseillerService.updateDateRecrutement(id, date)
    .then(
      miseEnRelation => dispatch(success(miseEnRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_DATE_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_DATE_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_DATE_FAILURE', error };
  }
}
