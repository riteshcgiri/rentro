import React, { useEffect, useState } from 'react';
import AdHead from './carsSection/AdHead';
import PickDrop from './PickDrop';
import { useSelector, useDispatch } from 'react-redux';
import { PatternOne, PatternTwo } from '../assets/svgs';
import { ArrowDownUp } from 'lucide-react';




const Landing = ({ filterOpen,}) => {


    const [pickup, setPickUp] = useState({});
    const [dropoff, setDropOff] = useState({});
    const { data, loading, error } = useSelector((state) => state.carsSlice);
    const {isAdOpen} = useSelector((state) => state.bannerSlice);

    const handleSwap = () => {
        setPickUp(dropoff);
        setDropOff(pickup);
    }

    
    const randomCarOne = Math.floor(Math.random() * data.length);
    const randomCarTwo = Math.floor(Math.random() * data.length);
    const adData = [
        {
            id: data[randomCarOne]?._id,
            pattern: PatternOne,
            heading: 'The Best Platform for Car Rental',
            desc: 'Ease of doing a car rental safely and reliably. Of course at a low price.',
            img: data[randomCarOne]?.media.mainImage
        },
        {
            id: data[randomCarTwo]?._id,
            pattern: PatternTwo,
            heading: 'Easy way to rent a car at a low price',
            desc: 'Providing cheap car rental services and safe and comfortable facilities.',
            img: data[randomCarTwo]?.media.mainImage
        }

    ]


    return (
        <div className={`${isAdOpen && 'hidden'}`}>
            <div className={`flex justify-between gap-5 overflow-hidden ${filterOpen ? 'hidden' : 'block'}`}>
                <AdHead adData={adData[0]} />
                <AdHead adData={adData[1]} />
            </div>
            <div className='mt-5 flex items-center gap-10'>
                <PickDrop id={'Pick-Up'} selectVals={setPickUp} />
                <button className='bg-netural-500 p-4 rounded-md text-white hover:bg-netural-600 hover:scale-95 transition group' onClick={() => handleSwap()}>
                    <ArrowDownUp className='group-hover:-rotate-90 transition-all duration-300'/>
                </button>
                <PickDrop id={'Drop-Off'} selectVals={setDropOff} />
            </div>
        </div>
    )
}


export default Landing;
