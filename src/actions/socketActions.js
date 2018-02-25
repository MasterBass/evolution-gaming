import * as types from './actionTypes';

export function connect(url) {
    return { type: types.SOCKET_CONNECT, url };
}

export function connecting() {
    return { type: types.SOCKET_CONNECTING };
}

export function connected() {
    return { type: types.SOCKET_CONNECTED };
}

export function disconnect() {
    return {type: types.SOCKET_DISCONNECT};
}

export function disconnected() {
    return {type: types.SOCKET_DISCONNECTED};
}

export function sendSocketPing(seq) {
    return {type: types.SEND_SOCKET_PING, seq };
}

export function receivedSocketPong(seq) {
    return {type: types.RECEIVE_SOCKET_PONG, seq};
}

export function sendSocketLogin(auth) {
    return {type: types.SEND_SOCKET_LOGIN, auth};
}

export function sendSocketSubscribeTables() {
    return {type: types.TABLES_SUBSCRIBE};
}

