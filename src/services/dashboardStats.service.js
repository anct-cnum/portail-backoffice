import { authHeader, history } from '../helpers';
import { userService } from './user.service';

export const dashboardStatsService = {
  getStats,
};

function getStats() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  const apiUrlRoot = process.env.REACT_APP_API;

  return fetch(`${apiUrlRoot}/stats/dashboard`, requestOptions).then(handleResponse);
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
