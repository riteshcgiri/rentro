import React from 'react';

const FooterNav = ({navTitle, navLink}) => {
    return (
        <div className='flex-1 flex flex-col gap-3 leading-tighter'>
        <h2 className='font-medium text-sm mb-3'>{navTitle}</h2>
        {
          navLink.map((text, index) => (
            <a key={index} href={`/${text.toLowerCase().replace(/\s/g, "-")}`} className="text-xs w-fit text-secondary-400 hover:text-secondary-600">{text}</a>
          ))
        }
        
    </div>
    );
};

export default FooterNav;