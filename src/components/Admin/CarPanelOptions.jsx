import React from 'react';
import { CircleCheck, CircleX } from 'lucide-react'; 
const CarPanelOptions = ({ carFormSteps, setCurrentStep, currentStep, stepStatus}) => {
    return (
        <div className='flex-1 bg-white flex flex-col gap-0.5 rounded-md overflow-hidden'>
            {carFormSteps.map((step) => (
                <div key={step.id} onClick={() => setCurrentStep(step.step)} className={`w-full h-20 transition duration-100 flex items-center justify-start p-5 gap-5  ${currentStep === step.step ? 'clip-path-carMenu' : ''}  ${stepStatus[step.step] === "complete" ? 'bg-green-200/30 text-green-700' : (currentStep === step.step && stepStatus[step.step] ? 'bg-red-200/30 text-red-400' : 'bg-secondary-100/30 text-secondary-400 hover:bg-netural-100/30')}  cursor-pointer font-semibold`}>
                    {step.icon}
                    <div className='flex-1'>
                        <h2>{step.heading}</h2>
                        <p className='text-xs font-normal'>{step.pera}</p>
                    </div>
                    {stepStatus[step.step] === "complete" 
                        ? <CircleCheck className="w-6 h-6 fill-green-400 text-white" strokeWidth={1.5} />
                        : (stepStatus[step.step] ? <CircleX className="w-6 h-6 fill-red-400 text-white" strokeWidth={1.5} /> : '')
                    }
                </div>
            ))}
        </div>
    );
};

export default CarPanelOptions;