export const filterDateActions = {
  updateFilterDateStart, updateFilterDateEnd
};

function updateFilterDateStart(filterDateStart) {
  return { type: 'UPDATE_FILTER_DATE_START', filterDateStart };
}

function updateFilterDateEnd(filterDateEnd) {
  return { type: 'UPDATE_FILTER_DATE_END', filterDateEnd };
}
