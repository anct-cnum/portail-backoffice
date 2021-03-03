import { authHeader, history, userEntityId } from '../helpers';
import { userService } from './user.service';

const apiUrlRoot = process.env.REACT_APP_API;

export const structureService = {
  get,
  getAll,
};

function get() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrlRoot}/structures/${userEntityId()}`, requestOptions).then(handleResponse);
}

function getAll(departement, page, filter, sortData, sortOrder) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let uri = `${apiUrlRoot}/structures?$skip=${page}&$sort[${sortData}]=${sortOrder}&codeDepartement=${departement}`;
  if (filter) {
    uri += `&filter=${filter}`;
  }

  return fetch(uri, requestOptions).then(handleResponse);
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
