import { authHeader, history, userEntityId } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const structureService = {
  get,
  getAll,
  resendInscription,
  patch,
  verifyStructureSiret,
  updateStructureSiret,
  getAvancementRecrutement
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/structures/${id ? id : userEntityId()}`, requestOptions).then(handleResponse);
}

function getAll(departement, region, search, start, end, type, page, filter, sortData, sortOrder) {

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const filterDepartement = departement !== null ? `&codeDepartement=${departement}` : '';
  const filterRegion = region !== null ? `&codeRegion=${region}` : '';
  const filterSearch = search !== '' ? `&$search=${search}` : '';


  const filterDateStart = start !== '' ? `&createdAt[$gt]=${new Date(start).toISOString()}` : '';
  const filterDateEnd = end !== '' ? `&createdAt[$lt]=${new Date(end).toISOString()}` : '';

  let filterType = '';
  if (type !== null) {
    filterType = type === 'PRIVATE' ? `&type=PRIVATE` : '&type[$ne]=PRIVATE';
  }
  // eslint-disable-next-line max-len
  let uri = `${apiUrlRoot}/structures?$skip=${page}&$sort[${sortData}]=${sortOrder}${filterDepartement}${filterRegion}${filterDateStart}${filterDateEnd}${filterType}${filterSearch}`;


  if (filter) {
    uri += `&filter=${filter}`;
  }

  return fetch(uri, requestOptions).then(handleResponse);
}

function resendInscription(id) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/structures/${id}/relance-inscription`, requestOptions).then(handleResponse);
}

function patch({ id, contact }) {
  const requestOptions = {
    method: 'PATCH',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify({ contact })
  };

  return fetch(`${apiUrlRoot}/structures/${id}`, requestOptions).then(handleResponse);
}

function verifyStructureSiret(siret, structureId) {

  const user = { siret, structureId };

  const requestOptions = {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrlRoot}/structures/verifyStructureSiret`, requestOptions).then(handleResponse);
}

function updateStructureSiret(siret, structureId) {

  const user = { siret, structureId };

  const requestOptions = {
    method: 'POST',
    headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrlRoot}/structures/updateStructureSiret`, requestOptions).then(handleResponse);
}

function getAvancementRecrutement() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${apiUrlRoot}/structures/getAvancementRecrutement`, requestOptions).then(handleResponse);
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

