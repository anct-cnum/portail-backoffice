import { authHeader, history } from '../helpers';
import { userService } from './user.service';

export const statistiquesPrefetService = {
  getStatsStructures,
  getStatsCraStructure,
  getCodesPostauxCrasConseillerStructure,
  getStatistiquesPDF,
  getStatistiquesCSV
};

function getStatsStructures(dateDebut, dateFin, page) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/stats/prefet/structures?dateDebut=${dateDebut}&dateFin=${dateFin}&page=${page}`,
    requestOptions
  ).then(handleResponse);
}

function getStatsCraStructure(dateDebut, dateFin, idStructure, codePostal) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(`${apiUrlRoot}/stats/structure/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&idStructure=${idStructure}&codePostal=${codePostal}`,
    requestOptions).then(handleResponse);
}

function getCodesPostauxCrasConseillerStructure(idStructure) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/stats/cra/codesPostaux/structure/${idStructure}`, requestOptions).then(handleResponse);
}

function getStatistiquesPDF(dateDebut, dateFin, type, idType, codePostal) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}/stats/admincoop/statistiques.pdf?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}`,
    requestOptions).then(response => !response.ok ? handleResponse(response) : handleFileResponse(response));
}

function getStatistiquesCSV(dateDebut, dateFin, type, idType, codePostal) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  // eslint-disable-next-line max-len
  return fetch(`${apiUrlRoot}/stats/admincoop/statistiques.csv?dateDebut=${dateDebut}&dateFin=${dateFin}&type=${type}&idType=${idType}&codePostal=${codePostal}`,
    requestOptions).then(handleFileResponse);
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
