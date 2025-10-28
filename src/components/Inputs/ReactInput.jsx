import { Image } from "lucide-react";
import React, { useState } from "react";
import { getLabel } from "../../utils/getLabel";

const ReactInput = ({
  label,
  type = "text",
  placeholder,
  register,
  setValue,
  getValues,
  validation = {},
  errors,
  watch,
}) => {
  const [checked, setChecked] = useState(getValues(label) || false);
  const [showPassword, setShowPassword] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    setValue(label, newValue, { shouldValidate: true });
  };

  const handleOnFocus = () => setIsInputFocused(true);
  const handleOnBlur = () => setIsInputFocused(false);

  const isCheckbox = type === "checkbox";

  const inputValue = watch(label);
  let inputLabel = getLabel(label);

  const getOutlineColor = () => {
    if (type === "email") {
      if (!inputValue) return "!outline-netural-500";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(inputValue)
        ? "!outline-green-600"
        : "!outline-error-600";
    }

    if (type === "password" || type === "text") {
      if (!inputValue) return "!outline-netural-500";
      return inputValue.length >= 3
        ? "!outline-green-600"
        : "!outline-error-600";
    }

    if (type === "tel" || type === "number" || label === "phone") {
      if (!inputValue) return "!outline-netural-500";
      return /^[6-9]\d{9}$/.test(inputValue)
        ? "!outline-green-600"
        : "!outline-error-600";
    }

    return "";
  };

  const handleChangePasswordView = () => setShowPassword((prev) => !prev);

  // watch file input
  const selectedFile = watch(label);

  return (
    <div className={`w-full ${isCheckbox ? "flex flex-col items-start gap-1" : "flex flex-col"}`}>
      {isCheckbox ? (
        <>
          {/* Hidden input for RHF */}
          <input type="hidden" {...register(label, validation)} autoComplete="off" />

          {/* Custom checkbox + label wrapper */}
          <div role="checkbox" aria-checked={checked} tabIndex={0} onClick={handleToggle} onKeyDown={(e) => (e.key === " " || e.key === "Enter") && handleToggle()} className="flex items-center gap-3 cursor-pointer select-none">
            {/* Custom styled checkbox */}
            <div className={`w-5 h-5 border-2 flex items-center justify-center rounded-sm transition ${checked ? "border-blue-600" : "border-gray-400"}`}>
              {checked && <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>}
            </div>

            {/* Label text with link */}
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="/terms" target="_blank" className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()} > Terms & Conditions</a>
            </span>
          </div>
        </>
      ) : type === "file" ? (
        <>
          <label htmlFor={label} className="text-md text-gray-700 font-semibold">
            {inputLabel}
          </label>

          {/* Hidden File Input */}
          <input id={label} type="file" className="hidden" {...register(label, validation)} autoComplete="off" />

          {/* Custom Button */}
          <label htmlFor={label} className="cursor-pointer mt-2 inline-block  text-white px-4 py-2 rounded-lg w-full bg-gray-200/50 transition">
            <Image strokeWidth="1.3" className="w-11 h-11 text-netural-400" />
          </label>

          {/* Show selected file name */}
          {selectedFile && selectedFile[0] && (
            <p className="text-sm text-gray-600 mt-1"> {selectedFile[0].name} </p>
          )}

          {/* Preview for image files */}
          {selectedFile && selectedFile[0] && selectedFile[0].type.startsWith("image/") && (<img src={URL.createObjectURL(selectedFile[0])} alt="preview" className="mt-2 h-24 w-24 object-cover rounded-lg border" />)}
        </>
      ) : (
        <>
          <label htmlFor={label} className=" text-md text-secondary-400 font-semibold !peer-has-[input:focus]:text-netural-500">{inputLabel}</label>
          <div className={`peer bg-gray-200/50 px-7 py-1 rounded-lg mt-1 ${isInputFocused ? "outline outline-2 outline-netural-500 bg-white/40" : ""} flex justify-start items-center has-[input:disabled]:bg-gray-200 has-[input:disabled]:outline-transparent ${getOutlineColor()}`}>
            <input id={label} type={type === "password" ? showPassword ? "text" : "password" : type} placeholder={placeholder} onFocus={handleOnFocus} maxLength={label === "pinCode" ? 6 : undefined} onBlur={handleOnBlur} className="appearance-none flex-1 h-full bg-transparent py-3.5 outline-none text-secondary-500" autoComplete="off" readOnly={/*label === "email"*/ false} disabled={/*label === "email"*/ false} {...register(label, { ...validation, onBlur: handleOnBlur, })} />
            <div role="button" className={`${label === "password" ? "" : "hidden"}`} onClick={handleChangePasswordView} >
              {!showPassword ? (
                // eye-slash icon
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="stroke-secondary-300" fill="none">
                  <path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" className="stroke-secondary-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" className="stroke-secondary-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018" className="stroke-secondary-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.5099 12.7002C15.2499 14.1102 14.0999 15.2602 12.6899 15.5202" className="stroke-secondary-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.47 14.5298L2 21.9998" className="stroke-secondary-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 2L14.53 9.47" className="stroke-secondary-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                // eye open icon
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z" className="stroke-secondary-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.0001 20.2702C15.5301 20.2702 18.8201 18.1902 21.1101 14.5902C22.0101 13.1802 22.0101 10.8102 21.1101 9.40021C18.8201 5.80021 15.5301 3.72021 12.0001 3.72021C8.47009 3.72021 5.18009 5.80021 2.89009 9.40021C1.99009 10.8102 1.99009 13.1802 2.89009 14.5902C5.18009 18.1902 8.47009 20.2702 12.0001 20.2702Z" className="stroke-secondary-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
        </>
      )}

      {/* Validation Error */}
      {errors?.[label] && (
        <p className="text-red-500 text-sm mt-1">{errors[label]?.message}</p>
      )}
    </div>
  );
};

export default ReactInput;
