function saveComment(text) {
    const savedComments = window.localStorage.getItem('comments');
    const comments = savedComments ? JSON.parse( savedComments) : [];
    const id = comments.length;
    const comment = {
        text,
        id,
        created: (new Date()).getTime()
    };
    comments.push(comment);
    window.localStorage.setItem('comments', JSON.stringify(comments));
    return comment;
}

export default function addComment(dispatch) {
    return (text) => {
        const comment = saveComment(text);
        dispatch({
            type: 'ADD_COMMENT',
            payload: comment,

        });
        return comment;
    };
}
