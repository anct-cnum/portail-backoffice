export const searchDateActions = {
  updateSearchDateBegin, updateSearchDateEnd
};

function updateSearchDateBegin(searchDateBegin) {
  return { type: 'UPDATE_SEARCH_DATE_BEGIN', searchDateBegin };
}

function updateSearchDateEnd(searchDateEnd) {
  return { type: 'UPDATE_SEARCH_DATE_END', searchDateEnd };
}
