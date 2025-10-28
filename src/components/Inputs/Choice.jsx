import React, { useEffect } from "react";
import { getLabel } from "../../utils/getLabel";

const Choice = ({
  type = "checkbox", // "checkbox" | "radio" | "toggle"
  name,
  label,
  options = [],
  value,
  onChange,
}) => {

  let choiceLabel = '';
   switch(label) {
    case "airConditioning" :
    choiceLabel = 'Air Conditioning';
      break;
    default:
    choiceLabel = getLabel(label)
   }

   
  return (
    <div className="w-full">
      {label && <p className="mb-1  text-md text-secondary-400 font-semibold">{choiceLabel !== '' ? choiceLabel : label }</p>}

      <div className={` ${type === "checkbox" ? (options.length > 1 ? "grid grid-cols-2 gap-3" : "flex gap-3" ) : "flex gap-3"}`}>
        {options.map((opt, idx) => {
          const isChecked = Array.isArray(value) ? value.includes(opt.value) : value === opt.value;

          // 🔹 Toggle style (pills)
          if (type === "toggle") {
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(opt.value)}
                className={`px-5 py-2 rounded-2xl border font-medium shadow-sm transition 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
                ${
                  isChecked
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            );
          }

          // 🔹 Checkbox style
          if (type === "checkbox") {
            return (
              <label key={idx} className={`w-full flex items-center justify-start gap-3 px-5 py-3.5 rounded-md border-2 cursor-pointer transition shadow-sm select-none font-medium text-center text-secondary-400  ${ isChecked ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-white border-gray-300 hover:border-gray-400"}`}>
                <input type="checkbox" value={opt.value} checked={isChecked} onChange={(e) => {if (e.target.checked) { onChange([...(value || []), opt.value]); } else { onChange(value.filter((v) => v !== opt.value));}}} className="hidden"/>
                <div
                  className={`h-5 w-5 flex items-center justify-center rounded-md border 
                  ${isChecked ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}
                >
                  {isChecked && (
                    <svg  className="h-3 w-3 text-white"  viewBox="0 0 20 20"  fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0L3.296 9.25a1 1 0 111.42-1.42l4.004 4.004 6.54-6.544a1 1 0 011.444.001z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {opt.label}
              </label>
            );
          }

          // 🔹 Radio style (circle inputs, half-width cards)
          if (type === "radio") {
            return (
              <label key={idx} className={`flex items-center justify-center px-4 py-3.5 w-1/2 rounded-xl border-2 cursor-pointer transition shadow-sm select-none font-medium text-center text-secondary-400 ${ isChecked ? "bg-blue-50 border-netural-500 !text-netural-500" : "bg-gray-200/50 border-transparent hover:border-gray-400"}`}>
                <input type="radio" name={name} value={opt.value} checked={isChecked} onChange={() => onChange(opt.value)} className="h-0 w-0"/>
                {opt.label}
              </label>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Choice;
