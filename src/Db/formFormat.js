const formFormat = [
    {
        currentStep : 1,
        inputHolder : 'InputText',
        stepTitle : 'Billing Info',
        stepDesc : 'Please enter your billing info',
        stepFeilds : [
            {
                label : 'Name',
                placeholder : 'Your name',
                inputType : 'text',
                inputId : 'userName',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : false,
                data :[],
                button : '',
                className : '',
            },
            {
                label : 'Phone Number',
                placeholder : 'Phone number',
                inputType : 'number',
                inputId : 'telphone',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : false,
                data :[],
                button : '',
                className : 'inputSpinnerHider'
            },
            {
                label : 'Address',
                placeholder : 'Address',
                inputType : 'text',
                inputId : 'address',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : false,
                data :[],
                button : '',
                className : ''
            },
            {
                label : 'Town/City',
                placeholder : 'Town or City',
                inputType : 'option',
                inputId : 'town',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : true,
                data :'locationData',
                button :'',
                className :'bg-bgColor'
            }

        ]
    },
    {
        currentStep : 2,
        inputHolder : 'InputSelect',
        stepTitle : 'Rental Info',
        stepDesc : 'Please select your rental date',
        stepFeilds : [
            {
                label : 'Locations',
                placeholder : 'Select your city',
                inputType : 'option',
                inputId : 'dropPickLocations',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : true,
                data : 'locationData',

            },
            {
                label : 'Date',
                placeholder : 'Select your date',
                inputType : 'option',
                inputId : 'dropPickDate',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : true,
                data : 'dateData',

            },
            {
                label : 'Time',
                placeholder : 'Select your time',
                inputType : 'option',
                inputId : 'dropPickTime',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : true,
                data : 'dateData',

            },
        
        ]
    },
    {
        currentStep : 1,
        inputHolder : 'InputText',
        stepTitle : 'Billing Info',
        stepDesc : 'Please enter your billing info',
        stepFeilds : [
            {
                label : 'Card Number',
                placeholder : 'Your name',
                inputType : 'text',
                inputId : 'userName',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : false,
                data :[],
                button : '',
                className : '',
            },
            {
                label : 'Phone Number',
                placeholder : 'Phone number',
                inputType : 'number',
                inputId : 'telphone',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : false,
                data :[],
                button : '',
                className : 'inputSpinnerHider'
            },
            {
                label : 'Address',
                placeholder : 'Address',
                inputType : 'text',
                inputId : 'address',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : false,
                data :[],
                button : '',
                className : ''
            },
            {
                label : 'Town/City',
                placeholder : 'Town or City',
                inputType : 'option',
                inputId : 'town',
                isDisabled : false,
                handleInputBlur : '',
                isIcon : true,
                data :'locationData',
                button :'',
                className :'bg-bgColor'
            }

        ]
    },

]

export default formFormat;