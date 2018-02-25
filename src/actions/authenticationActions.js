import * as types from './actionTypes';

export function loginSuccess(role) {
    return { type: types.USER_AUTHENTICATION_SUCCESS, role };
}

export function loginError() {
    return { type: types.USER_AUTHENTICATION_ERROR };
}

export function logOut() {
    return { type: types.LOG_OUT };
}