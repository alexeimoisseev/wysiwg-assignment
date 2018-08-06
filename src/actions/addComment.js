let nextId = 0;
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

// In real life this would be an asyncronous call
// with making saving request to some backend.
// With localStorage it is syncronous.
// So let's add a fake promise to show that it's possible to make it async.
async function saveComment(comment) {
    return new Promise(resolve => {
        const savedComments = window.localStorage.getItem('comments');
        const comments = savedComments ? JSON.parse( savedComments) : [];
        comments.push(comment);
        window.localStorage.setItem('comments', JSON.stringify(comments));
        setTimeout(() => {
            resolve(comment);
        }, 200);
    });
}

export function addComment(dispatch) {
    return async (text) => {
        const comment = {
            text: text,
            id: ++nextId,
            color: getColor(nextId),
        };
        await saveComment(comment);
        dispatch({
            type: 'ADD_COMMENT',
            payload: comment,

        });
        return comment;
    };
}
