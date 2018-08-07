import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CommentsList.css';
import selectComment from '../../actions/selectComment';

class CommentsList extends Component {
    renderComments = () => {
        const {
            comments,
            selectComment,
            selectedComment,
        } = this.props;
        return comments.map(comment =>{
            const className = `CommentsList__comment ${comment.id === selectedComment ? 'CommentsList__comment_selected' : ''}`;
            return (
                <div className={className}
                    key={comment.id}
                    onClick={() => {selectComment(comment.id);}}>
                    <div className="CommentsList__commentDate">
                        Created: {new Date(comment.created).toString()}
                    </div>
                    <div className="CommentsList__commentText">
                        {comment.text}
                    </div>

                </div>

            );
        });
    }

    render() {
        const { comments } = this.props;
        return (
            <div className="CommentsList">
                <div className="CommentsList__header">
                    {comments.length ? 'Comments:' : 'No comments yet'}
                </div>
                <div className="CommentsList__list">
                    {this.renderComments()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    comments: state.comments,
    selectedComment: state.selectedComment,
});

const mapDispatchToProps = (dispatch) => ({
    selectComment: selectComment(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CommentsList);
