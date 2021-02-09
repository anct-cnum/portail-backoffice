export default function conseiller(state = null, action) {
    switch (action.type) {
    case 'GET_REQUEST':
        return {
        loading: true
        };
    case 'GET_SUCCESS':
        return  {
            ...state,
            details: action.conseiller
        };
    case 'GET_FAILURE':
        return {
        error: action.error
        };
    default:
        return state
    }
}
