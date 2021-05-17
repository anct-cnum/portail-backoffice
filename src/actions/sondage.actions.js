import { sondagesService } from '../services/sondages.service.js';

export const sondageActions = {
  updateDisponibilite,
  updateConcate,
  updateNumberContact,
  verifySondage,
  createSondage,
};

function updateDisponibilite(disponible) {
  return { type: 'UPDATE_DISPONIBILITE', disponible };
}

function updateConcate(contact) {
  return { type: 'UPDATE_CONTACT', contact };
}

function updateNumberContact(nombreContact) {
  return { type: 'UPDATE_NUMBER_CONTACT', nombreContact };
}

function verifySondage(errors) {
  let hasErrors = false;
  errors.forEach(error => {
    if (error === true) {
      hasErrors = true;
    }
  });
  return { type: 'VERIFY_SONDAGE', hasErrors };
}

function createSondage(survey) {
  return dispatch => {
    dispatch(request());
    sondagesService.createSondage(survey)
    .then(
      () => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'POST_SURVEY_REQUEST' };
  }
  function success() {
    return { type: 'POST_SURVEY_SUCCESS' };
  }
  function failure(error) {
    return { type: 'POST_SURVEY_FAILURE', error };
  }
}
