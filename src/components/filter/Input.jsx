import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Input = ({item, funName}) => {
    const dispatch = useDispatch();
  
    return (
        <div className='flex items-center space-x-2 mt-5 relative' >
            <input
                type={'checkbox'} name={item.checkbox} value={item.label}
                id={item.id}
                className={`appearance-none ${'border border-gray-300 rounded-sm w-4 h-4 cursor-pointer checked:bg-netural-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out relative`}'}`}
                checked={item.isChecked} onChange={() => dispatch(funName({ id: item.id })) }
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${'isChecked' ? 'visible' : 'hidden'} fill-white absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4`}>
                <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
            </svg>
            <label htmlFor={item.id} className="text-xs text-secondary-500 select-none cursor-pointer">{item.label} <span className="font-normal text-gray-500">{`(${item.qty > 0 ? item.qty : ''})`}</span></label>
        </div>
    );
};

export default Input;