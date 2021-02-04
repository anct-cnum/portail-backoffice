import { authHeader, history, userEntityId } from '../helpers';

import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const conseillerService = {
  getAll,
  updateStatus,
}

function getAll(page, filter) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let uri = `${apiUrlRoot}/structures/${userEntityId()}/misesEnRelation?$skip=${page}&$sort[createdAt]=-1`;
  if (filter) {
    uri += `&filter=${filter}`;
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
