import { dashboardStatsService } from '../services/dashboardStats.service.js';

export const dashboardStatsActions = {
  getDashboardStats,
};

function getDashboardStats() {
  return dispatch => {
    dispatch(request());

    dashboardStatsService.getStats()
    .then(
      stats => {
        dispatch(success(stats));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: 'GET_DASHBOARD_STATS_REQUEST' };
  }
  function success(stats) {
    return { type: 'GET_DASHBOARD_STATS_SUCCESS', stats };
  }
  function failure(error) {
    return { type: 'GET_DASHBOARD_STATS_FAILURE', error };
  }
}
