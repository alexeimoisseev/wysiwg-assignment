export default function comments(state = [], action) {
    switch (action.type) {
    case 'ADD_COMMENT':
        return [
            ...state,
            action.payload,
        ];
    default:
        return state;
    }
}
