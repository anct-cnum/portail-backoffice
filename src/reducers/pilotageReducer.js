const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
  ordre: true,
  ordreNom: undefined,
  territoire: 'codeDepartement',
};

export default function pilotage(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_TERRITOIRE':
      return {
        ...state,
        territoire: action.territoire
      };
    case 'CHANGE_DATE_DEBUT':
      return {
        ...state,
        dateDebut: action.dateDebut,
      };
    case 'CHANGE_DATE_FIN':
      return {
        ...state,
        dateFin: action.dateFin,
      };
    case 'CHANGE_ORDRE':
      return {
        ...state,
        ordre: !state.ordre,
        ordreNom: action.ordreNom
      };
    default:
      return state;
  }
}
