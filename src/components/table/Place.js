import React from 'react';
import './Place.css';

const Place = ({empty}) => {
    if (empty === 'true')
        return  (<div className='place'/>);
    else
        return (<div className='place person'/>);
};
export default Place;