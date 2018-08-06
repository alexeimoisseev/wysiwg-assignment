import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/addComment';
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
        const { addComment } = this.props;
        const { commentValue } = this.state;
        const newComment = await addComment(commentValue);
        this.setState({
            commentValue: '',
        });
        console.log(newComment); //eslint-disable-line
    }

    render() {
        const {
            left,
            top,
        } = this.props;
        return (
            <div className="CommentForm" style={{
                left: left,
                top: top,
            }} >
                <textarea value={ this.state.commentValue } onChange={ this.onValueChange } />
                <button
                    onClick={ this.clickAddComment }
                    disabled={ !this.state.commentValue }
                >Add comment</button>
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
