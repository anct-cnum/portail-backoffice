export const pilotageActions = {
  changeTerritoire,
  changeDateDebut,
  changeDateFin,
  changeOrdre
};

function changeTerritoire(territoire) {
  return { type: 'CHANGE_TERRITOIRE', territoire };
}
function changeDateDebut(dateDebut) {
  return { type: 'CHANGE_DATE_DEBUT', dateDebut };
}

function changeDateFin(dateFin) {
  return { type: 'CHANGE_DATE_FIN', dateFin };
}

function changeOrdre(ordreNom) {
  return { type: 'CHANGE_ORDRE', ordreNom };
}

