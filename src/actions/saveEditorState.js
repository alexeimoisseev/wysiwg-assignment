import { convertToRaw } from 'draft-js';

export default function saveEditorState(editorState) {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    window.localStorage.setItem('document', JSON.stringify(raw));
}
