import { structureService } from '../services/structure.service.js';

export const structureActions = {
  getAll,
};

function getAll() {
  return dispatch => {
      dispatch(request());

      structureService.getAll()
          .then(
            structure => dispatch(success(structure)),
              error => {
                  dispatch(failure(error));
              }
          );
  };

  function request() { return { type: 'GETALL_REQUEST' } }
  function success(structure) { return { type: 'GETALL_SUCCESS', structure } }
  function failure(error) { return { type: 'GETALL_FAILURE', error } }
}
