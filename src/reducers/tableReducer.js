import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tableReducer(state = initialState.tables, action) {
    switch (action.type) {
        case types.TABLES_LOAD:
            return Object.keys(action.tables).map((el) => {
               return {
                   id: action.tables[el].id,
                   name: action.tables[el].name,
                   participants: action.tables[el].participants,
                   isDeleted: false
               };
            });

        case types.TABLE_ADDED:
            return [
                ...state.filter(table => table.id <= action.table.after_id),
                Object.assign({}, action.table.table),
                ...state.filter(table => table.id > action.table.after_id)
            ];

        case types.TABLE_UPDATED:
            return [
                ...state.filter(table => table.id < action.table.after_id),
                Object.assign({}, action.table.table),
                ...state.filter(table => table.id > action.table.after_id)
            ];

        case types.TABLE_REMOVE_FAILED:
            let table = Object.assign({}, state.filter(table => table.id === action.id)[0]);
            return [
                ...state.filter(table => table.id < action.id),
                Object.assign({}, {
                    id: table.id,
                    name: table.name,
                    participants: table.participants,
                    isDeleted: false
                }),
                ...state.filter(table => table.id > action.id)
            ];

        case types.TABLE_HIDE:
            return [
                ...state.filter(table => table.id < action.table.id),
                Object.assign({}, {
                    id: action.table.id,
                    name: action.table.name,
                    participants: action.table.participants,
                    isDeleted: true
                }),
                ...state.filter(table => table.id > action.table.id)
            ];

        case types.TABLE_REMOVED:
            return [
                ...state.filter(table => table.id !== action.id)
            ];

        default:
            return state;
    }
}