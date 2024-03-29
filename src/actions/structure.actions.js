import { structureService } from '../services/structure.service.js';

export const structureActions = {
  get,
  getAll,
  resendInscription,
  patch,
  verifyStructureSiret,
  updateStructureEmail,
  updateStructureSiret,
  cancelStructureSiret,
  getAvancementRecrutement
};

function get(id) {
  return dispatch => {
    dispatch(request());

    structureService.get(id)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STRUCTURE_REQUEST' };
  }
  function success(structure) {
    return { type: 'GET_STRUCTURE_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'GET_STRUCTURE_FAILURE', error };
  }
}

function getAll({ departement = null, region = null, com = null, search = '', start = '', end = '', type = null, statut = null,
  page = 0, filter, sortData = 'createdAt', sortOrder = -1 }) {

  return dispatch => {
    dispatch(request());

    structureService.getAll(departement, region, com, search, start, end, type, statut, page, filter, sortData, sortOrder)
    .then(
      structures => dispatch(success(structures)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GETALL_REQUEST' };
  }
  function success(structures) {
    return { type: 'GETALL_SUCCESS', structures };
  }
  function failure(error) {
    return { type: 'GETALL_FAILURE', error };
  }
}

function resendInscription(id) {
  return dispatch => {
    dispatch(request());

    structureService.resendInscription(id)
    .then(
      structure => dispatch(success(structure)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'RESUBMIT_INSCRIPTION_REQUEST' };
  }
  function success(structure) {
    return { type: 'RESUBMIT_INSCRIPTION_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'RESUBMIT_INSCRIPTION_FAILURE', error };
  }
}

function patch(info) {
  return dispatch => {
    dispatch(request());

    structureService.patch(info)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'PATCH_STRUCTURE_REQUEST' };
  }
  function success(structure) {
    return { type: 'PATCH_STRUCTURE_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'PATCH_STRUCTURE_FAILURE', error };
  }
}

function verifyStructureSiret(siret, structureId) {

  return dispatch => {
    dispatch(request());

    structureService.verifyStructureSiret(siret, structureId)
    .then(
      result => dispatch(success(result.nomStructure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'VERIFY_STRUCTURE_SIRET_REQUEST' };
  }
  function success(nomStructure) {
    return { type: 'VERIFY_STRUCTURE_SIRET_SUCCESS', nomStructure };
  }
  function failure(error) {
    return { type: 'VERIFY_STRUCTURE_SIRET_FAILURE', error };
  }
}
function updateStructureEmail(email, structureId) {

  return dispatch => {
    dispatch(request());

    structureService.updateStructureEmail(email, structureId)
    .then(
      structure => dispatch(success(structure)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_STRUCTURE_EMAIL_REQUEST' };
  }
  function success(emailUpdated) {
    return { type: 'UPDATE_STRUCTURE_EMAIL_SUCCESS', emailUpdated };
  }
  function failure(error) {
    return { type: 'UPDATE_STRUCTURE_EMAIL_FAILURE', error };
  }
}

function updateStructureSiret(siret, structureId) {

  return dispatch => {
    dispatch(request());

    structureService.updateStructureSiret(siret, structureId)
    .then(
      structure => dispatch(success(structure.siretUpdated)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_STRUCTURE_SIRET_REQUEST' };
  }
  function success(siretUpdated) {
    return { type: 'UPDATE_STRUCTURE_SIRET_SUCCESS', siretUpdated };
  }
  function failure(error) {
    return { type: 'UPDATE_STRUCTURE_SIRET_FAILURE', error };
  }
}
function cancelStructureSiret() {
  return dispatch => {
    dispatch(request());
  };

  function request() {
    return { type: 'CANCEL_STRUCTURE_SIRET_REQUEST' };
  }
}

function getAvancementRecrutement() {
  return dispatch => {
    dispatch(request());

    structureService.getAvancementRecrutement()
    .then(
      result => dispatch(success(result)),
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: 'GET_STRUCTURES_RECRUTEMENT_REQUEST' };
  }
  function success(result) {
    return { type: 'GET_STRUCTURES_RECRUTEMENT_SUCCESS', result };
  }
  function failure(error) {
    return { type: 'GET_STRUCTURES_RECRUTEMENT_FAILURE', error };
  }
}
