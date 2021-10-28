const initialState = {
  resetPage: true
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case 'RESET_PAGE':
      return {
        ...state,
        resetPage: action.toggle,
      };
    default:
      return state;
  }
}
