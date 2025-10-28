import React from 'react';

const Title = ({ title, className }) => {
    return (
        <a href='/' className={`font-bold ${className} text-blue-500 uppercase`}>{title}</a>
    );
};

export default Title;