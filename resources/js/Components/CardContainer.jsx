import React from 'react';

const CardContainer = ({ children, className = '' }) => {
    return (
        <div className={`overflow-x-auto mx-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 ${className} m-auto`}>{children}</div>

    );
}

export default CardContainer;
