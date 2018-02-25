import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TableItem from './TableItem';
import * as positionActions from '../../actions/positionActions';
import './TableList.css';


class TableList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        this.refs.tables.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        this.refs.tables.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
        if (this.refs.tables.scrollWidth - this.refs.tables.scrollLeft < 900) {
            this.props.positionActions.moveScrollRight({
                startPosition: this.props.startPosition,
                endPosition: this.props.endPosition,
                length: this.props.length
            });

        }

        if (this.refs.tables.scrollLeft <= 0) {
            this.props.positionActions.moveScrollLeft({
                startPosition: this.props.startPosition,
                endPosition: this.props.endPosition,
                length: this.props.length
            });
        }
    };

    render() {
        const {tables, deleteTable, startPosition, endPosition } = this.props;
        return (
            <div className='table-list' ref='tables'>
                {tables.filter(table =>
                    !table.isDeleted).slice(startPosition, endPosition).map(table =>
                    <TableItem key={table.id} table={table} deleteTable={deleteTable}/>
                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        positionActions: bindActionCreators(positionActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(TableList);
