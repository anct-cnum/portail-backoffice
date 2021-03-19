import { authHeader, history, userEntityId } from '../helpers';

import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const conseillerService = {
  get,
  getAll,
  getAllMisesEnRelation,
  updateStatus,
  updateDateRecrutement,
};

function get(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/conseillers/${id}`, requestOptions).then(handleResponse);
}

function getAll(departement, region, page, filter, sortData, sortOrder) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const filterDepartement = departement !== null ? `&codeDepartement=${departement}` : '';
  const filterRegion = region !== null ? `&codeRegion=${region}` : '';
  let uri = `${apiUrlRoot}/conseillers?$skip=${page}&$sort[${sortData}]=${sortOrder}${filterDepartement}${filterRegion}`;

  if (filter) {
    uri += `&filter=${filter}`;
  }

  return fetch(uri, requestOptions).then(handleResponse);
}

function getAllMisesEnRelation(departement, region, page, filter, sortData, sortOrder, persoFilters) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const filterDepartement = departement !== null ? `&codeDepartement=${departement}` : '';
  const filterRegion = region !== null ? `&codeRegion=${region}` : '';
  let uri = `${apiUrlRoot}/structures/${userEntityId()}/misesEnRelation?$skip=${page}&$sort[${sortData}]=${sortOrder}${filterDepartement}${filterRegion}`;

  if (filter) {
    uri += `&filter=${filter}`;
  }
  if (persoFilters) {
    //Pix ?
    if (persoFilters?.pix !== undefined && persoFilters?.pix.length > 0) {
      uri += `&pix=${persoFilters?.pix}`;
    }
    //Diplome ?
    if (persoFilters?.diplome !== undefined && persoFilters?.diplome !== '') {
      uri += `&diplome=${persoFilters?.diplome}`;
    }
    //Emploi ?
    if (persoFilters?.emploi !== undefined && persoFilters?.emploi !== '') {
      uri += `&emploi=${persoFilters?.emploi}`;
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
