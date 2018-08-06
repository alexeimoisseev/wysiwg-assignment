import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
    CompositeDecorator,
    ContentState,
    convertFromHTML,
    Editor,
    EditorState,
    Modifier,
    RichUtils,
} from 'draft-js';

import 'draft-js/dist/Draft.css'
import './RichContent.css';
import Comment from '../Comment/Comment.js'
import { addComment } from '../../actions/addComment';
import { html } from '../../consts/html';


class RichContent extends Component {
    constructor() {
        super();

        this.decorator = new CompositeDecorator([
            {
                strategy: this.findCommentEntities,
                component: Comment,
            },
        ])
        this.state = {
            editorState: EditorState.createEmpty(this.decorator),
        }
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
        this.setState({ editorState });
    }

    createEntity = (text) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const id = Math.abs(Math.floor(Math.random() * 1000))
        const contentStateWithEntity = contentState.createEntity(
            'COMMENT',
            'MUTABLE',
            {
                value: text,
                id
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const modifiedState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity
        });
        this.setState({
            editorState: RichUtils.toggleLink(
                modifiedState,
                modifiedState.getSelection(),
                entityKey
            )
        });
    }

    addComment = (event) => {
        event.preventDefault();
        const { addComment } = this.props;
        const comment = 'aa redux';
        addComment(comment);
        this.createEntity(comment);
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
            editorState: EditorState.createWithContent(contentState, this.decorator)
        })
    }

    render() {
        const { editorState } = this.state;
        return (
            <div className="RichContent">
                <button onClick={this.addComment}>Add comment</button>
                <Editor
                    onChange={this.onChange}
                    editorState={editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.comments
});

const mapDispatchToProps = (dispatch) => ({
    addComment: (text) => dispatch(addComment(text))
})



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RichContent);
