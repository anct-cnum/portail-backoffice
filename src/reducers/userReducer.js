export default function user(state = null, action) {
  switch (action.type) {
    case 'PATCH_USER_REQUEST':
      return {
        loading: true,
        flashMessage: true
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
    default:
      return state;
  }
}
