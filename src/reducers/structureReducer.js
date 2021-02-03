export default function structure(state = null, action) {
    switch (action.type) {
    case 'GETALL_REQUEST':
        return {
        loading: true
        };
    case 'GETALL_SUCCESS':
        return  {
            details: action.structure
        };
    case 'GETALL_FAILURE':
        return {
        error: action.error
        };
    default:
        return state
    }
}
