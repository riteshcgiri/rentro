import React, { useEffect, useState } from 'react';
import locations from '../Db/locationData';
import PickOption from './PickOption';
import Calendar from './Calander';
import {globalTime, localTime} from '../Db/timeDb'
import { dropoffSelector,pickupSelector,setError,setLoading, swapData} from '../redux/slices/tripSwapperSlice'
import { useDispatch, useSelector } from 'react-redux';
const PickDrop = ({ id, selectVals }) => {


     const dispatch = useDispatch();
     const { isLoading, error,temp, data, pickup, dropoff} = useSelector((state) => state.tripSwapperSlice);
   
    const handleSelectLocation = (value) => {
        
    }

    

/*

 // const [showLocation, setShowLocation] = useState(false);
    // const [showDate, setShowDate] = useState(false);
    // const [showTime, setShowTime] = useState(false);
    // const [chooseCity, setChooseCity] = useState('Select your City');
    // const [chooseDate, setChooseDate] = useState('Select your Date');
    // const [chooseTime, setChooseTime] = useState('Select your Time');
    const handleShowLocation = () => {
        setShowLocation(!showLocation);
        setShowDate(false);
        setShowTime(false);
    }
    const handleShowDate = () => {
        setShowDate(!showDate);
        setShowTime(false);
        setShowLocation(false);
    }
    const handleShowTime = () => {
        setShowTime(!showTime);
        setShowDate(false);
        setShowLocation(false);
    }
*/

    const tripType = id.toLowerCase().replace("-", "_")

    return (
        <div className={`flex-1 bg-white px-10 py-4 rounded-md relative select-none `}>
            <div className='flex justify-start items-center gap-3'>
                <input type="radio" name={tripType} id={tripType} className='appearance-none w-3 h-3  rounded-full border-2 border-netural-500 checked:border-none checked:bg-netural-500 transition-all relative checked:before:w-6 checked:before:h-6 checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:bg-netural-500/40 checked:before:rounded-full cursor-pointer' defaultChecked />
                <label htmlFor={tripType} className='cursor-pointer font-semibold'>{id}</label>
            </div>
            <div className='flex justify-start items-center gap-3 mt-3 relative'>
                {/* <PickOption optionName={'location'} selectName={chooseCity} handleShowOption={handleShowLocation} cls={'bg-white shadow-md'} children={showLocation ? locationData.map((data, index) => (<div className='p-3 hover:bg-netural-100'  key={index} onClick={() => setChooseCity(data)}><h3 className='text-secondary-500 text-sm'>{data}</h3></div>)) : ''} /> */}
                <PickOption optionName={'location'} data={locations} onChange={handleSelectLocation} />
                <PickOption optionName={'date'} /> 
                <PickOption optionName={'time'} data={localTime} /> 


            </div>     
        </div>
    );
};

export default PickDrop;