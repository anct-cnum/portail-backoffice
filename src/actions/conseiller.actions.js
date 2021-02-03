import { conseillerService } from '../services/conseiller.service.js';

export const conseillerActions = {
  getAll,
  updateStatus,
};

function getAll({page = 0, filter }) {
  return dispatch => {
      dispatch(request());

      conseillerService.getAll(page, filter)
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
          conseiller => dispatch(success(conseiller)),
            error => {
                dispatch(failure(error));
            }
        );
};

  function request() { return { type: 'UPDATE_STATUS_REQUEST' } }
  function success(conseiller) { return { type: 'UPDATE_STATUS_SUCCESS', conseiller } }
  function failure(error) { return { type: 'UPDATE_STATUS_FAILURE', error } }
}
