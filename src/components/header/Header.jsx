import React from 'react';
import './header.css';
import Title from '../Title';
import HeaderMenu from '../HeaderMenu';
import { Gear, Heart, Notification, SearchIcon, Home, FilterHover, Login } from '../../assets/svgs/index';
import { user1 } from '../../assets/users/index'
import Search from '../Search';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHomePageVisibility } from '../../redux/slices/searchFilterSlice';
import { selectLoggedIn, selectUser, logout } from '../../redux/slices/authSlice';



const Header = ({ filterBtn }) => {

    const dispatch = useDispatch();

    const isHomePageVisible = useSelector((state) => state.searchFilterSlice.isHomePageVisible);
    const isLoggedIn = useSelector(selectLoggedIn);

    const toggleMenu = (menuName) => menuName === 'home' ? dispatch(toggleHomePageVisibility()) : null;



    const loggedMenu = [
        {
            logo: Home,
            menuName: 'home',
            bubble: false,
            className: '',
            border: true,
            isActive: isHomePageVisible,
            isVisible: isLoggedIn
        },
        {
            logo: Heart,
            menuName: 'liked',
            bubble: false,
            className: 'w-5 h-5',
            border: true,
            isActive: false,
            isVisible: isLoggedIn
        },
        {
            logo: Notification,
            menuName: 'notification',
            bubble: true,
            border: true,
            className: '',
            isActive: false,
            isVisible: isLoggedIn
        },
        {
            logo: Gear,
            menuName: 'gear',
            bubble: false,
            border: true,
            className: '',
            isActive: false,
            isVisible: isLoggedIn

        },
        {
            logo: user1,
            menuName: 'user',
            bubble: false,
            className: 'w-full h-full object-cover',
            border: true,
            isActive: false,
            isVisible: isLoggedIn
        }
    ]

    const mainMenu = [
        {
            menuName: 'How it works',
            isVisible: !isLoggedIn
        },
        {
            menuName: 'Services',
            isVisible: !isLoggedIn
        },
        {
            menuName: 'Explore Cars',
            isVisible: !isLoggedIn
        },
        {
            menuName: 'About Us',
            isVisible: !isLoggedIn
        },
        {
            menuName: 'FAQ',
            isVisible: !isLoggedIn
        },
        {
            menuName: 'Log In',
            isVisible: !isLoggedIn
        },
        {
            menuName: 'Register',
            isVisible: !isLoggedIn
        },
    ]



    return (
        <header className="w-full header bg-white px-10 py-5 flex justify-between items-center gap-10 border-b">
            <div className="left w-fit mr-10">
                <Title title="rentro" className={'text-[30px]'} />
            </div>
            {isLoggedIn ? <div className="center w-[80%]">
                <Search icon1={SearchIcon} icon2={FilterHover} iconalt={"icons"} filterBtn={filterBtn} />
            </div>
                : ""}
            <div className="right w-full flex gap-5  justify-end">
                {
                    loggedMenu.map((item, index) => (
                        <HeaderMenu
                            key={index}
                            logo={item.logo}
                            menuName={item.menuName}
                            bubble={item.bubble}
                            className={item.className}
                            border={item.border}
                            toggleMenu={toggleMenu}
                            isActive={item.isActive}
                            isVisible={item.isVisible}
                        />
                    ))
                }
                {!isLoggedIn ?
                    <div className='flex items-center justify-center gap-4 flex-1'>
                        <div className='flex gap-7 flex-1 justify-center font-semibold relative'>
                            {mainMenu.slice(0, 4).map((item, index) =>
                                <a href="" key={(item.menuName).trim() + index} className='text-secondary-300 hover:text-netural-500 relative group'>{item.menuName}
                                    <span className='w-full h-1 block bg-netural-500 rounded-t-md absolute transition -bottom-8 left-0 z-10 invisible group-hover:visible'></span>
                                </a>
                            )
                            }
                        </div>
                        <div className='flex gap-2'>
                            <button className="relative overflow-hidden bg-netural-500 text-white font-medium py-2 px-6 rounded-md group transition-all duration-300" onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: "smooth",})}>
                                <span className="absolute inset-0 bg-netural-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10">Log In</span>
                            </button>

                            <button className="relative overflow-hidden border-2 border-netural-500 text-netural-500 font-medium py-2 px-6 rounded-md group transition-all duration-300">
                                <span className="absolute inset-0 bg-netural-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Register</span>
                            </button>

                        </div>
                    </div> : ''
                    
                }
            </div>
        </header>
    );
};

export default Header;