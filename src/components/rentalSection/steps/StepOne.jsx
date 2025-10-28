import React, { useState, useEffect } from 'react';
import InputText from '../../Inputs/InputText';
import FormHead from '../FormHead';


const StepOne = ({ stepTitle, stepCount, stepCurrent, stepDesc }) => {
    const [userData, setUserData] = useState({})
    const handleInputBlur = (id, val) => setUserData(prev => ({ ...prev, [id]: val }))

    useEffect(() => { console.log(userData)}, [userData])


    return (
        <div className="w-full h-fit bg-white rounded-lg p-5 flex flex-col gap-4">
            <FormHead stepTitle={stepTitle} stepCount={stepCount} stepCurrent={stepCurrent} stepDesc={stepDesc} />
            <div className="grid grid-cols-2 gap-4 w-full">
                <InputText inputType={'text'} inputId={'userName'} label={'Name'} placeholder={'Your name'} className={'bg-bgColor'} handleInputBlur={handleInputBlur} />
                <InputText inputType={'number'} inputId={'telphone'} label={'Phone Number'} placeholder={'Phone number'} className={'bg-bgColor inputSpinnerHider '} handleInputBlur={handleInputBlur} />
                <InputText inputType={'text'} inputId={'address'} label={'Address'} placeholder={'Address'} className={'bg-bgColor'} handleInputBlur={handleInputBlur} />
                <InputText inputType={'option'} inputId={'town'} label={'Town/City'} placeholder={'Town or City'} className={'bg-bgColor'} handleInputBlur={handleInputBlur} />
            </div>


        </div>
    );
};

export default StepOne;