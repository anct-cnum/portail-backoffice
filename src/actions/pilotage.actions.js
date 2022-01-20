export const pilotageActions = {
  changeTerritoire
};

function changeTerritoire(territoire) {
  return { type: 'CHANGE_TERRITOIRE', territoire };
}
