import { ChevronDown } from "lucide-react";
import { InputSelect, Select } from "./Inputs";
import DateInput from "./Inputs/DateInput";
import { useForm } from "react-hook-form";
import Time from "./Time";
import { useState } from "react";



const PickOption = ({ optionName, selectName, handleShowOption, className, children, cls, data, onChange }) => {
    
      const { register, handleSubmit, formState: { errors }, getValues, setValue, reset, watch, clearErrors, trigger, setError } = useForm();
    const handleDateChange = (fieldName, dateValue) => {
        setValue(fieldName, dateValue, { shouldValidate: true });
        
    };

    const [location, setLocation] = useState('Select your city')

    return (
        <div className="w-full flex-1">
            {
                optionName === 'location' ? <Select id={optionName} label={optionName} key={optionName} options={data}  isInputDiffer={true}  onChange={(value) => setLocation(value)} value={location} />
                    : (
                        optionName === 'date' ? <DateInput key={optionName} label={optionName} value={watch(optionName)} isInputDiffer={true} setValue={(dateValue) => handleDateChange(optionName, dateValue)} error={errors[optionName]}/>
                    : 
                       <Select id={optionName} label={optionName} key={optionName} options={data}  isInputDiffer={true}  onChange={(value) => setLocation(value)} value={location} />
                )
            }

        </div>
    );
};

export default PickOption;