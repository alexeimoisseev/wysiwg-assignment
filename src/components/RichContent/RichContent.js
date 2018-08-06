import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    CompositeDecorator,
    ContentState,
    convertFromHTML,
    Editor,
    EditorState,
    getVisibleSelectionRect,
    RichUtils,
} from 'draft-js';

import 'draft-js/dist/Draft.css';
import './RichContent.css';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';
import { html } from '../../consts/html';

class RichContent extends Component {
    constructor() {
        super();

        this.decorator = new CompositeDecorator([
            {
                strategy: this.findCommentEntities,
                component: Comment,
            },
        ]);
        this.state = {
            editorState: EditorState.createEmpty(this.decorator),
            formPosition: {
                left: -9000,
                top: -9000,
            },
        };
    }

    findCommentEntities = (contentBlock, callback, contentState) => {
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

    onChange = (editorState) => {
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
                        top: rect.top + window.pageYOffset - 50,
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

    createEntity = ({ text, id, color }) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'COMMENT',
            'MUTABLE',
            {
                value: text,
                id,
                color,
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const modifiedState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        this.setState({
            editorState: RichUtils.toggleLink(
                modifiedState,
                modifiedState.getSelection(),
                entityKey
            ),
        });
    }

    addComment = async (event) => {
        event.preventDefault();
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    componentDidMount() {
        const content = convertFromHTML(html);
        const contentState = ContentState.createFromBlockArray(
            content.contentBlocks,
            content.entityMap
        );
        this.setState({
            editorState: EditorState.createWithContent(contentState, this.decorator),
        });
    }

    render() {
        const { editorState, formPosition } = this.state;

        return (
            <div className="RichContent">
                <button onClick={this.addComment}>Add comment</button>
                <Editor
                    onChange={this.onChange}
                    editorState={editorState}
                    handleKeyCommand={this.handleKeyCommand}
                />
                <CommentForm
                    top={ formPosition.top }
                    left={ formPosition.left }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.comments,
});


export default connect(
    mapStateToProps
)(RichContent);
