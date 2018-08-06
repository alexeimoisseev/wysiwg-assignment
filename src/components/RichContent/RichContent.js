import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    CompositeDecorator,
    ContentState,
    convertFromHTML,
    convertFromRaw,
    Editor,
    EditorState,
    getVisibleSelectionRect,
    RichUtils,
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import './RichContent.css';
import Comment from '../InlineComment/InlineComment';
import CommentForm from '../CommentForm/CommentForm';
import saveEditorState from '../../actions/saveEditorState';
import { html } from '../../consts/html';

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

const decorator = new CompositeDecorator([
    {
        strategy: findCommentEntities,
        component: Comment,
    },
]);

function loadSavedDocument() {
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

class RichContent extends Component {
    constructor() {
        super();

        this.state = {
            editorState: EditorState.createEmpty(decorator),
            formPosition: {
                left: -9000,
                top: -9000,
            },
        };
    }



    onChange = (editorState) => {
        const {comments} = this.props;
        this.showEditPopup(editorState);
        this.setState({ editorState });
    }

    showEditPopup(editorState) {
        const selection = editorState.getSelection();
        const selectionSize = selection.getEndOffset() - selection.getStartOffset();
        if (selectionSize) {
            const rect = getVisibleSelectionRect(window);
            if (rect) {
                this.setState({
                    formPosition: {
                        left: rect.left,
                        top: rect.top + window.pageYOffset,
                    },
                });
            }

        } else {
            this.setState({
                formPosition: {
                    left: -9000,
                    top: -9000,
                },
            });
        }
    }

    createEntity = ({ text, id, color, created }) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'COMMENT',
            'MUTABLE',
            {
                value: text,
                id,
                color,
                created,
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const modifiedState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        const newEditorState = RichUtils.toggleLink(
            modifiedState,
            modifiedState.getSelection(),
            entityKey
        );
        this.setState({
            editorState: newEditorState,
        }, () => {
            saveEditorState(newEditorState);
        });
    }

    onCommentAdded = ({ text, id, color, created }) => {
        this.createEntity({ text, id, color });
        this.setState({
            formPosition: {
                left: -9000,
                top: -9000,
            },
        });
    }

    addComment = async (event) => {
        event.preventDefault();
    }

    componentDidMount() {
        this.setState({
            editorState: loadSavedDocument(),
        });
    }

    render() {
        const { editorState, formPosition } = this.state;
        return (
            <div className="RichContent">
                <div className="RichContent__editor">
                    <Editor
                        onChange={this.onChange}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                    />
                </div>
                <CommentForm
                    top={ formPosition.top }
                    left={ formPosition.left }
                    onCommentAdded={ this.onCommentAdded }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.comments,
    editorState: state.editorState,
});

export default connect(
    mapStateToProps,
)(RichContent);
