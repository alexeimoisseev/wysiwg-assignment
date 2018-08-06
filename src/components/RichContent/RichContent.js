import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Editor,
    EditorState,
    getVisibleSelectionRect,
    RichUtils,
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import './RichContent.css';
import CommentForm from '../CommentForm/CommentForm';
import { changeEditorState } from '../../actions/editorState';
import saveEditorState from '../../actions/saveEditorState';

class RichContent extends Component {
    constructor() {
        super();

        this.state = {
            dirty: false,
            formPosition: {
                left: -9000,
                top: -9000,
            },
            formShown: false,
        };
    }

    onChange = (editorState) => {
        const {
            changeEditorState,
        } = this.props;
        this.showEditPopup(editorState);
        this.setState({
            dirty: true,
        });
        changeEditorState(editorState);
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
                    formShown: true,
                });
            }

        } else {
            this.setState({
                formShown: false,
                formPosition: {
                    left: -9000,
                    right: -9000,
                },
            });
        }
    }

    createEntity = ({ text, id, created }) => {
        const {
            changeEditorState,
            editorState,
        } = this.props;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'COMMENT',
            'MUTABLE',
            {
                value: text,
                id,
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
        changeEditorState(newEditorState);
    }

    onCommentAdded = ({ text, id, created }) => {
        this.createEntity({ text, id });
        this.setState({
            formShown: false,
            formPosition: {
                left: -9000,
                right: -9000,
            },
        });
    }

    addComment = async (event) => {
        event.preventDefault();
    }

    save = () => {
        const {editorState} = this.props;
        saveEditorState(editorState);
        this.setState({
            dirty: false,
        });
    }

    render() {
        const { dirty, formPosition, formShown } = this.state;
        const { editorState } = this.props;
        return (
            <div className="RichContent">
                <div className="RichContent__editor">
                    <Editor
                        onChange={this.onChange}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                    />
                </div>
                <button
                    className="RichContent__save"
                    disabled={!dirty}
                    onClick={this.save}
                    >
                    Save
                </button>
                <CommentForm
                    shown={formShown}
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

const mapDispatchToProps = (dispatch) => ({
    changeEditorState: changeEditorState(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RichContent);
