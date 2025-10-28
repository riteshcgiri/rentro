import React, { useState, useEffect } from 'react';
import { Select, ReactInput, Choice, File } from '../Inputs/index';
import { useForm } from 'react-hook-form';
import { BadgeInfo, Box, LibraryBig, NotebookPen, ReceiptIndianRupee } from 'lucide-react';
import { airConditioning, availability, carTypes, fuleTypes, seatingTypes, transmissionTypes, status } from '../../Db/carOptions';
import DateInput from '../Inputs/DateInput';
import SpinnerLoader from '../Loaders/SpinnerLoader';
import { useDispatch } from 'react-redux';
import tokenConfig from '../../api/tokenConfig';
import { addNotification } from '../../redux/slices/notificationSlice';
import Locations from '../../Db/locationData';
import CarPanelOptions from './CarPanelOptions';

const CreateCar = () => {
  const { register, handleSubmit, formState: { errors }, getValues, setValue, reset, watch, clearErrors, trigger, setError } = useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatus, setStepStatus] = useState({});
  const [media, setMedia] = useState(null);
  const [info, setInfo] = useState(null);
  const [carStatus, setCarStatus] = useState('draft');
  const [carData, setCarData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const lsCarId = JSON.parse(localStorage.getItem("currentCarId"));


  // Custom validation for date fields (Subscription pattern)
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && (name === 'lastServiceDate' || name === 'nextServiceDate')) {
        const fieldValue = value[name];
        if (fieldValue && !(fieldValue instanceof Date)) {
          setError(name, { type: 'manual', message: 'Invalid date selected' });
        } else {
          clearErrors(name);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setError, clearErrors]);

  useEffect(()=> {
      if(carStatus === 'completed') {
        localStorage.removeItem('currentCarId')
        reset();
        setCurrentStep(0);
      }
  },[carStatus])

  const onPrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const onNext = () => {
    setIsLoading(true);
    const currentStepFields = requiredFields[currentStep] || [];
    const allFilled = currentStepFields.every(field => {
      const value = watch(field);
      if (field === 'lastServiceDate' || field === 'nextServiceDate') {
        return true; // Optional
      }
      return !!value;
    });
    setStepStatus(prev => ({ ...prev, [currentStep]: allFilled ? "complete" : "incomplete" }));
    setIsLoading(false);
  };

  const onSaveAndNext = async () => {
    if (currentStep === 0) await saveBasicDetails();
    if (currentStep === 1) await saveSpecsDetails();
    if (currentStep === 2) await savePricingDetails();
    if (currentStep === 3) await saveMediaDetails();
    if (currentStep === 4) await saveInfoDetails();
    
    if (carIdVerify(lsCarId)) {
      fetchCarData(lsCarId);
    }
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
    else {
      setCurrentStep(0);
    }
    setIsLoading(false);
  };

  const handleDateChange = (fieldName, dateValue) => {
    setValue(fieldName, dateValue, { shouldValidate: true });
  };

  const saveBasicDetails = async () => {
    try {
      setIsLoading(true);
      const data = getValues(carFormSteps[currentStep].label);
      let res;
      if (lsCarId) {
        res = await tokenConfig.put(`/cars/create/${lsCarId}/basic`, data);
        dispatch(addNotification({ message: 'Car Basic Info Updated ✅', type: 'success' }));
      } else {
        res = await tokenConfig.post(`/cars/create/basic`, data);
        const id = localStorage.setItem("currentCarId", JSON.stringify(res.data._id));
        console.log(id);
        
        dispatch(addNotification({ message: 'Car Created Successfully 🎊', type: 'success' }));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(addNotification({ message: `Error: ${error.message}`, type: 'error' }));
    }
  };

  const saveSpecsDetails = async () => {
    if (!carIdVerify(lsCarId)) return;
    try {
      setIsLoading(true);
      const data = getValues(carFormSteps[currentStep].label);
      const res = await tokenConfig.put(`/cars/create/${lsCarId}/specs`, data);
      dispatch(addNotification({ message: 'Car Updated Successfully 🎊', type: 'success' }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(addNotification({ message: `Error: ${error.message}`, type: 'error' }));
    }
  };

  const savePricingDetails = async () => {
    if (!carIdVerify(lsCarId)) return;
    try {
      setIsLoading(true);
      const data = getValues(carFormSteps[currentStep].label);
      const res = await tokenConfig.put(`/cars/create/${lsCarId}/pricing`, data);
      dispatch(addNotification({ message: 'Car Updated Successfully 🎊', type: 'success' }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(addNotification({ message: `Error: ${error.message}`, type: 'error' }));
    }
  };

  const saveMediaDetails = async () => {
    if (!carIdVerify(lsCarId)) return;
    try {
      setIsLoading(true);
      const allValues = getValues();
      const formData = new FormData();
      const mediaFields = [
        "mainImage", "topImage", "backImage", "sideImage",
        "registrationImage", "insuranceImage", "pollutionImage",
      ];

      let hasFiles = false;
      mediaFields.forEach((key) => {
        const value = allValues[key];
        if (!value) return;
        try {
          if (value instanceof window.File) {
            formData.append(key, value);
            hasFiles = true;
          } else if (value instanceof window.FileList && value.length > 0) {
            formData.append(key, value[0]);
            hasFiles = true;
          }
        } catch (err) {
          console.warn(`⚠️ Error adding file for ${key}:`, err);
        }
      });

      if (!hasFiles) {
        dispatch(addNotification({ message: "Please select at least one file to upload.", type: "warning" }));
        setIsLoading(false);
        return;
      }

      const res = await tokenConfig.put(`/cars/create/${lsCarId}/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(addNotification({ message: "Media uploaded successfully 🎊", type: "success" }));
    } catch (error) {
      console.error("❌ Upload error:", error);
      dispatch(addNotification({
        message: `Error uploading media: ${error.response?.data?.error || error.message}`,
        type: "error",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const saveInfoDetails = async () => {
    if (!carIdVerify(lsCarId)) return;
    try {
      setIsLoading(true);
      const data = getValues();
      const infoData = {
        description: data.description,
        lastServiceDate: data.lastServiceDate,
        nextServiceDate: data.nextServiceDate,
        airConditioning: data.airConditioning
      };
      
      if (infoData.lastServiceDate instanceof Date) {
        infoData.lastServiceDate = infoData.lastServiceDate.toISOString().split('T')[0];
      }
      if (infoData.nextServiceDate instanceof Date) {
        infoData.nextServiceDate = infoData.nextServiceDate.toISOString().split('T')[0];
      }
      
      const res = await tokenConfig.put(`/cars/create/${lsCarId}/info`, infoData);
      dispatch(addNotification({ message: 'Car Saved Successfully 🎊', type: 'success' }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(addNotification({ message: `Error: ${error.message}`, type: 'error' }));
      console.log(error);
    }
  };

  const carIdVerify = (id) => {
    if (!id) {
      dispatch(addNotification({ message: 'Car ID unavailable', type: 'error' }));
      // localStorage.removeItem('currentCarId');
      return false;
    }
    return true;
  };

  const fetchCarData = async (carId) => {
    if (!carId || isFetching) return;
    setIsFetching(true);
    try {
      const res = await tokenConfig.get(`/cars/${carId}`);
      if (res.status === 200) {
        const data = res.data;
        const formattedData = {
          ...data?.basicInfo,
          ...data?.specifications,
          ...data?.pricing,
          ...data?.media,
          ...data?.info
        };
        
        if (data?.info?.lastServiceDate) {
          formattedData.lastServiceDate = new Date(data.info.lastServiceDate);
        }
        if (data?.info?.nextServiceDate) {
          formattedData.nextServiceDate = new Date(data.info.nextServiceDate);
        }
        
        setCarData(formattedData);
        setCarStatus(data.status)
        
        setInfo(data?.info)
        reset(formattedData, { keepErrors: true, keepDirty: true });
        setMedia(data?.media);
        dispatch(addNotification({ message: 'Car loaded successfully', type: 'success' }));
      }
    } catch (err) {
      dispatch(addNotification({ message: `Error fetching car: ${err.message}`, type: 'error' }));
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (lsCarId && !isFetching) {
      fetchCarData(lsCarId);
    }
  }, [lsCarId]);

  const carFormSteps = [
    {
      id: "basic",
      heading: "Basic Details",
      pera: 'How should we call this car?',
      step: 0,
      icon: <NotebookPen className='w-7 h-7' strokeWidth={1.2} />,
      fields: [
        { label: "carName", type: "text", placeholder: "Eg : Evo Spider", required: true },
        { label: "model", type: "text", placeholder: "Eg : Huracan", required: true },
        { label: "brand", type: "text", placeholder: "Eg : Lamborghini.", required: true },
        { label: "carType", type: "select", options: [...carTypes], placeholder: "Eg : Super Car", required: true },
        { label: "plate", type: "text", placeholder: "Eg: DL 13 SEP 1999", required: true },
        { label: "engien", type: "text", placeholder: "Eg : ENG9X7C4L82P.", required: true },
        { label: "chassis", type: "text", placeholder: "Eg : 1HGCM82633A004352", required: true },
        { label: "vin", type: "text", placeholder: "Eg : 5YJ3E1EA7KF317482", required: true },
      ],
    },
    {
      id: "specs",
      heading: "Specifications",
      pera: 'What is special about this car?',
      step: 1,
      icon: <Box className='w-7 h-7' strokeWidth={1.2} />,
      fields: [
        { label: "transmission", type: "select", options: [...transmissionTypes], placeholder: "Select Car Transmission", required: true },
        { label: "seatingCapacity", type: "select", options: seatingTypes, placeholder: "Select Car Seating Capacity", required: true },
        { label: "fuleType", type: "select", options: [...fuleTypes], placeholder: "Select Car Fuel Type", required: true },
        { label: "fuleCapacity", type: "number", placeholder: "Eg : 56 L (Only Digits)", required: true },
        { label: "mileage", type: "number", placeholder: "Eg : 26 km/l (Only Digits)", required: true },
        { label: "topSpeed", type: "number", placeholder: "Eg : 200 km/h (Only Digits)" },
      ],
    },
    {
      id: "pricing",
      heading: "Pricing & Availability",
      pera: 'How much expensive is this car?',
      step: 2,
      icon: <ReceiptIndianRupee className='w-7 h-7' strokeWidth={1.2} />,
      fields: [
        { label: "price", type: "number", placeholder: "Enter car renting amount", required: true },
        { label: "discount", type: "number", placeholder: "Enter car discount in (%)" },
        { label: "currentLocation", type: "select", options: Locations, placeholder: "Enter current location (if On Booking)" },
        { label: "odoMeter", type: "number", placeholder: "Eg : 1,00,000" },
        { label: "bookingStatus", type: "select", options: [...status], placeholder: "Select booking status" },
        { label: "isAvailable", type: "radio", options: [...availability], placeholder: "Select availability", required: true },
      ],
    },
    {
      id: "media",
      heading: "Photos & Documents",
      pera: 'What does it look like & documents?',
      step: 3,
      icon: <LibraryBig className='w-7 h-7' strokeWidth={1.2} />,
      fields: [
        { label: "mainImage", type: "file", placeholder: "Select Car Main Image", required: true },
        { label: "topImage", type: "file", placeholder: "Select Car Top Image" },
        { label: "backImage", type: "file", placeholder: "Select Car Back Image" },
        { label: "sideImage", type: "file", placeholder: "Select Car Side Image" },
        { label: "registrationImage", type: "file", placeholder: "Select Car RC Image", required: true },
        { label: "insuranceImage", type: "file", placeholder: "Select Car Insurance Image", required: true },
        { label: "pollutionImage", type: "file", placeholder: "Select Car PUCC Image", required: true },
      ],
    },
    {
      id: "info",
      heading: "Additional Info",
      pera: 'Is there anything else pending?',
      step: 4,
      icon: <BadgeInfo className='w-7 h-7' strokeWidth={1.2} />,
      fields: [
        { label: "description", type: "textbox", placeholder: "Enter car description in about 50 words", required: true },
        { label: "lastServiceDate", type: "date", placeholder: "Enter car's last service date", required: false },
        { label: "nextServiceDate", type: "date", placeholder: "Enter car's next service date", required: false },
        { label: "airConditioning", type: "radio", options: [...airConditioning], placeholder: "Select air conditioning status", required: true },
      ],
    },
  ];

  const requiredFields = {
    0: ["carName", "model", "brand", "carType", "plate", "engien", "chassis", "vin"],
    1: ["transmission", "seatingCapacity", "fuleType", "fuleCapacity", "mileage"],
    2: ["price", "isAvailable"],
    3: ["mainImage", "registrationImage", "insuranceImage", "pollutionImage"],
    4: ["description", "airConditioning"]
  };

  return (
    <div className='w-full min-h-screen p-10 flex gap-1'>
      <CarPanelOptions 
        carFormSteps={carFormSteps} 
        setCurrentStep={setCurrentStep} 
        stepStatus={stepStatus} 
        currentStep={currentStep} 
      />
      
      <div className='w-9/12 min-h-screen bg-white px-7 py-5 rounded-md'>
        <div className='w-full h-full'>
          <div className='flex items-center gap-2 text-secondary-500/80'>
            {carFormSteps[currentStep]?.icon || <span>No Icon</span>}
            <div className='flex-1 font-semibold'>
              <h2>{carFormSteps[currentStep]?.heading || 'No Heading'}</h2>
              <p className='text-xs font-normal'>{carFormSteps[currentStep]?.pera || 'No Description'}</p>
            </div>
          </div>
          <div className='w-full mt-5'>
            <div className='grid grid-cols-2 gap-5'>
              {/* Safeguard to ensure fields exist */}
              {carFormSteps[currentStep]?.fields?.length > 0 ? (
                carFormSteps[currentStep].fields.map((field, index) => {
                  switch (field?.type) {
                    case "select":
                      return (
                        <Select
                          key={field?.label}
                          label={field?.label}
                          options={field?.options || []}
                          value={watch(field?.label) || ''}
                          onChange={(value) => setValue(field?.label, value)}
                        />
                      );
                    case "radio":
                    case "checkbox":
                      return (
                        <Choice
                          key={index}
                          type={field?.type}
                          name={field?.label}
                          label={field?.label}
                          options={field?.options?.map((option) => ({
                            label: option,
                            value: option === "Yes" ? true : false,
                          })) || []}
                          value={watch(field?.label) || ''}
                          onChange={(value) => setValue(field?.label, value)}
                        />
                      );
                    case "file":
                      return (
                        <File
                          key={field?.label}
                          label={field?.label}
                          name={field?.label}
                          register={register}
                          setValue={setValue}
                          error={errors[field?.label]}
                          clearErrors={clearErrors}
                          trigger={trigger}
                          watch={watch}
                          exsitingFile={media?.[field?.label]}
                          carId={lsCarId}
                        />
                      );
                    case "date":
                      return (
                        <DateInput
                          key={field?.label}
                          label={field?.label}
                          value={watch(field?.label)}
                          setValue={(dateValue) => handleDateChange(field?.label, dateValue)}
                          error={errors[field?.label]}
                        />
                      );
                    default:
                      return (
                        <ReactInput
                          key={field?.label}
                          getValues={getValues}
                          label={field?.label}
                          placeholder={field?.placeholder || ''}
                          register={register}
                          validation={field?.required}
                          setValue={setValue}
                          watch={watch}
                          error={errors[field?.label]}
                        />
                      );
                  }
                })
              ) : (
                <div className='text-red-500'>No fields available for this step!</div>
              )}
            </div>
            <div className={`w-full flex justify-end items-center gap-4 mt-7 font-medium`}>
              <button 
                onClick={onPrev} 
                className={`py-2 px-10 text-red-400 bg-red-300/20 rounded-md ${currentStep === 0 ? 'hidden' : ''}`} 
                disabled={isLoading}
              >
                Previous
              </button>
              <button 
                onClick={onSaveAndNext} 
                className={`py-2 px-10 text-green-600 bg-green-500/20 rounded-md flex items-center justify-center ${currentStep === 3 ? (media && 'hidden') : ''} ${currentStep === 4 ? (info && 'hidden') : ''}`} 
                disabled={isLoading}
              >
                {isLoading ? <SpinnerLoader height={25} className={'fill-none stroke-green-700'} /> : (currentStep === 4 ? 'Save' : 'Save & Continue')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;