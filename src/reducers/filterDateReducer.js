const initialState = {
  filterDateStart: new Date(1605571200000),
  filterDateEnd: new Date(),
};

export default function filterDate(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_FILTER_DATE_START':
      return {
        ...state,
        filterDateStart: action.filterDateStart,
      };
    case 'UPDATE_FILTER_DATE_END':
      return {
        ...state,
        filterDateEnd: action.filterDateEnd
      };
    default:
      return state;
  }
}
