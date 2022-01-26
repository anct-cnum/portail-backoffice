import { authHeader, history, userEntityId } from '../helpers';
import { userService } from './user.service';

export const statsService = {
  getMisesEnRelationStats,
  getConseillersFinalisee,
  getStatsTerritoires
};

function getMisesEnRelationStats(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  const apiUrlRoot = process.env.REACT_APP_API;

  return fetch(`${apiUrlRoot}/structures/${id === null ? userEntityId() : id}/misesEnRelation/stats`, requestOptions).then(handleResponse);
}

function getConseillersFinalisee() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  const apiUrlRoot = process.env.REACT_APP_API;

  return fetch(`${apiUrlRoot}/stats/conseillers/finalisees`, requestOptions).then(handleResponse);
}

function territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page) {
  if (nomOrdre === 'code') {
    nomOrdre = territoire;
  } else if (nomOrdre === 'nom') {
    //Afin d'obtenir nomDepartemement ou nomRegion
    nomOrdre += territoire.slice(4);
  }
  const ordreColonne = nomOrdre ? '&nomOrdre=' + nomOrdre + '&ordre=' + ordre : '';
  const pageIfDefined = page ? '&page=' + page : '';

  return `?territoire=${territoire}&dateDebut=${dateDebut}&dateFin=${dateFin}${pageIfDefined}${ordreColonne}`;
}

function getStatsTerritoires(territoire, dateDebut, dateFin, page, nomOrdre, ordre) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };

  return fetch(
    `${apiUrlRoot}/stats/admincoop/territoires${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin, page)}`,
    requestOptions
  ).then(handleResponse);
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
