export default function structure(state = null, action) {
    switch (action.type) {
    case 'GET_REQUEST':
        return {
        loading: true
        };
    case 'GET_SUCCESS':
        return  action.structure;
        ;
    case 'GET_FAILURE':
        return {
        error: action.error
        };
    default:
        return state
    }
}
