export default function filtersAndSorts(state = null, action) {
  switch (action.type) {
    case 'UPDATE_ORDER':
      return {
        ...state,
        order: action.order,
      };
    default:
      return state;
  }
}
