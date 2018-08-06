import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            hovered: false
        };
    }
    static colors = [
        '43, 219, 192',
        '255, 196, 35',
        '104, 112, 117',
        '252, 107, 63',
    ]
    getColor = (id) => {
        const {hovered} = this.state;
        const colorId = id % Comment.colors.length;
        const color = Comment.colors[colorId];
        console.log(id, color)
        return hovered ?
            `rgba(${color}, 0.7)` :
            `rgba(${color}, 0.3)`;
    }
    render() {
        const {
            children,
            contentState,
            entityKey
        } = this.props;
        const {value, id} = contentState.getEntity(entityKey).getData();

        return (
            <span
                className="Comment"
                style={{backgroundColor: this.getColor(id)}}
                onClick={() => {alert(value)}}
                onMouseOver={() => {
                    this.setState({
                        hovered: true
                    })
                }}
                onMouseOut={() => {
                    this.setState({
                        hovered: false
                    })
                }}>
                {children}
            </span>
        );
    }
}

export default Comment;
