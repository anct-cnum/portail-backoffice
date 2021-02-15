export default function stats(state = null, action) {
    switch (action.type) {
    case 'GET_MISES_EN_RELATION_STATS_REQUEST':
        return {
        loading: true
        };
    case 'GET_MISES_EN_RELATION_STATS_SUCCESS':
        return  {
            ...state,
            stats: action.stats
        };
    case 'GET_MISES_EN_RELATION_STATS_FAILURE':
        return {
        error: action.error
        };
    default:
        return state
    }
}
