import React from 'react';
import Place from './Place';
import './TableItem.css';

const TableItem = ({table, deleteTable}) => {
    let index = 0;
    return (
        <div className='table'>
            <div className='table-name'>
                {table.name}
            </div>
            <div className='table-places'>
                {[...new Array(12)].map(() => {
                        index++;
                        if (index <= table.participants) {
                            return <Place key={index} empty='false'/>
                        } else {
                            return <Place key={index} empty='true'/>
                        }
                    }
                )}
            </div>
            <div className='delete-btn'>
                <button onClick={deleteTable} id={table.id}>Delete</button>
            </div>
        </div>

)};

export default TableItem;