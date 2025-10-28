const stepOneForm = [
    {
        id : 1,
        step : 'first',
        label: "Name",
        inputId: "userName",
        inputType: "text",
        placeholder: "Your name",
        className : "bg-bgColor",
        handleFunc : handleInputBlur,
        required: true,
        
    },
    {
        id : 2,
        step : 'first',
        label: "Phone Number",
        inputId: "telephone",
        inputType: "number",
        placeholder: "Phone number",
        className : "bg-bgColor inputSpinnerHider",
        handleFunc : handleInputBlur,
        required: true,
        
    },
    {
        id : 3,
        step : 'first',
        label: "Address",
        inputId: "address",
        inputType: "text",
        placeholder: "Address",
        className : "bg-bgColor",
        handleFunc : handleInputBlur,
        required: true,
        
    },
    {
        id : 4,
        step : 'first',
        label: "Town/City",
        inputId: "town",
        inputType: "text",
        placeholder: "Town or City",
        className : "bg-bgColor",
        handleFunc : handleInputBlur,
        required: true,
        
    },
    {
        id : 5,
        step : 'second',
        label: "Locations",
        inputId: "location",
        inputType: "text",
        placeholder: "Select your city",
        className : "bg-bgColor",
        handleFunc : handleInputBlur,
        isIcon : true,
        required: true,
        
    },
    {
        id : 6,
        step : 'second',
        label: "Date",
        inputId: "date",
        inputType: "text",
        placeholder: "Select your date",
        className : "bg-bgColor",
        handleFunc : handleInputBlur,
        isIcon : true,
        required: true,
        
    },
    {
        id : 7,
        step : 'second',
        label: "Time",
        inputId: "time",
        inputType: "text",
        placeholder: "Select your time",
        className : "bg-bgColor",
        handleFunc : handleInputBlur,
        isIcon : true,
        required: true,
        
    },
];

export { stepOneForm};