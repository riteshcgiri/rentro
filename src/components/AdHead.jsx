import React, { useEffect, useState } from 'react';


const AdHead = ({adDetails, customHeight=false, isOpen, handleAdHead}) => {
    const ad = { ...adDetails };
    
    return (
        <div className={`w-full ${customHeight ? 'flex-1' : 'h-[22.5rem]'} bg-blue-400 rounded-xl relative transition-all overflow-hidden ${ad.textColor} ${ad.id}`} onClick={handleAdHead} >
            <div className={` relative z-10 p-7 ${ad.id}`}>
                <h2 className={`text-3xl font-bold  ${isOpen ? 'w-7/12' : 'w-5/12'} ${ad.id}`}>{isOpen ? ad.headingOpen : ad.heading}</h2>
                <p className={` ${isOpen ? 'mt-5' : 'mt-7'} w-6/12 ${ad.id}`}>{isOpen ? ad.descOpen : ad.desc}</p>
                <button className={`px-6 py-2.5 text-white rounded-md mt-7 bg-blue-500 hover:-translate-y-1 hover:scale-105 transition ${isOpen ? 'hidden' : ''} ${ad.id}`} >{ad?.btn?.btnTitle}</button>
            </div>
            <img src={ad.img} alt="adcar" className={`h-56 object-cover absolute bottom-5 left-44 z-[2] ${ad.id}`} />
            <img src={ad.pattern} alt="adPattern" className={`w-full h-full object-cover absolute top-0 left-0 z-0`} />
        </div>
    );
};

export default AdHead;