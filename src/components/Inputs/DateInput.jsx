import { useState, useRef, useEffect } from "react";
import Calendar from "../Calander"; // Ensure path is correct
import { Calendar as CalendarIcon, ChevronDown, X } from "lucide-react";
import { getLabel } from "../../utils/getLabel";

const DateInput = ({ label, setValue, value: externalValue, isInputDiffer=false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState("");
    const [dateObj, setDateObj] = useState(null);
    const inputRef = useRef();

    // 🔄 Sync external value (from parent)
    useEffect(() => {
        if (externalValue) {
            if (externalValue instanceof Date) {
                setDateObj(externalValue);
                const formattedDate = externalValue.toLocaleDateString("en-GB").replaceAll("/", "-");
                setDate(formattedDate);
            } else {
                setDate(externalValue);
            }
        }
    }, [externalValue]);

    // 🧭 Close calendar on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 📆 Handle selection from calendar
    const handleDateSelect = (selectedDateObj) => {
        setDateObj(selectedDateObj);
        const formattedDate = selectedDateObj.toLocaleDateString("en-GB").replaceAll("/", "-");       
        setDate(formattedDate);
        setValue && setValue(selectedDateObj);
        setIsOpen(false);
    };

    // 🧹 Clear date
    const handleClearDate = () => {
        setDate("");
        setDateObj(null);
        setValue && setValue(null);
    };

    // ✍️ Manual date typing (DD-MM-YYYY)
    const handleDateInput = (val) => {
        setDate(val);

        const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
        if (regex.test(val)) {
            const [day, month, year] = val.split("-");
            const parsedDate = new Date(`${year}-${month}-${day}`);
            if (!isNaN(parsedDate)) {
                setDateObj(parsedDate);
                setValue && setValue(parsedDate);
            }
        } else {
            setDateObj(null);
            setValue && setValue(null);
        }
    };

    const dateLabel = getLabel(label);

    return (
        <div className="relative" ref={inputRef}>
            <label
                htmlFor={label}
                className={`text-md ${isInputDiffer ? 'text-secondary-700' : 'text-secondary-400'} font-semibold !peer-has-[input:focus]:text-netural-500`}>
                {dateLabel}
            </label>

            <div
                className={`peer relative ${isInputDiffer ? "items-start justify-start" : "px-7 py-1 rounded-lg  bg-gray-200/50 mt-1 justify-start items-center  has-[input:disabled]:bg-gray-200 has-[input:disabled]:outline-transparent focus-within:outline focus-within:outline-2 focus-within:outline-netural-500"
                    } flex `}
            >
                <input
                    type="text"
                    value={date}
                    placeholder={isInputDiffer ? 'Select date' : 'DD-MM-YYYY'}
                    onClick={() => setIsOpen(true)}
                    onChange={(e) => handleDateInput(e.target.value)}
                    className={`appearance-none flex-1 ${isInputDiffer ? 'text-sm'  : 'py-3.5'} h-full bg-transparent  outline-none text-secondary-500 cursor-text`}
                />
                { isInputDiffer ? <ChevronDown className="w-5 h-5 text-gray-400" /> :  <CalendarIcon className="w-5 h-5 text-gray-400" />}

                {date && (
                    <button
                        onClick={handleClearDate}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        title="Clear date"
                    >
                        {/* <X className="w-4 h-4" /> */}
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-1 left-0">
                    <Calendar
                        setChooseDate={handleDateSelect}
                        selectedDate={dateObj} // 🔗 Sync with Calendar
                    />
                </div>
            )}
        </div>
    );
};

export default DateInput;
