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
    case 'GET_USER_REQUEST':
      return {
        loading: true
      };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        userId: action.user,
      };
    case 'GET_USER_FAILURE':
      return {
        getError: action.error,
      };
    default:
      return state;
  }
}
