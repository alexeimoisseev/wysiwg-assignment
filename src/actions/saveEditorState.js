import { convertToRaw } from 'draft-js';
import debounce from 'lodash/debounce';

const saveEditorState = debounce((editorState) => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    window.localStorage.setItem('document', JSON.stringify(raw));
}, 1000, { leading: true, trailing: true });

export default saveEditorState;
