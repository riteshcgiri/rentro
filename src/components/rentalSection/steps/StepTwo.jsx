import React, { useState, useEffect } from 'react';
import InputSelect from '../../Inputs/InputSelect';
import FormHead from '../FormHead';
import locationData from '../../../Db/locationData';


const StepOne = ({ stepTitle, stepCount, stepCurrent, stepDesc }) => {
    const [userData, setUserData] = useState({})
    const handleInputBlur = (id, val) => setUserData(prev => ({ ...prev, [id]: val }))

    useEffect(() => { console.log(userData) }, [userData])


    return (
        <div className="w-full h-fit bg-white rounded-lg p-5 flex flex-col gap-3">
            <FormHead stepTitle={stepTitle} stepCount={stepCount} stepCurrent={stepCurrent} stepDesc={stepDesc} />
            
            <div className='mt-5'>
                <div className='flex justify-start items-center gap-3'>
                    <input type="radio" name={'pickUp'} id={'pickUp'} disabled className='appearance-none w-3 h-3  rounded-full border-2 border-netural-500 checked:border-none checked:bg-netural-500 transition-all relative checked:before:w-6 checked:before:h-6 checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:bg-netural-500/40 checked:before:rounded-full cursor-pointer' defaultChecked />
                    <label htmlFor={'pickUp'} className='cursor-pointer font-semibold'>Pick-Up</label>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <InputSelect inputType={'select'} inputId={'pickLocation'} label={'Locations'} placeholder={'Select your city'} className={'bg-bgColor'} handleInputBlur={handleInputBlur} />
                    <InputSelect inputType={'select'} inputId={'pickDate'} label={'Date'} placeholder={'Select your date'} className={'bg-bgColor inputSpinnerHider '} handleInputBlur={handleInputBlur} />
                    <InputSelect inputType={'select'} inputId={'pickTime'} label={'Time'} placeholder={'Select your time'} className={'bg-bgColor'} handleInputBlur={handleInputBlur} />
                </div>
            </div>
            <div className='mt-5'>
                <div className='flex justify-start items-center gap-3'>
                    <input type="radio" name={'pickDrop'} id={'pickDrop'} disabled className='appearance-none w-3 h-3  rounded-full border-2 border-netural-500 checked:border-none checked:bg-netural-500 transition-all relative checked:before:w-6 checked:before:h-6 checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:bg-netural-500/40 checked:before:rounded-full cursor-pointer' defaultChecked />
                    <label htmlFor={'pickDrop'} className='cursor-pointer font-semibold'>Pick-Drop</label>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <InputSelect inputType={'select'} inputId={'dropLocation'} label={'Locations'} placeholder={'Select your city'} className={'bg-bgColor'} handleInputBlur={handleInputBlur} />
                    <InputSelect inputType={'select'} inputId={'dropDate'} label={'Date'} placeholder={'Select your date'} className={'bg-bgColor inputSpinnerHider '} handleInputBlur={handleInputBlur} />
                    <InputSelect inputType={'select'} inputId={'dropTime'} label={'Time'} placeholder={'Select your time'} className={'bg-bgColor'} handleInputBlur={handleInputBlur} />
                </div>
            </div>
        </div>
    );
};

export default StepOne;