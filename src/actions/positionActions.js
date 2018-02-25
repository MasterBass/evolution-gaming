import * as types from './actionTypes';

export function moveScrollLeft(position) {
    return { type: types.MOVE_SCROLL_LEFT, position };
}

export function moveScrollRight(position) {
    return { type: types.MOVE_SCROLL_RIGHT, position };
}
