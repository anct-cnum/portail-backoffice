const initialState = {
  submited: false,
  errorsRequired: {
    disponible: true,
    contact: true,
    nombreContact: false
  },
};

export default function sondage(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DISPONIBILITE':
      return {
        ...state,
        errorsRequired: {
          ...state.errorsRequired,
          disponible: false },
      };
    case 'UPDATE_CONTACT':
      let number = false;
      if (action.contact === 'Oui') {
        number = true;
      }
      return {
        ...state,
        errorsRequired: {
          ...state.errorsRequired,
          contact: false,
          nombreContact: number },
      };
    case 'UPDATE_NUMBER_CONTACT':
      return {
        ...state,
        errorsRequired: {
          ...state.errorsRequired,
          nombreContact: false },
      };
    case 'VERIFY_SONDAGE':
      return {
        ...state,
        printError: action.hasErrors,
      };
    case 'POST_SURVEY_REQUEST':
      return {
        ...state,
        saveInProgress: true,
      };
    case 'POST_SURVEY_SUCCESS':
      return {
        submited: true,
      };
    case 'POST_SURVEY_FAILURE':
      return {
        ...state,
        error: action.error,
        saveInProgress: false,
      };
    default:
      return state;
  }
}
