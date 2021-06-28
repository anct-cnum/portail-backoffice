export default function user(state = null, action) {
  switch (action.type) {
    case 'PATCH_USER_REQUEST':
      return {
        loading: true,
        flashMessage: false
      };
    case 'PATCH_USER_SUCCESS':
      return {
        ...state,
        user: action.user,
        flashMessage: true
      };
    case 'PATCH_USER_FAILURE':
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
