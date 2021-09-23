export default function structure(state = null, action) {
  switch (action.type) {
    case 'GET_STRUCTURE_REQUEST':
      return {
        ...state,
        loading: true,
        flashMessage: false
      };
    case 'GET_STRUCTURE_SUCCESS':
      return {
        ...state,
        structure: action.structure
      };
    case 'GET_STRUCTURE_FAILURE':
      return {
        error: action.error
      };
    case 'RESUBMIT_INSCRIPTION_REQUEST':
      return {
        ...state,
        flashMessage: false
      };
    case 'RESUBMIT_INSCRIPTION_SUCCESS':
      return {
        ...state,
        flashMessage: true,
        errorResendInscription: false
      };
    case 'RESUBMIT_INSCRIPTION_FAILURE':
      return {
        ...state,
        errorResendInscription: action.error,
        flashMessage: true
      };
    case 'PATCH_STRUCTURE_REQUEST':
      return {
        loading: true,
        flashMessage: true
      };
    case 'PATCH_STRUCTURE_SUCCESS':
      return {
        ...state,
        structure: action.structure,
        flashMessage: true
      };
    case 'PATCH_STRUCTURE_FAILURE':
      return {
        patchError: action.error,
        flashMessage: true
      };
    case 'VERIFY_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        loadingSiret: true
      };
    case 'VERIFY_STRUCTURE_SIRET_SUCCESS':
      return {
        ...state,
        nomStructure: action.nomStructure,
      };
    case 'VERIFY_STRUCTURE_SIRET_FAILURE':
      return {
        ...state,
        siretError: action.error,
      };
    case 'UPDATE_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        loadingSiret: true
      };
    case 'UPDATE_STRUCTURE_SIRET_SUCCESS':
      return {
        ...state,
        structureSiretUpdated: action.siretUpdated,
      };
    case 'UPDATE_STRUCTURE_SIRET_FAILURE':
      return {
        ...state,
        structutreSiretError: action.error,
      };
    case 'CANCEL_STRUCTURE_SIRET_REQUEST':
      return {
        ...state,
        nomStructure: null,
        structureSiretUpdated: null,
        loadingSiret: false
      };
    case 'UPDATE_STRUCTURE_EMAIL_REQUEST':
      return {
        ...state,
        loadingEmail: true,
        structureEmailError: false,
        messageChangeEmailSuccess: false
      };
    case 'UPDATE_STRUCTURE_EMAIL_SUCCESS':
      return {
        ...state,
        messageChangeEmailSuccess: action.emailUpdated.emailUpdated
      };
    case 'UPDATE_STRUCTURE_EMAIL_FAILURE':
      return {
        ...state,
        messageChangeEmailError: true,
        structureEmailError: action.error,
      };
    default:
      return state;
  }
}
