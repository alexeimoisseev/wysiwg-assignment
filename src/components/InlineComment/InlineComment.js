import React, { Component } from 'react';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';

import './InlineComment.css';

class InlineComment extends Component {

    getColor = (color) => {
        return `rgba(${color}, 0.5)`;
    }

    componentDidUpdate(prevProps) {
        if (this.isSelected()) {
            this.scrollTo();
        }
    }

    isSelected = () => {
        const {
            contentState,
            selectedComment,
            entityKey,
        } = this.props;
        const { id } = contentState.getEntity(entityKey).getData();
        return selectedComment === id;
    }
    scrollTo = () => {
        scrollToComponent(this.element, {
            align: 'top',
            offset: -50,
            duration: 300,
        });
    }

    render() {
        const {
            children,
        } = this.props;
        const className = `InlineComment ${this.isSelected() ?
            'InlineComment_selected' : ''}`;
        return (
            <span
                ref={(el) => {this.element = el;}}
                className={className}
                >
                {children}
            </span>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedComment: state.selectedComment,
});

const mapDispatchToProps = (dispatch) => ({
    unselectComment: () => {
        dispatch({
            type: 'SELECT_COMMENT',
            id: null,
        });
    },
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InlineComment);
