import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RichContent from './components/RichContent/RichContent';
import CommentsList from './components/CommentsList/CommentsList';
import rootReducer from './reducers';

import { loadSavedDocument } from './actions/editorState';
import InlineComment from './components/InlineComment/InlineComment';
import './App.css';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const savedData = window.localStorage.getItem('comments');
const savedComments = savedData ? JSON.parse(savedData) : [];

store.dispatch({
    type: 'LOAD_COMMENTS',
    payload: savedComments,
});

store.dispatch({
    type: 'LOAD_EDITOR_STATE',
    payload: loadSavedDocument(InlineComment),
});

function reset() {
    window.localStorage.clear();
    window.location.reload();
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <RichContent />
                    <CommentsList />
                    <button onClick={reset}>Reset</button>
                </div>
            </Provider>
        );
    }
}

export default App;
