import React, { Component } from 'react';
import { connect } from 'react-redux';
import addComment from '../../actions/addComment';
import './CommentForm.css';

class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            commentValue: '',
        };
    }

    onValueChange = (e) => {
        this.setState({
            commentValue: e.target.value,
        });
    }

    clickAddComment = async () => {
        const { addComment, onCommentAdded } = this.props;
        const { commentValue } = this.state;
        const newComment = await addComment(commentValue);
        this.setState({
            commentValue: '',
        });
        onCommentAdded(newComment);
    }

    componentDidUpdate(prevProps) {
        const { shown } = this.props;
        if (shown && shown !== prevProps.shown) {
            this.textarea.focus();
        }
    }

    render() {
        const {
            left,
            top,
            shown,
        } = this.props;
        const className = `CommentForm ${shown ? 'CommentForm_shown' : ''}`;
        const _left = Math.min(left, window.innerWidth - 350);
        return (
            <div className={className} style={{
                left: _left,
                top: top,
            }} >
                <textarea
                    ref={(el) => {this.textarea = el;}}
                    value={ this.state.commentValue }
                    onChange={ this.onValueChange } />
                <button
                    onClick={ this.clickAddComment }
                    disabled={ !this.state.commentValue }
                >Post comment</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    addComment: addComment(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentForm);
