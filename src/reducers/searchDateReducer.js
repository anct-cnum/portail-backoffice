const initialState = {
  searchDateBegin: new Date(),
  searchDateEnd: new Date(),
};

export default function searchDate(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_DATE_BEGIN':
      return {
        ...state,
        searchDateBegin: action.searchDateBegin,
      };
    case 'UPDATE_SEARCH_DATE_END':
      return {
        ...state,
        searchDateEnd: action.searchDateEnd
      };
    default:
      return state;
  }
}
