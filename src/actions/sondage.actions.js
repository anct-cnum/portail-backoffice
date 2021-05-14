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

function updateNumberContact(numberContact) {
  return { type: 'UPDATE_NUMBER_CONTACT', numberContact };
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

function createSondage(token, survey) {
  return dispatch => {
    dispatch(request(token));

    sondagesService.createSondage(token, survey)
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
