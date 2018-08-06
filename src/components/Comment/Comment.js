import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            hovered: false,
        };
    }

    getColor(color) {
        return `rgba(${color}, 0.7)`;
    }

    render() {
        const {
            children,
            contentState,
            entityKey,
        } = this.props;
        const {
            value,
            color,
        } = contentState.getEntity(entityKey).getData();

        return (
            <span
                className="Comment"
                style={{ backgroundColor: this.getColor(color) }}
                onClick={() => {alert(value);}}
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

export default Comment;
