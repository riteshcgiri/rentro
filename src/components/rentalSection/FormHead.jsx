import React from 'react';

const FormHead = ({stepCount, stepCurrent, stepDesc, stepTitle}) => {
    return (
        <div className="flex justify-between items-center w-full">
                <div className='flex flex-col'>
                    <h2 className='text-lg font-bold'>{stepTitle}</h2>
                    <span className='text-secondary-300 text-xs font-medium  inline-block'>{stepDesc}</span>
                </div>
                <h2 className="text-secondary-300 text-xs font-medium">Step {stepCurrent} of {stepCount}</h2>
            </div>
    );
};

export default FormHead;