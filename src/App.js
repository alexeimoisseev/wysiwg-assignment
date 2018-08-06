import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RichContent from './components/RichContent/RichContent';
import CommentsList from './components/CommentsList/CommentsList';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <RichContent />
                    <CommentsList />
                </div>
            </Provider>
        );
    }
}

export default App;
