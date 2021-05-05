import { exportsService } from '../services/exports.service';

export const exportsActions = {
  exportFile,
  resetFile
};

function exportFile(nameFile) {
  return dispatch => {
    dispatch(request());

    exportsService.getFile(nameFile)
    .then(
      blob => dispatch(success(blob, nameFile)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'EXPORT_FILE_REQUEST' };
  }
  function success(blob, nameFile) {
    return { type: 'EXPORT_FILE_SUCCESS', blob, nameFile };
  }
  function failure(error) {
    return { type: 'EXPORT_FILE_FAILURE', error };
  }
}

function resetFile() {
  return { type: 'RESET_FILE' };
}
