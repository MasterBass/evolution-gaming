import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authenticationReducer(state = initialState.authentication, action) {
    switch (action.type) {
        case types.USER_AUTHENTICATION_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                role: action.role
            };

        case types.USER_AUTHENTICATION_ERROR:
            return {
                ...state,
                loggedIn: false
            };

        case types.SOCKET_DISCONNECTED:
            return {
                ...state,
                loggedIn: false,
                role: ''
            };

        case types.LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                role: ''
            };


        default:
            return state;
    }
}