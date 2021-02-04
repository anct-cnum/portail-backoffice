import { structureService } from '../services/structure.service.js';

export const structureActions = {
  get,
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

  function request() { return { type: 'GET_REQUEST' } }
  function success(structure) { return { type: 'GET_SUCCESS', structure } }
  function failure(error) { return { type: 'GET_FAILURE', error } }
}
