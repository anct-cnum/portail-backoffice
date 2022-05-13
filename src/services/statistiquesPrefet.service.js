import { authHeader, history, userEntityId } from '../helpers';
import { userService } from './user.service';

export const statistiquesPrefetService = {
  getStatsStructures,
  getStatsCraNationale,
  getExportDonneesStructure,
  getCodesPostauxCrasConseiller,
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


function getStatsCraStructure(dateDebut, dateFin, idStructure, codePostal) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
  };
  return fetch(`${apiUrlRoot}/stats/structure/cra?dateDebut=${dateDebut}&dateFin=${dateFin}&idStructure=${idStructure}&codePostal=${codePostal}`,
    requestOptions).then(handleResponse);
}

function getStatsCraNationale(dateDebut, dateFin) {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/stats/nationales/cra?dateDebut=${dateDebut}&dateFin=${dateFin}`,
    requestOptions).then(handleResponse);
}

async function getExportDonneesStructure(territoire, dateDebut, dateFin, nomOrdre, ordre) {
  const requestOptions = {
    method: 'GET',
    headers: Object.assign(
      authHeader(), {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      })
  };

  const apiUrlRoot = process.env.REACT_APP_API;
  const exportTerritoiresRoute = '/exports/structures.csv/';

  return handleFileResponse(
    await fetch(`${apiUrlRoot}${exportTerritoiresRoute}${territoireQueryString(nomOrdre, territoire, ordre, dateDebut, dateFin)}`, requestOptions)
  );
}

function getCodesPostauxCrasConseiller() {
  const apiUrlRoot = process.env.REACT_APP_API;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${apiUrlRoot}/stats/cra/codesPostaux/conseiller/${userEntityId()}`, requestOptions).then(handleResponse);
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
    headers: Object.assign(authHeader(), { 'Content-Type': 'application/json' }),
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
