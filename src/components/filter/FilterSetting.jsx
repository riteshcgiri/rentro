import { useState } from "react";
import Input from "./Input";
import { useSelector, useDispatch } from "react-redux";
import { setType, setSeatingCapacity } from '../../redux/slices/searchFilterSlice';


const FilterSetting = ({filterHeading, filterOption, funName}) => {
    
    


    return (
        <div className='px-5 py-7'>
            <h2 className='text-secondary-400 text-xs'>{filterHeading}</h2>
          {
            filterOption.map((item) => (
                <Input
                    key={item.id}
                    item={item}
                    funName = {filterHeading === 'TYPE' ? setType : setSeatingCapacity}     
                    className="select-none h-4 w-4 checked:border-transparent border checked:bg-netural-500 rounded-sm cursor-pointer"
                />
            ))
          }
          

        </div>
    );
};

export default FilterSetting;