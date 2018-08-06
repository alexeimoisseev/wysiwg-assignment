const COLORS = [
    '43, 219, 192',
    '255, 196, 35',
    '252, 107, 63',
];

function getColor(id) {
    const colorId = id % COLORS.length;
    const color = COLORS[colorId];
    return color;
}

function saveComment(text) {
    const savedComments = window.localStorage.getItem('comments');
    const comments = savedComments ? JSON.parse( savedComments) : [];
    const id = comments.length;
    const comment = {
        text,
        id,
        color: getColor(id),
        created: (new Date()).getTime()
    };
    comments.push(comment);
    window.localStorage.setItem('comments', JSON.stringify(comments));
    return comment;
}

export function addComment(dispatch) {
    return (text) => {
        const comment = saveComment(text);
        dispatch({
            type: 'ADD_COMMENT',
            payload: comment,

        });
        return comment;
    };
}
