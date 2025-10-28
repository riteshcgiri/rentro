import React, { useEffect, useState } from 'react';
import { ArrowDown } from '../../assets/svgs/index';
import locationData from '../../Db/locationData';
import DropDown from './DropDown';
import Calendar from '../Calander';
import Time from '../Time';
import { use } from 'react';
const InputSelect = ({ label, button, placeholder, className, inputType, inputId, isDisabled = false, handleInputBlur, isIcon = true }) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isButtonFocused, setIsButtonFocused] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const handleSetInputValue = (data) => {

        setInputVal('');
        setInputVal(data);
        setTimeout(() => {
            setIsInputFocused(false);
            handleInputBlur && handleInputBlur(inputId, data);
            
        }, 2500);
    }
    const [children, setChildren] = useState('');
   
useEffect(() => {
    
    if(label === 'Locations'){
        setChildren(<DropDown data={locationData} inputVal={inputVal} handleSetInputValue={handleSetInputValue} />);
    } else if(label === 'Date'){
        setChildren(<Calendar  setChooseDate={setInputVal} cls={'bg-white'} setIsInputFocused={setIsInputFocused}/>);
    } else if(label === 'Time'){
        setChildren(<Time setChooseTime={setInputVal} />);
    }
}, [label]);
    return (
        <div className='mt-5'>
            {label && <label htmlFor={inputId} className='font-semibold'>{label}</label>}
            <div className={`bg-gray-200/40 px-7 py-1 rounded-lg mt-3 ${isInputFocused ? 'outline outline-netural-100 bg-netural-300/20' : ''} flex justify-start items-center ${className} ${isDisabled ? 'bg-green-300/20' : ''} relative`}>
                <input type={inputType} id={inputId} className=' appearance-none  flex-1 h-full bg-transparent py-4 outline-none' autoComplete='off' placeholder={placeholder} value={inputVal} onChange={(e) => setInputVal(e.target.value)} onFocus={() => setIsInputFocused(!isInputFocused)} onBlur={(e) => {setTimeout(() => {setIsInputFocused(!isInputFocused)},1000)}} disabled={isDisabled} />

                <div className={`${label !== 'Date' ? 'bg-white shadow-md' : ''} absolute  top-[120%] left-0 w-full rounded-md max-h-[25rem] overflow-y-auto scrollbar-hide z-10 transition-all duration-300 ease-in-out`} >
                    <div className='flex flex-col gap-1'>
                        {
                        isInputFocused ? children : ''}
                    </div>
                </div>


                {button && <button className={` font-semibold px-3 py-2 rounded-md hover:text-netural-500 ${isButtonFocused ? ' text-netural-500 bg-netural-100' : ''}  outline-none ${isDisabled ? 'text-gray-400 hover:text-gray-400' : ''}`} onClick={() => handleApplyRefral(inputVal)} onFocus={() => setIsButtonFocused(!isButtonFocused)} onBlur={() => setIsButtonFocused(!isButtonFocused)} disabled={isDisabled}>{button ? button : ''}</button>}
                {isIcon && <img src={ArrowDown} className={`transition duration-75 ${isInputFocused ? 'rotate-180' : ''}`} />}
            </div>
        </div>
    );
};

export default InputSelect;