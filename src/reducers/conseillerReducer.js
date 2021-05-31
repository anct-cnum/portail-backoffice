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
    case 'PRESELECTIONNER_CONSEILLER_REQUEST':
      return {
        loading: true
      };
    case 'PRESELECTIONNER_CONSEILLER_SUCCESS':
      return {
        ...state,
        misEnRelation: action.miseEnRelation
      };
    case 'PRESELECTIONNER_CONSEILLER_FAILURE':
      return {
        error: action.error
      };
    case 'VERIFY_CANDIDATE_TOKEN_REQUEST':
      return {
        verifyingToken: true
      };
    case 'VERIFY_CANDIDATE_TOKEN_SUCCESS':
      return {
        tokenVerified: true,
        conseiller: action.conseiller
      };
    case 'VERIFY_CANDIDATE_TOKEN_FAILURE':
      return {
        tokenVerified: false,
        error: action.error
      };
    case 'VERIFY_SONDAGE_TOKEN_REQUEST':
      return {
        verifyingToken: true
      };
    case 'VERIFY_SONDAGE_TOKEN_SUCCESS':
      return {
        tokenVerified: true,
        conseiller: action.conseiller
      };
    case 'VERIFY_SONDAGE_TOKEN_FAILURE':
      return {
        tokenVerified: false,
        error: action.error
      };
    default:
      return state;
  }
}
