export default function selectComment(dispatch) {
    return (id) => {
        dispatch({
            type: 'SELECT_COMMENT',
            id,
        });
    };
}
