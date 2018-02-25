import * as types from './actionTypes';

export function loadTables(tables) {
    return { type: types.TABLES_LOAD, tables };
}

export function tableAdded(table) {
    return { type: types.TABLE_ADDED, table };
}

export function tableRemove(table) {
    return { type: types.TABLE_REMOVE, table };
}

export function tableHide(table) {
    return { type: types.TABLE_HIDE, table };
}

export function tableRemoveFailed(id) {
    return { type: types.TABLE_REMOVE_FAILED, id };
}

export function tableRemoved(id) {
    return { type: types.TABLE_REMOVED, id };
}

export function tableUpdated(table) {
    return { type: types.TABLE_UPDATED, table };
}

export function tablesSubscribe() {
    return { type: types.TABLES_SUBSCRIBE };
}

export function deleteTable(id) {
    return function (dispatch, getState) {
        let table = Object.assign({},
            getState().tables.filter(table => table.id.toString() === id)[0]);
        dispatch(tableHide(table));
        return dispatch(tableRemove(table));

    };
}