import { combineReducers } from 'redux';
import comments from './comments';
import selectedComment from './selectedComment';
import editorState from './editorState';

export default combineReducers({
    comments,
    editorState,
    selectedComment,
});
