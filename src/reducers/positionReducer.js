import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function positionReducer(state = initialState.position, action) {
    switch (action.type) {
        case types.MOVE_SCROLL_RIGHT:

            if (action.position.endPosition + 15 <= action.position.length) {
                return {
                    startPosition: action.position.startPosition,
                    endPosition: action.position.endPosition + 10
                }
            } else {
                if (action.position.length > 15) {
                    return {
                        startPosition: 0,
                        endPosition: action.position.length
                    }
                }
               return state;
            }

        case types.MOVE_SCROLL_LEFT:
            return {
                ...state,
                connected: false
            };

        default:
            return state;
    }
}