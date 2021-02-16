import { conseillerService } from '../services/conseiller.service.js';

export const conseillerActions = {
  get,
  getAll,
  updateStatus,
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

function request() { return { type: 'GET_CONSEILLER_REQUEST' } }
function success(conseiller) { return { type: 'GET_CONSEILLER_SUCCESS', conseiller } }
function failure(error) { return { type: 'GET_CONSEILLER_FAILURE', error } }

}

function getAll({page = 0, filter, sortData = 'conseillerCreatedAt', sortOrder = 1 }) {
  return dispatch => {
      dispatch(request());

      conseillerService.getAll(page, filter, sortData, sortOrder)
          .then(
            conseillers => dispatch(success(conseillers)),
              error => {
                  dispatch(failure(error));
              }
          );
  };

  function request() { return { type: 'GETALL_REQUEST' } }
  function success(conseillers) { return { type: 'GETALL_SUCCESS', conseillers } }
  function failure(error) { return { type: 'GETALL_FAILURE', error } }
}

function updateStatus({id, statut}) {
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

  function request() { return { type: 'UPDATE_STATUS_REQUEST' } }
  function success(miseEnRelation) { return { type: 'UPDATE_STATUS_SUCCESS', miseEnRelation } }
  function failure(error) { return { type: 'UPDATE_STATUS_FAILURE', error } }
}
