 import React from "react";
import Choice from "../Inputs/Choice";
import Select from "../Inputs/Select";
import File from "../Inputs/File";
import ReactInput from "../Inputs/ReactInput";   
import SpinnerLoader from "../Loaders/SpinnerLoader";


const Form = ({ section,onSave, onClose, register, setValue, getValues, watch, errors, isLoading }) => {
  return (
    <div className="w-5/6 p-7 rounded-xl bg-white mb-2">
      <div className="w-full flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold mb-3 text-secondary-400 flex items-center justify-between w-full">
          {section.heading}
          <span className="text-xs ml-5 px-5 py-2 rounded-full text-netural-600 bg-netural-400/20">
           Step {section.step} / 4
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {section.fields.map((field, index) => {
          if (field.type === "radio") {
            return (
              <Choice
                key={index}
                type="radio"
                name={field.label}
                label={field.label}
                options={field.options.map(option => ({ label: option, value: option.toLowerCase() }))}
                value={watch(field.label)}
                onChange={value => setValue(field.label, value)}
              />
            );
          }
          if (field.type === "select") {
            return (
              <Select
                key={index}
                label={field.label}
                options={field.options}
                value={watch(field.label)}
                onChange={value => setValue(field.label, value)}
              />
            );
          }
          if (field.type === "file") {
            return (
              <div className="col-span-2" key={index}>
                <File
                  label={field.label}
                  name={field.label}
                  register={register}
                  setValue={setValue}
                  error={errors[field.label]}
                  watch={watch}
                />
              </div>
            );
          }
          return (
            <ReactInput
              key={index}
              label={field.label}
              type={field.type}
              getValues={getValues}
              setValue={setValue}
              placeholder={field.placeholder}
              register={register}
              validation={{ required: field.required }}
              watch={watch}
            />
          );
        })}
      </div>

      <div className="w-full flex justify-end items-center gap-4 mt-7 font-medium">
        <button onClick={() => onClose()} className="py-2 px-10 text-red-400 bg-red-300/20 rounded-full">Cancel</button>
        <button onClick={() => onSave(section)} className="py-2 px-10 text-green-600 bg-green-500/20 rounded-full flex items-center justify-center" disabled={isLoading}> {isLoading ? <SpinnerLoader width={25}  className={' stroke-green-600 fill-transparent'} /> : 'Save'}</button>
      </div>
    </div>
  );
};


export default Form;