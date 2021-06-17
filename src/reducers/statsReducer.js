const initialState = {
  stats: {
    'nouvelle': 0,
    'interessee': 0,
    'nonInteressee': 0,
    'recrutee': 0,
    'finalisee': 0,
    'toutes': 0,
  }
};

export default function stats(state = initialState, action) {
  switch (action.type) {
    case 'GET_MISES_EN_RELATION_STATS_REQUEST':
      return {
        loading: true
      };
    case 'GET_MISES_EN_RELATION_STATS_SUCCESS':
      return {
        ...state,
        stats: action.stats
      };
    case 'GET_MISES_EN_RELATION_STATS_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
