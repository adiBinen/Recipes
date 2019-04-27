import React from 'react';
import './Filter.scss';

export default ({ onFilter }) => {

    const onChange = (ev) => {
        onFilter(ev.target.value);
    }

    return (
        <section className="filter-container">
            <h1 className="filter-title">What would you like to make?</h1>
            <input className="input-filter" type="search" placeholder="Search..." onChange={onChange}/>
        </section>
    )
}