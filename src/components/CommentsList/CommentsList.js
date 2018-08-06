import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CommentsList.css';

class CommentsList extends Component {
    getColor = (comment) => {
        const { id, color } = comment;
        const { selectedComment } = this.props;
        return id === selectedComment ?
            `rgba(${color}, 0.7)` :
            `rgba(${color}, 0.3)`;
    }

    renderComments = () => {
        const {
            comments,
        } = this.props;
        return comments.map(comment =>
            <div className="CommentsList__comment"
                style={{ backgroundColor: this.getColor(comment) }}
                key={comment.id}>
                {comment.text}
            </div>
        );
    }
    render() {
        return (
            <div className="CommentsList">
                {this.renderComments()}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    comments: state.comments,
    selectedComment: state.selectedComment,
});

export default connect(mapStateToProps)(CommentsList);
