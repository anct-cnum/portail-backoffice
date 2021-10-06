import { authHeader, history, userEntityId } from '../helpers';

import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const conseillerService = {
  get,
  getAll,
  getAllMisesEnRelation,
  updateStatus,
  updateDateRecrutement,
  preSelectionner,
  verifyCandidateToken,
  verifySondageToken,
  getCurriculumVitae,
  getStructureByIdConseiller,
  suppressionCandidat
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}`, requestOptions).then(handleResponse);
}

function getAll(departement, region, com, search, page, filter, sortData, sortOrder, persoFilters) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const filterDepartement = departement !== null ? `&codeDepartement=${departement}` : '';
  const filterRegion = region !== null ? `&codeRegion=${region}` : '';
  const filterCom = com !== null ? `&codeCom=${com}` : '';
  const filterSearch = search !== '' ? `&$search=${search}&$limit=100` : '';
  const filterSort = search === '' ? `&$sort[${sortData}]=${sortOrder}` : '';

  let uri = `${apiUrlRoot}/conseillers?$skip=${page}${filterSort}${filterDepartement}${filterRegion}${filterCom}${filterSearch}`;

  if (persoFilters) {
    //Recrutés ?
    if (persoFilters?.recrutes !== undefined && persoFilters?.recrutes !== '') {
      uri += `&statut=${persoFilters?.recrutes}`;
    }
  }

  if (filter) {
    uri += `&filter=${filter}`;
  }

  return fetch(uri, requestOptions).then(handleResponse);
}

function getAllMisesEnRelation(departement, region, com, structureId, search, page, filter, sortData, sortOrder, persoFilters) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const filterDepartement = departement !== null ? `&codeDepartement=${departement}` : '';
  const filterRegion = region !== null ? `&codeRegion=${region}` : '';
  const filterCom = com !== null ? `&codeCom=${com}` : '';
  const filterSearch = search !== '' ? `&$search=${search}` : '';
  const filterSort = search === '' ? `&$sort[${sortData}]=${sortOrder}` : '';
  let uri = `${apiUrlRoot}/structures/${structureId ? structureId : userEntityId()}/misesEnRelation?\
$skip=${page}${filterSort}${filterDepartement}${filterRegion}${filterCom}${filterSearch}`;

  if (filter) {
    uri += `&filter=${filter}`;
  }
  if (persoFilters) {
    if (havePix(persoFilters)) {
      uri += `&pix=${persoFilters?.pix}`;
    }
    if (haveDiplome(persoFilters)) {
      uri += `&diplome=${persoFilters?.diplome}`;
    }
    if (haveCV(persoFilters)) {
      uri += `&cv=${persoFilters?.cv}`;
    }
  }

  return fetch(uri, requestOptions).then(handleResponse);
}

function updateStatus(id, statut) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      statut: statut
    })
  };

  return fetch(`${apiUrlRoot}/misesEnRelation/${id}`, requestOptions).then(handleResponse);
}

function preSelectionner(conseillerId, structureId) {
  const requestOptions = {
    method: 'POST',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' })
  };

  return fetch(`${apiUrlRoot}/structures/${structureId}/preSelectionner/${conseillerId}`, requestOptions).then(handleResponse);
}

function updateDateRecrutement(id, date) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      dateRecrutement: date
    })
  };

  return fetch(`${apiUrlRoot}/misesEnRelation/${id}`, requestOptions).then(handleResponse);
}

function verifyCandidateToken(token) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET'
  };

  let uri = `${apiUrlRoot}/conseillers/verifyCandidateToken/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function verifySondageToken(token) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET'
  };

  let uri = `${apiUrlRoot}/conseillers/verifySondageToken/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function getCurriculumVitae(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}/cv`, requestOptions).then(handleFileResponse);
}

function getStructureByIdConseiller(id) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  let uri = `${apiUrlRoot}/conseillers/${id}/employeur`;
  return fetch(uri, requestOptions).then(handleResponse);
}
function suppressionCandidat({ id, motif, actionUser }) {
  const requestOptions = {
    method: 'DELETE',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      motif,
      actionUser
    })
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}/candidature`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        history.push('/');
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function handleFileResponse(response) {
  return response.blob().then(blob => {
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        history.push('/');
      }
      const error = (blob && blob.message) || response.statusText;
      return Promise.reject(error);
    }
    return blob;
  });
}

function haveCV(persoFilters) {
  return persoFilters?.cv !== undefined && persoFilters?.cv !== null;
}
function haveDiplome(persoFilters) {
  return persoFilters?.diplome !== undefined && persoFilters?.diplome !== null;
}
function havePix(persoFilters) {
  return persoFilters?.pix !== undefined && persoFilters?.pix.length > 0;
}
