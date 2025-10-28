import React from 'react';
import './footer.css';
import Title from '../Title';
import {aboutLinks, communityLinks, socialLinks } from '../../Db/footerData'
import FooterNav from '../FooterNav';

const Footer = () => {
    return (
        <footer className="footer bg-white px-10 py-7">
            <div className='flex gap-1 flex-wrap '>
                <div className=' flex-grow'>
                    <Title title="rentro" className={'text-[28px]'}/>
                    <h2 className='text-secondary-400 text-xs mt-3'>Our vision is to provide convenience <br /> and help increase your sales business.</h2>
                </div>
                <div className=' flex justify-start flex-grow pl-20'>
                    <FooterNav navTitle={'About'} navLink={aboutLinks}/>
                    <FooterNav navTitle={'Community'} navLink={communityLinks}/>
                    <FooterNav navTitle={'Social'} navLink={socialLinks}/>
                </div>
            </div>
            <div className='border-t border-secondary-200 mt-10 pt-7 flex justify-between text-sm font-medium text-secondary-400'>
                <p>© 2021 Rentro. All rights reserved.</p>
                <div>
                    <a href="/privacy-policy" className='hover:text-secondary-600'>Privacy Policy</a>
                    <a href="/terms" className='hover:text-secondary-600 ml-5'>Terms of Service</a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;