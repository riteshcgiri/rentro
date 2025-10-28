import React from 'react';

const DropDown = ({data, inputVal, handleSetInputValue}) => {
    return (
        <>
        {
        data.filter((data) => 
            inputVal === '' || data.toLowerCase().includes(inputVal.toLowerCase())).map((data) =>(
                <div className='p-3 hover:bg-netural-100' key={data} onClick={() => handleSetInputValue(data)}>
                    <h3 className='text-secondary-500 text-sm'>{data}</h3>
                </div>
            )
        )
        }
        </>
    );
};

export default DropDown;