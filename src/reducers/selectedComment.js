export default function selectedComment(state = null, action) {
    switch(action.type) {
    case('SELECT_COMMENT'):
        return action.id;
    case 'ADD_COMMENT':
        return null;
    default:
        return state;
    }
}
