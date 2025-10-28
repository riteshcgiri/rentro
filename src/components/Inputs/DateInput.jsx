import { useState, useRef, useEffect } from "react";
import Calendar from "../Calander"; // Note: Make sure path is correct
import { Calendar as CalendarIcon } from "lucide-react";
import { getLabel } from "../../utils/getLabel";

const DateInput = ({ label, setValue, value: externalValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState("");
    const [dateObj, setDateObj] = useState(null);
    const inputRef = useRef();

    // Sync with external value if provided
    useEffect(() => {
        if (externalValue) {
            if (externalValue instanceof Date) {
                setDateObj(externalValue);
                const formattedDate = externalValue.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
                setDate(formattedDate);
            } else {
                setDate(externalValue);
            }
        }
    }, [externalValue]);

    // Close calendar if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDateSelect = (selectedDateObj) => {
        // selectedDateObj is a Date object from Calendar
        setDateObj(selectedDateObj);
        
        // Format for display
        const formattedDate = selectedDateObj.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        
        setDate(formattedDate);
        
        // Pass Date object to parent (for form validation/processing)
        setValue && setValue(selectedDateObj);
        
        setIsOpen(false);
    };

    const handleInputClick = () => {
        setIsOpen(true);
    };

    const handleClearDate = () => {
        setDate("");
        setDateObj(null);
        setValue && setValue(null);
    };

    let dateLabel = getLabel(label);

    return (
        <div className="relative" ref={inputRef}>
            <label 
                htmlFor={label} 
                className="text-md text-secondary-400 font-semibold !peer-has-[input:focus]:text-netural-500"
            >
                {dateLabel}
            </label>

            <div className="peer relative bg-gray-200/50 px-7 py-1 rounded-lg mt-1 flex justify-start items-center has-[input:disabled]:bg-gray-200 has-[input:disabled]:outline-transparent focus-within:outline focus-within:outline-2 focus-within:outline-netural-500">
                <input 
                    type="text" 
                    value={date} 
                    placeholder="DD-MM-YYYY" 
                    onClick={handleInputClick}
                    readOnly // Prevent manual typing for better UX
                    className="appearance-none flex-1 h-full bg-transparent py-3.5 outline-none text-secondary-500 cursor-pointer" 
                />
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                
                {/* Optional clear button when date is selected */}
                {date && (
                    <button
                        onClick={handleClearDate}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        title="Clear date"
                    >
                        ×
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-1 left-0">
                    <Calendar setChooseDate={handleDateSelect} />
                </div>
            )}
        </div>
    );
};

export default DateInput;