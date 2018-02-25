import * as socketActions from "../actions/socketActions";
import * as authActions from "../actions/authenticationActions";
import * as tableActions from "../actions/tableActions";
import * as types from '../actions/actionTypes';
import toastr from 'toastr';

const socketMiddleware = (function(){
    let socket = null;

    const onOpen = (ws,store,token) => evt => {
        store.dispatch(socketActions.connected());
    };

    const onClose = (ws,store) => evt => {
        store.dispatch(socketActions.disconnected());
    };

    const onMessage = (ws,store) => evt => {
        let msg = JSON.parse(evt.data);
        switch(msg.$type) {
            case "pong":
                toastr.info('Connected');
                break;
            case "login_failed":
                store.dispatch(authActions.loginError());
                break;
            case "login_successful":
                store.dispatch(authActions.loginSuccess(msg.user_type));
                break;
            case "table_list":
                store.dispatch(tableActions.loadTables(msg.tables));
                break;
            case "table_added":
                store.dispatch(tableActions.tableAdded({
                    after_id: msg.after_id,
                    table: msg.table
                }));
                break;
            case "table_removed":
                store.dispatch(tableActions.tableRemoved(msg.id));
                break;
            case "removal_failed":
                store.dispatch(tableActions.tableRemoveFailed(msg.id));
                toastr.error('Table #' + msg.id, 'Delete operation failed');
                break;
            case "table_updated":
                store.dispatch(tableActions.tableUpdated(msg.table));
                break;
            default:
                console.log("Received unknown message type: '" + msg.type + "'");
                break;
        }
    };

    return store => next => action => {
        switch(action.type) {
            case types.SOCKET_CONNECT:
                if(socket !== null) {
                    socket.close();
                }
                store.dispatch(socketActions.connecting());
                socket = new WebSocket(action.url);
                socket.onmessage = onMessage(socket,store);
                socket.onclose = onClose(socket,store);
                socket.onopen = onOpen(socket,store);
                //socket.onerror = onError(socket,store);
                break;

            case types.SOCKET_DISCONNECT:
                if(socket !== null) {
                    socket.close();
                }
                socket = null;
                store.dispatch(socketActions.disconnected());
                break;

            case types.SEND_SOCKET_PING:
                if(socket) {
                    socket.send(JSON.stringify({
                        "$type": "ping",
                        "seq": action
                    }));
                } else {
                    toastr.error("Connection error");
                }
                break;

            case types.SEND_SOCKET_LOGIN:
                socket.send(JSON.stringify({"$type": "login",
                    "username": action.auth.user,
                    "password": action.auth.password
                }));
                break;

            case types.TABLES_SUBSCRIBE:
                if(socket) {
                    socket.send(JSON.stringify({
                        "$type": "subscribe_tables"
                    }));
                } else {
                    toastr.error("Connection error");
                }
                break;

            case types.TABLE_REMOVE:
                if(socket) {
                    socket.send(JSON.stringify({
                        "$type": "remove_table",
                        "id": action.table.id
                    }));
                } else {
                    toastr.error("Connection error");
                }
                break;

            default:
                return next(action);
        }
    }

})();

export default socketMiddleware