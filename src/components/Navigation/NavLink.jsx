import React, { useState } from 'react';
import { SunActive, SunInactive, MoonActive, MoonInactive } from '../../assets/svgs/index'
const NavLink = ({ activeIcon, inactiveIcon, linkName }) => {
    const [isActive, setIsActive] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleDarkMode = () => {
        setIsActive(!isActive)
        setIsDarkMode(!isDarkMode);
    };

    return (
        <a href='#' className={`w-full flex justify-start items-center gap-2 py-4 px-4  rounded-lg outline-none hover:shadow-lg border border-transparent hover:border-secondary-100 ${isActive ? 'bg-netural-500 text-white' : ''}`} onClick={() => handleDarkMode()} onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)}>
            {isActive ? <img src={activeIcon} alt="" className='h-7' /> : <img src={inactiveIcon} alt="" className='h-7' />}
            <span className={` text-md ${isActive ? 'text-white text-nowrap' : ''}`}>{linkName}</span>
            {linkName === 'Dark Mode' ? <div className='w-16 h-8 relative bg-secondary-100 py-0.5 px-0.5 rounded-full -ml-1'>
                <div className={`w-7 h-7 rounded-full bg-netural-500 transition-all transform duration-200 absolute top-1/2 left-0.5 ${isDarkMode ? 'translate-x-8' :  'translate-x-0' } transform -translate-y-1/2`}></div>
                <div className='absolute top-1/2 left-0.5 transform -translate-y-1/2 flex items-center justify-center w-full h-full'>
                    <img src={isDarkMode ? SunInactive : SunActive} alt="Sun Icon" className='h-4 absolute left-1.5' />
                    <img src={isDarkMode ? MoonActive : MoonInactive} alt="Moon Icon" className='h-4 absolute right-2.5' />
                </div>
            </div> : null}
        </a>
    );
};

export default NavLink;