let nextId = 0;
const COLORS = [
    '43, 219, 192',
    '255, 196, 35',
    '104, 112, 117',
    '252, 107, 63',
];
function getColor(id) {
    const colorId = id % COLORS.length;
    const color = COLORS[colorId];
    return color;
}

export const addComment = (text) => ({
    type: 'ADD_COMMENT',
    payload: {
        text: text,
        id: ++nextId,
        color: getColor(nextId)
    }
})
