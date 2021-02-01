import { conseillerService } from '../services/conseiller.service.js';

export const conseillerActions = {
  getAll,
};

function getAll() {
  return dispatch => {
      dispatch(request());

      conseillerService.getAll()
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
