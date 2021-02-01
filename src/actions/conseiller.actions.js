import { conseillerService } from '../services/conseiller.service.js';

export const conseillerActions = {
  getAll,
};

function getAll(page = 0) {
  return dispatch => {
      dispatch(request());

      conseillerService.getAll(page)
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
