export default function user(state = null, action) {
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
        invitingStructure: true
      };
    case 'INVITING_STRUCTURE_SUCCESS':
      return {
        structureinvited: true,
        status: action.status
      };
    case 'INVITING_STRUCTURE_FAILURE':
      return {
        structureinvited: false,
        error: action.error
      };
    case 'GET_USERS_REQUEST':
      return {
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
