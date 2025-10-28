import React from 'react';
import { Poega } from '../assets/cars/index';
import TermSection from '../components/TermSection'
import termsData from '../Db/termsData'

const Terms = () => {
   
    return (
        <div className='w-full h-full'>
            <section className=' h-full relative flex justify-center items-center select-none'>
                <div className='w-full h-full relative'>
                    <img src={Poega} className='w-full h-full object-cover' alt="" />
                </div>
                <div className='w-full h-full absolute top-0 left-0 bg-gradient-to-t from-white via-white/20 to-black/70 text-white flex justify-center items-center flex-col p-10 overflow-hidden'>
                    <h1 className='text-[30rem] font-extrabold  tracking-wide text-center leading-[7rem] absolute top-1/2 -mt-20 z-0 text-white/30'>RENTRO</h1>
                    <h1 className='text-8xl font-extrabold tracking-wide text-center leading-[7rem] z-10'>Our Terms & Conditions</h1>
                    {/* scroll down animation */}
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start absolute bottom-40">
                        <div className="w-2 h-2 bg-white rounded-full animate-scroll-dot mt-1"></div>
                    </div>
                </div>
            </section>
        {
            termsData.map((data,index) => <TermSection title={data.title} img={data.img} points={data.points} index={index}/>)
        }
        </div>
    );
};

export default Terms;