import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Comment.css';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            hovered: false,
        };
    }

    getColor = (color) => {
        const { hovered } = this.state;
        return hovered ?
            `rgba(${color}, 0.8)` :
            `rgba(${color}, 0.5)`;
    }

    render() {
        const {
            children,
            contentState,
            entityKey,
            selectComment,
        } = this.props;
        const {
            id,
            value,
            color,
        } = contentState.getEntity(entityKey).getData();

        return (
            <span
                className="Comment"
                style={{ backgroundColor: this.getColor(color) }}
                onClick={() => { selectComment(id); }}
                onMouseOver={() => {
                    this.setState({
                        hovered: true,
                    });
                }}
                onMouseOut={() => {
                    this.setState({
                        hovered: false,
                    });
                }}>
                {children}
            </span>
        );
    }
}

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    selectComment: (id) => {
        dispatch({
            type: 'SELECT_COMMENT',
            id,
        });
    },
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);
