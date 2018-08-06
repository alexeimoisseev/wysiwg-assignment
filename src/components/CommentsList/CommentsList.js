import React, { Component } from 'react';
import { connect } from 'react-redux'
import './CommentsList.css';

class CommentsList extends Component {
    getColor = (comment) => {
        const { color } = comment;
        return `rgba(${color}, 0.7)`;
    }

    renderComments = () => {
        const { comments } = this.props;
        return comments.map(comment =>
            <div className="CommentsList__comment"
                style={{backgroundColor: this.getColor(comment)}}
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
    comments: state.comments
});

export default connect(mapStateToProps)(CommentsList);
