const initialState = { loadingMultiCompte: false };

export default function user(state = initialState, action) {
  console.log('state:', state.loadingMultiCompte);
  switch (action.type) {
    case 'UPDATE_USER_EMAIL_REQUEST':
      return {
        loading: true,
        flashMessage: true
      };
    case 'UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        user: action.user,
        flashMessage: true
      };
    case 'UPDATE_USER_EMAIL_FAILURE':
      return {
        ...state,
        patchError: action.error,
        flashMessage: true
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_REQUEST':
      return {
        loading: true,
        flashMessage: true
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_SUCCESS':
      return {
        ...state,
        userConnected: action.user,
        flashMessage: true
      };
    case 'CONFIRMATION_UPDATE_USER_EMAIL_FAILURE':
      return {
        patchError: action.error,
        flashMessage: true
      };
    case 'INVITING_STRUCTURE_REQUEST':
      return {
        loadingMultiCompte: true
      };
    case 'INVITING_STRUCTURE_SUCCESS':
      return {
        ...state,
        status: action.status,
        loadingMultiCompte: false
      };
    case 'INVITING_STRUCTURE_FAILURE':
      return {
        ...state,
        error: action.error,
        loadingMultiCompte: false
      };
    case 'GET_USERS_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: action.users
      };
    case 'GET_USERS_FAILURE':
      return {
        ...state,
        userError: action.error
      };
    default:
      return state;
  }
}
