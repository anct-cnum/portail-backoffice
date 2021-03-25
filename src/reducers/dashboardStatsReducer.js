const initialState = {
  stats: {
    'structuresCount': 0,
    'conseillersCount': 0,
    'conseillersRecrutesCount': 0,
  }
};

export default function dashboardStats(state = initialState, action) {
  switch (action.type) {
    case 'GET_DASHBOARD_STATS_REQUEST':
      return {
        loading: true
      };
    case 'GET_DASHBOARD_STATS_SUCCESS':
      return {
        ...state,
        stats: action.stats
      };
    case 'GET_DASHBOARD_STATS_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
