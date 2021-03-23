export default function filtersAndSorts(state = null, action) {
  switch (action.type) {
    case 'UPDATE_ORDER':
      return {
        ...state,
        order: action.order,
      };
    case 'UPDATE_PIX':
      return {
        ...state,
        pix: action.pix,
      };
    case 'UPDATE_DIPLOME':
      return {
        ...state,
        diplome: action.diplome,
      };
    default:
      return state;
  }
}
