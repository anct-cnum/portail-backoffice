export default function structure(state = null, action) {
  switch (action.type) {
    case 'GET_STRUCTURE_REQUEST':
      return {
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
    default:
      return state;
  }
}
