import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import * as socketActions from "./actions/socketActions";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ConnectedRouter} from 'react-router-redux';
import {history} from './store/configureStore';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(socketActions.connect('wss://js-assignment.evolutiongaming.com/ws_api'));

render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
