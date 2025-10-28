import React, { useState } from 'react';
import { homeActive, homeInactive, CarActive, CarInactive, ChartActive, ChartInactive, WalletActive, WalletInactive, MessageActive, MessageInactive, CalanderActive, CalanderInactive, InfoActive, InfoInactive, SettingActive, SettingInactive, BriefcaseActive, BriefcaseInactive, LogoutActive, LogoutInactive } from '../../assets/svgs/index';
import NavLink from './NavLink';

const Menu = () => {

  const menu = [
    {
      linkName: "Dashboard",
      activeIcon: homeActive,
      inactiveIcon: homeInactive,
      to: "/dashboard"
    },
    {
      linkName: 'Car Rent',
      activeIcon: CarActive,
      inactiveIcon: CarInactive,
      to: "/car-rent"
    },
    {
      linkName: 'Insight',
      activeIcon: ChartActive,
      inactiveIcon: ChartInactive,
      to: "/insight"
    },
    {
      linkName: 'Reimburse',
      activeIcon: WalletActive,
      inactiveIcon: WalletInactive,
      to: "/wallet"
    },
    {
      linkName: 'Inbox',
      activeIcon: MessageActive,
      inactiveIcon: MessageInactive,
      to: "/inbox"
    },
    {
      linkName: 'Calendar',
      activeIcon: CalanderActive,
      inactiveIcon: CalanderInactive,
      to: "/calendar"
    }

  ]

  const prefrences = [
    {
      linkName: "Settings",
      activeIcon: SettingActive,
      inactiveIcon: SettingInactive,
      to: "/settings"
    },
    {
      linkName: 'Help & Center',
      activeIcon: InfoActive,
      inactiveIcon: InfoInactive,
      to: "/help-center"
    },
    {
      linkName: 'Dark Mode',
      activeIcon: BriefcaseActive,
      inactiveIcon: BriefcaseInactive,
      to: "/dark-mode"
    }

  ]

  return (
    <div   className={`text-secondary-300 h-full w-full flex flex-col justify-between items-start`}>
      <div className='w-full'>
         <div>
            <h2 className={`text-sm ml-5 `}>MAIN MENU</h2>
                <div className='flex items-center justify-start flex-col gap-y-1 mt-5'>
                    {menu.map((link, index) => (
                      <NavLink key={index} activeIcon={link.activeIcon} inactiveIcon={link.inactiveIcon} linkName={link.linkName} />
                    ))}
                </div>
          </div>
          <div className='mt-12'>
            <h2 className={`text-sm ml-5 `}>PREFERENCES</h2>
                <div className='flex items-center justify-start flex-col gap-y-1 mt-5'>
                    {prefrences.map((link, index) => (
                      <NavLink key={index} activeIcon={link.activeIcon} inactiveIcon={link.inactiveIcon} linkName={link.linkName} />
                    ))}
                </div>
          </div>
      </div>
      <div className='w-full'>
        <NavLink key={'logout'} activeIcon={LogoutActive} inactiveIcon={LogoutInactive} linkName={'Log Out'} />
      </div>

    </div>
  );
};

export default Menu;