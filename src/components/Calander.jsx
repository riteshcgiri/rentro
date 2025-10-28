import { useState } from "react";
import { ArrowDown } from "../assets/svgs";

const Calendar = ({ setChooseDate, cls }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
        
        // Pass the actual Date object to parent
        setChooseDate(newDate);
        
        // Optional: Log formatted date for debugging
        const formattedDate = newDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        console.log('Selected Date:', formattedDate);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    return (
        <div className={`w-80 mx-auto m-2 p-4 shadow-lg rounded-lg text-black bg-white ${cls}`}>
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={handlePrevMonth} 
                    className="px-4 py-3 bg-secondary-100/40 hover:bg-netural-100 rounded flex items-center justify-center"
                >
                    <img 
                        src={ArrowDown} 
                        className="transition duration-75 rotate-90 invert sepia saturate-200 hue-rotate-180" 
                        alt="Previous month"
                    />
                </button>
                <h2 className="text-lg font-bold">
                    {currentDate.toLocaleString("default", { month: "long" })} {year}
                </h2>
                <button 
                    onClick={handleNextMonth} 
                    className="px-4 py-3 bg-secondary-100/40 hover:bg-netural-100 rounded flex items-center justify-center"
                >
                    <img 
                        src={ArrowDown} 
                        className="transition duration-75 -rotate-90 invert sepia saturate-200 hue-rotate-180" 
                        alt="Next month"
                    />
                </button>
            </div>

            <div className="grid grid-cols-7 text-center font-semibold text-sm">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="py-2">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 text-center gap-1">
                {/* Empty cells for days before month starts */}
                {Array(firstDay).fill(null).map((_, index) => (
                    <div key={`empty-${index}`} className="py-2"></div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: days }, (_, i) => i + 1).map((day) => {
                    const isSelected = selectedDate?.getDate() === day && 
                                      selectedDate?.getMonth() === month && 
                                      selectedDate?.getFullYear() === year;
                    
                    return (
                        <button
                            key={day}
                            onClick={() => handleDateClick(day)}
                            className={`py-2 px-1 rounded transition-colors ${
                                isSelected 
                                    ? "bg-netural-700 text-netural-100" 
                                    : "hover:bg-netural-200 text-gray-700"
                            }`}
                            disabled={false}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;