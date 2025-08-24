import React from 'react';

const CardContainer = ({ children, className = '' }) => {
    return (
        <div className={`overflow-x-auto mx-10 bg-white shadow-lg rounded-lg p-5 ${className}`}>{children}</div>

    );
}

export default CardContainer;
