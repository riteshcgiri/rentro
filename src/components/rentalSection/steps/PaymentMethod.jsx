import React, {useState} from 'react';

const PaymentMethod = ({payImg_1, payImg_2, labelName, payeeName, payeeId, isChecked, handlePaymentType, classNameImg_1  }) => {

    return (
        <div className='flex justify-between items-center cursor-pointer' >
            <div className='flex justify-start items-center gap-3'>
                <input type="radio" name={payeeName} id={payeeId} checked={payeeId === 'creditCard'? true : isChecked} onChange={(e) => handlePaymentType(payeeId)}  className='appearance-none w-3 h-3  rounded-full border-2 border-netural-500 checked:border-none checked:bg-netural-500 transition-all relative checked:before:w-6 checked:before:h-6 checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2 checked:before:bg-netural-500/40 checked:before:rounded-full cursor-pointer' />
                <label htmlFor={payeeId} className='cursor-pointer font-semibold'>{labelName}</label>
            </div>
            <div className='flex justify-start items-center gap-2'>
               { payImg_1 && <img src={payImg_1} alt={''} className={` ${ classNameImg_1 ? 'h-6' : 'h-full'}  `} /> }
               { payImg_2 && <img src={payImg_2} alt={''} className='h-full' /> }
            </div>
        </div>
    );
};

export default PaymentMethod;