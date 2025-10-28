import React, {useState} from 'react';

const InputCheckBox = ({ label, name, value, onChange, className }) => {
    return (
        <label htmlFor={name} className={`flex items-center gap-5  rounded-md shadow-sm select-none cursor-pointer text-md font-medium focus-within:ring-2 focus-within:ring-netural-500 focus-within:ring-offset-2 ${className}`}>

            <input
                type="checkbox"
                name={name}
                id={name}
                checked={value}
                onChange={onChange}
                className='appearance-none text-primary-500 border-gray-300 rounded focus:ring-primary-500'
            />
            <div className={`w-6 h-6 border-[2px] cursor-pointer flex items-center   justify-center rounded-sm ${value ? "border-netural-500" : "border-netural-500"}`} onClick={() => setChecked(!checked)} >
                {value && <div className="w-4 h-4 bg-netural-500 rounded-sm"></div>}
            </div>
            <span className=''>{label}</span>

        </label>

    )
};

export default InputCheckBox;