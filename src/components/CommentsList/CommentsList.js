import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CommentsList.css';

class CommentsList extends Component {
    getColor = (comment) => {
        const { id, color } = comment;
        const { selectedComment } = this.props;
        return id === selectedComment ?
            `rgba(${color}, 0.8)` :
            `rgba(${color}, 0.5)`;
    }


    isSelected = () => {}

    renderComments = () => {
        const {
            comments,
            selectComment,
            selectedComment,
        } = this.props;
        return comments.map(comment =>{
            const className = `CommentsList__comment ${comment.id === selectedComment ? 'CommentsList__comment_selected' : ''}`
            return (
                <div className={className}
                    key={comment.id}
                    onClick={() => {selectComment(comment.id)}}>
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
        return (
            <div className="CommentsList">
                <div className="CommentsList__header">
                    Comments:
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
    selectComment: (id) => {
        console.log('CLICKED!', id);
        dispatch({
            type: 'SELECT_COMMENT',
            id,
        });
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CommentsList);
