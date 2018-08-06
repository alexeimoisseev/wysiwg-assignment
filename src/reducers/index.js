import { combineReducers } from 'redux';
import comments from './comments';
import selectedComment from './selectedComment';

export default combineReducers({
    comments,
    selectedComment,
});
