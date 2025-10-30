import React, { useEffect, useState } from 'react';
import AdHead from './carsSection/AdHead';
import PickDrop from './PickDrop';
import { useSelector, useDispatch } from 'react-redux';
import { PatternOne, PatternTwo } from '../assets/svgs';



const Landing = ({ filterOpen, handleShowAd, showAd }) => {


    const [pickup, setPickUp] = useState({});
    const [dropoff, setDropOff] = useState({});
    const { data, loading, error } = useSelector((state) => state.carsSlice);
    const handleSwap = () => {
        setPickUp(dropoff);
        setDropOff(pickup);
    }

    const adData = [
        {
            id: data[4]?._id,
            pattern: PatternOne,
            heading: 'The Best Platform for Car Rental',
            desc: 'Ease of doing a car rental safely and reliably. Of course at a low price.',
            img: data[4]?.media.mainImage
        },
        {
            id: data[10]?._id,
            pattern: PatternTwo,
            heading: 'Easy way to rent a car at a low price',
            desc: 'Providing cheap car rental services and safe and comfortable facilities.',
            img: data[10]?.media.mainImage
        }

    ]


    return (
        <div className={`${showAd ? 'hidden' : 'block'}`}>
            <div className={`flex justify-between gap-5 overflow-hidden ${filterOpen ? 'hidden' : 'block'}`}>
                <AdHead adData={adData[0]} />
                <AdHead adData={adData[1]} />
            </div>
            <div className='mt-5 flex items-center gap-10'>
                <PickDrop id={'Pick-Up'} selectVals={setPickUp} />
                <button className='bg-netural-500 p-4 rounded-md text-white hover:bg-netural-600 hover:scale-95 transition' onClick={() => handleSwap()}>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.16051 0.835774L5.16051 14.4536" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.08273 4.93188L5.1605 0.835218L9.23828 4.93188" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.0887 17.1671L15.0887 3.54934" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.1665 13.071L15.0887 17.1677L11.0109 13.071" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <PickDrop id={'Drop-Off'} selectVals={setDropOff} />
            </div>
        </div>
    )
}


export default Landing;


// 54a6ff
// 3563e9