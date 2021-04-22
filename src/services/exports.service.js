import { authHeader } from '../helpers';

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

  return fetch(`${apiUrlRoot}/exports/${name}.csv`, requestOptions)
  .then(res => res.blob())
  .catch(err => console.log(err));
}
