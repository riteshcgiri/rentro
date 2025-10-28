import React from 'react';
import { homeActive, homeInactive } from '../assets/svgs';

const HeaderMenu = ({logo, logoalt, bubble, border, className, toggleMenu, menuName, isActive, isVisible}) => {
    return (
        <div className={`relative w-11 h-11 cursor-pointer group select-none rounded-full ${isActive ? 'bg-netural-500' : ''} ${isVisible ? '' : 'hidden'} overflow-hidden`} onClick={() => toggleMenu(menuName)}>
           {bubble ? <span className='w-2 h-2 bg-red-500 z-10 inline-block absolute rounded-full left-[60%] top-[15%]  '></span> : ''}
            <div className={`grid place-items-center rounded-full w-11 h-11 overflow-hidden ${isActive ? 'border-netural-500' : ''} ${border ? 'border border-gray-300' : ''}`}>
                <img src={menuName === 'home' ? (isActive ? homeActive : logo) : logo} alt={logoalt} className={` transition-transform duration-75 group-hover:scale-110 flex justify-between items-center ${className}`}/>
            </div>
            <span className='hidden'>{menuName}</span>
        </div>
    );
};

export default HeaderMenu;