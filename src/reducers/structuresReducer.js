export default function structures(state = [], action) {
  switch (action.type) {
    case 'GETALL_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'GETALL_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.structures
      };
    case 'GETALL_FAILURE':
      return {
        error: action.error
      };
    case 'GET_STRUCTURES_RECRUTEMENT_REQUEST':
      return {
        ...state,
        loadingAvancement: true
      };
    case 'GET_STRUCTURES_RECRUTEMENT_SUCCESS':
      return {
        ...state,
        avancement: action.result
      };
    case 'GET_STRUCTURES_RECRUTEMENT_FAILURE':
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
