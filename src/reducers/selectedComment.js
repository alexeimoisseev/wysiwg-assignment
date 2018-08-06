export default function selectedComment(state = null, action) {
    switch(action.type) {
    case('SELECT_COMMENT'):
        return action.id;
    default:
        return state;
    }
}
