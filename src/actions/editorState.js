import {
    CompositeDecorator,
    ContentState,
    convertFromHTML,
    convertFromRaw,
    EditorState
} from 'draft-js';

import { html } from '../consts/html';
import saveEditorState from './saveEditorState';

function findCommentEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'COMMENT'
            );
        },
        callback
    );
}

export function loadSavedDocument(InlineComment) {
    const decorator = new CompositeDecorator([
        {
            strategy: findCommentEntities,
            component: InlineComment,
        },
    ]);
    const savedDocument = window.localStorage.getItem('document');
    let savedContentState;
    if (savedDocument) {
        savedContentState = convertFromRaw(JSON.parse(savedDocument));
    } else {
        const blocks = convertFromHTML(html);
        savedContentState = ContentState.createFromBlockArray(
            blocks.contentBlocks,
            blocks.entityMap
        );
    }
    return EditorState.createWithContent(savedContentState, decorator);
}

export function changeEditorState(dispatch) {
    return (editorState) => {
        dispatch({
            type: 'CHANGE_EDITOR_STATE',
            payload: editorState,
        });
        saveEditorState(editorState);
    };
}

