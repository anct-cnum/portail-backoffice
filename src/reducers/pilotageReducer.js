const initialState = {
  dateDebut: new Date(1605571200000),
  dateFin: new Date(),
  profil: 'tous',
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
    default:
      return state;
  }
}
