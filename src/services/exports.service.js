import { authHeader } from '../helpers';
import { userService } from './user.service';

export const exportsService = {
  getFile,
};

function getFile(name) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), {
      'Accept': 'text/plain',
      'Content-Type': 'text/plain',
    })
  };

  const apiUrlRoot = process.env.REACT_APP_API;

  return fetch(`${apiUrlRoot}/exports/${name}.csv`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.blob().then(blob => {
    const data = blob;
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
