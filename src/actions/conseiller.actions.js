import { conseillerService } from '../services/conseiller.service.js';
import { statsActions, searchActions } from '../actions';
import download from 'downloadjs';

export const conseillerActions = {
  get,
  getAll,
  getAllRecrutes,
  updateStatus,
  updateDateRecrutement,
  preSelectionner,
  verifyCandidateToken,
  verifySondageToken,
  getCurriculumVitae,
  resetFile,
  getStructureByIdConseiller
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

  function request() {
    return { type: 'GET_CONSEILLER_REQUEST' };
  }
  function success(conseiller) {
    return { type: 'GET_CONSEILLER_SUCCESS', conseiller };
  }
  function failure(error) {
    return { type: 'GET_CONSEILLER_FAILURE', error };
  }

}

function getAll({
  departement = null,
  region = null,
  structureId = null,
  misesEnRelation,
  search = '',
  page = 0,
  filter,
  sortData = 'conseillerObj.createdAt',
  sortOrder = 1,
  persoFilters }) {
  return dispatch => {
    dispatch(request());

    let promises = [];
    if (misesEnRelation) {
      let promise = conseillerService.getAllMisesEnRelation(departement, region, structureId, search, page, filter, sortData, sortOrder, persoFilters);
      promises.push(promise);
    }

    let isSearch = search.length > 0;
    if (!misesEnRelation || isSearch) {
      let promise = conseillerService.getAll(departement, region, search, page, isSearch ? '' : filter, sortData, sortOrder, persoFilters);
      promises.push(promise);
    }

    let conseillers = null;
    Promise.all(promises).then(items => {
      conseillers = items[0];
      if (items.length > 1) {
        conseillers.data = [...items[0].data, ...items[1].data];
      }
      dispatch(success(conseillers));
    }).catch(error => {
      dispatch(failure(error));
    });
  };

  function request() {
    return { type: 'GETALL_REQUEST' };
  }
  function success(conseillers) {
    return { type: 'GETALL_SUCCESS', conseillers };
  }
  function failure(error) {
    return { type: 'GETALL_FAILURE', error };
  }
}

function getAllRecrutes({
  departement = null,
  region = null,
  search = '',
  page = 0,
  filter,
  sortData = 'conseillerObj.createdAt',
  sortOrder = 1,
  persoFilters }) {
  return dispatch => {
    dispatch(request());
    let promises = [];
    let isSearch = search.length > 0;
    let promise = conseillerService.getAllRecrutes(departement, region, search, page, isSearch ? '' : filter, sortData, sortOrder, persoFilters);
    promises.push(promise);

    let conseillers = null;
    Promise.all(promises).then(items => {
      conseillers = items[0];
      if (items.length > 1) {
        conseillers.data = [...items[0].data, ...items[1].data];
      }
      dispatch(success(conseillers));
    }).catch(error => {
      dispatch(failure(error));
    });
  };

  function request() {
    return { type: 'GETALL_REQUEST' };
  }
  function success(conseillers) {
    return { type: 'GETALL_SUCCESS', conseillers };
  }
  function failure(error) {
    return { type: 'GETALL_FAILURE', error };
  }
}

function updateStatus({ id, statut }) {
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

  function request() {
    return { type: 'UPDATE_STATUS_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_STATUS_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_STATUS_FAILURE', error };
  }
}

function updateDateRecrutement({ id, date }) {
  return dispatch => {
    dispatch(request());

    conseillerService.updateDateRecrutement(id, date)
    .then(
      miseEnRelation => dispatch(success(miseEnRelation)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'UPDATE_DATE_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'UPDATE_DATE_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'UPDATE_DATE_FAILURE', error };
  }
}

function preSelectionner({ conseillerId, structureId }) {
  return dispatch => {
    dispatch(request());

    conseillerService.preSelectionner(conseillerId, structureId)
    .then(
      miseEnRelation => {
        dispatch(searchActions.updateSearch(''));
        dispatch(statsActions.getMisesEnRelationStats());
        dispatch(success(miseEnRelation));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'PRESELECTIONNER_CONSEILLER_REQUEST' };
  }
  function success(miseEnRelation) {
    return { type: 'PRESELECTIONNER_CONSEILLER_SUCCESS', miseEnRelation };
  }
  function failure(error) {
    return { type: 'PRESELECTIONNER_CONSEILLER_FAILURE', error };
  }

}

function verifyCandidateToken(token) {
  return dispatch => {
    dispatch(request(token));

    conseillerService.verifyCandidateToken(token)
    .then(
      result => {
        dispatch(success(result.isValid, result.conseiller));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'VERIFY_CANDIDATE_TOKEN_REQUEST', token };
  }
  function success(isValid, conseiller) {
    return { type: 'VERIFY_CANDIDATE_TOKEN_SUCCESS', isValid, conseiller };
  }
  function failure(error) {
    return { type: 'VERIFY_CANDIDATE_TOKEN_FAILURE', error };
  }
}

function verifySondageToken(token) {
  return dispatch => {
    dispatch(request(token));

    conseillerService.verifySondageToken(token)
    .then(
      result => {
        dispatch(success(result.isValid, result.conseiller));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'VERIFY_SONDAGE_TOKEN_REQUEST', token };
  }
  function success(isValid, conseiller) {
    return { type: 'VERIFY_SONDAGE_TOKEN_SUCCESS', isValid, conseiller };
  }
  function failure(error) {
    return { type: 'VERIFY_SONDAGE_TOKEN_FAILURE', error };
  }
}

function getCurriculumVitae(id, candidat) {

  return dispatch => {
    dispatch(request());

    conseillerService.getCurriculumVitae(id)
    .then(
      data => dispatch(success(data, download(data, candidat?.nom + '_' + candidat?.prenom + '.' + candidat?.cv?.extension))),
      error => dispatch(failure(error))
    );
  };
  function request() {
    return { type: 'GET_CURRICULUM_VITAE_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_CURRICULUM_VITAE_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_CURRICULUM_VITAE_FAILURE', error };
  }
}

function resetFile() {
  return { type: 'RESET_FILE' };
}


function getStructureByIdConseiller(id) {
  return dispatch => {
    dispatch(request());

    conseillerService.getStructureByIdConseiller(id)
    .then(
      result => {
        dispatch(success(result.nomStructure));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STRUCTURE_EMPLOYER_REQUEST' };
  }
  function success(structure) {
    return { type: 'GET_STRUCTURE_EMPLOYER_SUCCESS', structure };
  }
  function failure(error) {
    return { type: 'GET_STRUCTURE_EMPLOYER_FAILURE', error };
  }
}
