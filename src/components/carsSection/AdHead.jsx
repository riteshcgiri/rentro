import { add } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { openBannerAndFetch } from '../../redux/slices/bannerSlice';
import { useDispatch } from 'react-redux';



const AdHead = ({adData, customHeight=false, isOpen}) => {
    
    const dispatch = useDispatch();
    
    
    
    return (
        <div className={`w-full h-[20.5rem] bg-blue-400 rounded-xl relative transition-all overflow-hidden text-white`} id={adData?.id} onClick={() => dispatch(openBannerAndFetch(adData?.id))} >
            <div className={` relative z-10 p-7`}>
                <h2 className={`${isOpen ? 'text-2xl' : 'text-3xl '} w-2/4 font-bold `}>{adData?.heading}</h2>
                <p className={`  w-6/12 text-sm mt-2`}>{adData?.desc?.slice(0,100)}</p>
                <button className={`px-6 py-2.5 text-white rounded-md mt-7 bg-blue-500 hover:-translate-y-1 hover:scale-105 transition ${isOpen ? 'hidden' : ''} `} id={adData?.id}>Rental Car</button>
            </div>
            <img src={adData?.img} alt="adcar" className={`h-56 object-cover absolute bottom-0 right-0 z-[2] `} />
            <img src={adData?.pattern} alt="adPattern" className={`w-full h-full object-cover absolute top-0 left-0 z-0`} />
        </div>
    );
};

export default AdHead;