import {combineReducers} from 'redux';
import authentication from './authenticationReducer';
import socket from './socketReducer';
import tables from './tableReducer';
import position from './positionReducer';
import {routerReducer} from 'react-router-redux';


const rootReducer = combineReducers({
    router: routerReducer,
    socket,
    tables,
    position,
    authentication
});

export default rootReducer;