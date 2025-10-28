import React, { useState }  from 'react';
import OrderSummery from './OrderSummery';
import FormSteps from './FormSteps';


const RentalPage = ({rentalCar, setShowNotification, userInputVal, setUserInputVal}) => {
    const [payableAmount, setPayableAmount] = useState(0)

    return (
        <div className='w-full h-fit px-12 py-7 '>
            <div className=" w-full h-full flex gap-5">
                <div className='w-4/6 h-full flex flex-col justify-start items-center gap-5'>
                    <FormSteps setShowNotification={setShowNotification} payableAmount={payableAmount} setPayableAmount={setPayableAmount} />
                </div>
                <div className='w-2/6 h-full flex justify-center items-start'>
                    <OrderSummery carData ={rentalCar} setPayableAmount={setPayableAmount} payableAmount={payableAmount}/>
                </div>
            </div>
        </div> 
    );
};

export default RentalPage;
