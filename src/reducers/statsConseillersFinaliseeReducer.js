export default function conseillers(state = [], action) {
  switch (action.type) {
    case 'GET_CONSEILLERS_FINALISEE_REQUEST':
      return {
        loading: true
      };
    case 'GET_CONSEILLERS_FINALISEE_SUCCESS':
      return {
        totalConseillers: action.conseillers.conseillerTotalFinalisee
      };
    case 'GET_CONSEILLERS_FINALISEE_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
