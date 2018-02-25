import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function socketReducer(state = initialState.socket, action) {
    switch (action.type) {
        case types.RECEIVE_SOCKET_PONG:
            return state;

        case types.SEND_SOCKET_PING:
            return state;

        case types.SOCKET_CONNECTED:
            return {
                ...state,
                connected: true
            };

        case types.SOCKET_DISCONNECTED:
            return {
                ...state,
                connected: false
            };

        default:
            return state;
    }
}