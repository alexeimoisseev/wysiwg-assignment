export default function editorState(state = {}, action) {
    switch(action.type){
    case 'CHANGE_EDITOR_STATE':
        return action.payload;
    case 'LOAD_EDITOR_STATE':
        return action.payload;
    default:
        return state;
    }
}
