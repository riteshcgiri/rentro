import React, { useState } from 'react';
import InputCheckBox from '../../Inputs/InputCheckBox';
import {secuirtyGuard} from '../../../assets/svgs/index';
import FormHead from '../FormHead';
const StepFour = ({ stepTitle, stepCount, stepCurrent, stepDesc }) => {

    const [marketingCheckBox, setMarketingCheckBox] = useState(false);
    const [termsCheckBox, setTermsCheckBox] = useState(false);
    return (
        <div className="w-full h-fit bg-white rounded-lg p-5 flex flex-col gap-4">
           <FormHead stepTitle={stepTitle} stepCount={stepCount} stepCurrent={stepCurrent} stepDesc={stepDesc} />
            <div className='flex flex-col gap-5 mt-5'>
                <InputCheckBox label="I agree with sending an Marketing and newsletter emails. No spam, promissed!" name="marketing" value={marketingCheckBox} onChange={() => setMarketingCheckBox(!marketingCheckBox)} />
                <InputCheckBox label="I agree with our terms and conditions and privacy policy." name="terms" value={termsCheckBox} onChange={() => setTermsCheckBox(!termsCheckBox)} />
                <button className={`bg-netural-500 hover:scale-95 transition origin-bottom text-white px-4 py-4 w-1/6 rounded-md`} id={''} onClick={() => {}}>Rent Now</button>
            </div>
            <div className='mt-7'>
                <img src={secuirtyGuard} alt={secuirtyGuard} />
                <div className='mt-3 flex flex-col gap-1'>
                    <h2 className='font-semibold text-lg'>All your data are safe</h2>
                    <h3 className='font-medium text-sm text-secondary-300'>We are using the most advanced security to provide you the best experience ever.</h3>
                </div>
            </div>


        </div>
    );
};

export default StepFour;