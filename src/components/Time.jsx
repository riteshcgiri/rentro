import React, { useState } from 'react';

const Time = ({setShowTime, setChooseTime}) => {
    const [newTime, setNewTime] = useState('00:00');
    const [hour, setHour] = useState("01");
    const [minute, setMinute] = useState("00");
    const [amPm, setAmPm] = useState("AM");

    // Convert 12-hour format to 24-hour format
    const getFormattedTime = () => {
        let hr = parseInt(hour, 10);
        if (amPm === "PM" && hr !== 12) hr += 12;
        if (amPm === "AM" && hr === 12) hr = 0; 
        return `${String(hr).padStart(2, "0")}:${minute}`;
    };
    const handleSetTime = () => {
        setNewTime(getFormattedTime());
        setChooseTime(hour + ":" + minute + " " + amPm);
        setShowTime(false);
    }
    return (
        <div className='flex flex-col w-fit gap-2 px-0 py-3  text-slate-700'>
            {/* Time Input Field */}
            <input 
                type="time" 
                name="setTime" 
                id="setTime"
                readOnly 
                className='appearance-none outline-none text-right select-none hidden rounded-md' 
                value={newTime} 
            />

            {/* Time Selection Buttons */}
            <div className='flex justify-start gap-2 m-4'>
                {/* Hour Buttons */}
                <div className='grid grid-cols-1 gap-2 text-sm'>
                    {[...Array(12).keys()].map((h) => {
                        const displayHour = String(h + 1).padStart(2, "0");
                        return (
                            <button key={displayHour}
                                onClick={() => setHour(displayHour)}
                                className={`p-3 rounded-md ${hour === displayHour ? "bg-blue-500 text-white" : "bg-slate-100 hover:bg-slate-200"}`}>
                                {displayHour}:00
                            </button>
                        );
                    })}
                </div>

                {/* AM/PM Buttons */}
                <div className='flex flex-col gap-2 items-start'>
                    <button className={`w-full px-6 py-3 rounded-md ${amPm === "AM" ? "bg-blue-500 text-white" : "bg-slate-100 hover:bg-slate-200"}`} 
                        onClick={() => setAmPm("AM")}>
                        AM
                    </button>
                    <button className={`w-full px-6 py-3 rounded-md ${amPm === "PM" ? "bg-blue-500 text-white" : "bg-slate-100 hover:bg-slate-200"}`} 
                        onClick={() => setAmPm("PM")}>
                        PM
                    </button>
                </div>
            </div>

            {/* Confirm Button */}
            <button 
                className='p-3 w-full bg-netural-500 text-white rounded-md' 
                onClick={handleSetTime}>
                Choose
            </button>
        </div>
    );
};

export default Time;
