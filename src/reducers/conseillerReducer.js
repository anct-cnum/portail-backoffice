export default function conseiller(state = null, action) {
  switch (action.type) {
    case 'GET_CONSEILLER_REQUEST':
      return {
        loading: true
      };
    case 'GET_CONSEILLER_SUCCESS':
      return {
        ...state,
        conseiller: action.conseiller
      };
    case 'GET_CONSEILLER_FAILURE':
      return {
        error: action.error
      };
    case 'UPDATE_STATUS_REQUEST':
      return {
        ...state,
        errorUpdateStatus: false
      };
    case 'UPDATE_STATUS_SUCCESS':
      return {
        ...state,
        miseEnRelation: action.miseEnRelation,
        errorUpdateStatus: false
      };
    case 'UPDATE_STATUS_FAILURE':
      return {
        ...state,
        errorUpdateStatus: action.error
      };
    case 'UPDATE_DATE_SUCCESS':
      return {
        ...state,
        miseEnRelation: action.miseEnRelation
      };
    default:
      return state;
  }
}
