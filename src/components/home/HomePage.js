import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as socketActions from '../../actions/socketActions';
import * as tableActions from '../../actions/tableActions';
import TableList from '../table/TableList';
import './HomePage.css';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.testConnection = this.testConnection.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
    }

    componentWillMount() {
        this.props.tableActions.tablesSubscribe();
    }

    testConnection() {
        this.props.socketActions.sendSocketPing(200);
    }

    deleteTable(event) {
        event.preventDefault();
        this.props.tableActions.deleteTable(event.target.id);
    }

    render() {
        const tables = this.props.tables;
        return (
            <div>
                <h2>Table count: {tables.length}</h2>
                <TableList tables={tables} deleteTable={this.deleteTable}
                           startPosition={this.props.position.startPosition}
                           endPosition={this.props.position.endPosition}
                           length={tables.length}/>
                <button onClick={this.testConnection}>Test Connection</button>
            </div>
        );
    };
}

function mapStateToProps(state, ownProps) {
    return {
        authentication: state.authentication,
        tables: state.tables,
        position: state.position
    };
}

function mapDispatchToProps(dispatch) {
    return {
        socketActions: bindActionCreators(socketActions, dispatch),
        tableActions: bindActionCreators(tableActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);