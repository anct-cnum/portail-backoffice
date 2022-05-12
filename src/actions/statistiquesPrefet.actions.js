import { statistiquesPrefetService } from '../services/statistiquesPrefet.service.js';
import download from 'downloadjs';
import dayjs from 'dayjs';

export const statistiquesPrefetActions = {
  changeDateStatsDebut,
  changeDateStatsFin,
  changeCodePostalStats,
  updateListeAutresReorientations,
  getCodesPostauxCrasConseillerStructure,
  getStatsCraStructure,
  getStatistiquesCSV,
  getStatistiquesPDF,
  resetStatistiquesPDFFile
};

const formatDate = date => {
  return dayjs(date).format('YYYY-MM-DD');
};

const removeCodePrefix = type =>
  type.startsWith('code') ? type.substring('code'.length) : type;

const statistiquesAdminFileName = (dateDebut, dateFin, type, idType, codePostal) =>
  // eslint-disable-next-line max-len
  `Statistiques_${removeCodePrefix(type)}${codePostal ? `_${codePostal}` : ''}${idType ? `_${idType}` : ''}_${formatDate(dateDebut)}_${formatDate(dateFin)}`;


function changeDateStatsDebut(dateDebut) {
  return { type: 'CHANGE_DATE_DEBUT_STATS', dateDebut };
}

function changeDateStatsFin(dateFin) {
  return { type: 'CHANGE_DATE_FIN_STATS', dateFin };
}

function changeCodePostalStats(codePostal) {
  return { type: 'CHANGE_CODE_POSTAL_STATS', codePostal };
}

function updateListeAutresReorientations(listeAutresReorientations) {
  return { type: 'UPDATE_AUTRES_REORIENTATIONS', listeAutresReorientations };
}

function getCodesPostauxCrasConseillerStructure(idStructure) {

  return dispatch => {
    dispatch(request());

    statistiquesPrefetService.getCodesPostauxCrasConseillerStructure(idStructure)
    .then(
      listeCodesPostaux => {
        dispatch(success(listeCodesPostaux));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_CODES_POSTAUX_CRA_REQUEST' };
  }
  function success(listeCodesPostaux) {
    return { type: 'GET_CODES_POSTAUX_CRA_SUCCESS', listeCodesPostaux };
  }
  function failure(error) {
    return { type: 'GET_CODES_POSTAUX_CRA_FAILURE', error };
  }
}

function getStatsCraStructure(dateDebut, dateFin, idStructure, codePostal = null) {
  return dispatch => {
    dispatch(request());
    statistiquesPrefetService.getStatsCraStructure(formatDate(dateDebut), formatDate(dateFin), idStructure, codePostal)
    .then(
      statsStructure => {
        dispatch(success(statsStructure));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_STATS_CRA_STRUCTURE_REQUEST' };
  }
  function success(statsStructure) {
    return { type: 'GET_STATS_CRA_STRUCTURE_SUCCESS', statsStructure };
  }
  function failure(error) {
    return { type: 'GET_STATS_CRA_STRUCTURE_FAILURE', error };
  }
}

function getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal) {
  return dispatch => {
    dispatch(request());
    statistiquesPrefetService.getStatistiquesCSV(dateDebut, dateFin, type, idType, conseillerIds, codePostal)
    .then(
      data => dispatch(success(data, download(data, `${statistiquesAdminFileName(dateDebut, dateFin, type, idType, codePostal)}.csv`))),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'GET_STATS_CSV_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_STATS_CSV_SUCCESS', data, download };
  }
  function failure(error) {
    return { type: 'GET_STATS_CSV_FAILURE', error };
  }
}

function getStatistiquesPDF(dateDebut, dateFin, type, idType, codePostal) {
  return dispatch => {
    dispatch(request());
    statistiquesPrefetService.getStatistiquesPDF(dateDebut, dateFin, type, idType, codePostal)
    .then(
      data => dispatch(success(data, download(data, `${statistiquesAdminFileName(dateDebut, dateFin, type, codePostal)}.pdf`))),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: 'GET_STATS_PDF_REQUEST' };
  }
  function success(data, download) {
    return { type: 'GET_STATS_PDF_SUCCESS', data, download };
  }
  function failure(error) {

    return { type: 'GET_STATS_PDF_FAILURE', error };
  }
}

function resetStatistiquesPDFFile() {
  return { type: 'RESET_FILE' };
}
