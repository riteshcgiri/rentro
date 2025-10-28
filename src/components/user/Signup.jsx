import { useForm } from 'react-hook-form';
import axios from 'axios';
import ReactInput from '../Inputs/ReactInput';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/slices/notificationSlice';
import { useState } from 'react';
import SpinnerLoader from '../../components/Loaders/SpinnerLoader'
const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, getValues, setValue, reset, watch } = useForm({ defaultValues: { terms: true } });
    const baseURL = import.meta.env.VITE_API_SERVER_URL;
    const dispatch = useDispatch();
    const onSubmit = async (data) => {

        if (!data.terms) {
            dispatch(addNotification({ message: "Terms not accepted", type: "error" }));
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(`${baseURL}/users/signup`, data);
            dispatch(addNotification({ message: '🥳Account Created Successfully🎊', type: 'success' }))
            reset(); // Only after success
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response?.data?.message || error.response?.data?.error || "Signup failed";
                dispatch(addNotification({ message: String(errorMsg), type: 'error' }));

            } else {
                console.error("❌ Axios error:", error.message);
                dispatch(addNotification({ message: "Network error, please try again later", type: 'error' }));
            }
        }finally {
            setIsLoading(false)
            console.log(isLoading)
        }

        // console.log("Submitted data:", data);
    };

    // console.log(errors);

    const signupFields = [
        { label: 'username', type: 'text', placeholder: 'Enter Full Name', validation: { required: true } },
        { label: 'phone', type: 'number', placeholder: 'Enter Number', validation: { required: true, minLength: 10, maxLength: 10, pattern: /^[6-9]\d{9}$/ } },
        { label: 'email', type: 'email', placeholder: 'Enter Email', validation: { required: true } },
        { label: 'password', type: 'password', placeholder: 'Enter Password', validation: { required: true } },
        { label: 'terms', type: 'checkbox', placeholder: 'I agree to the Terms & Conditions', validation: { required: true } }
    ];
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=' mx-auto flex flex-col gap-4 mt-5'>
            <div className="grid  gap-4">

                <div className="grid grid-cols-2 gap-4">
                    {signupFields.slice(0, 2).map((field, index) => (
                        <ReactInput
                            key={index}
                            label={field.label}
                            type={field.type}
                            getValues={getValues}
                            setValue={setValue}
                            placeholder={field.placeholder}
                            register={register}
                            validation={field.validation}
                            watch={watch}
                        />
                    ))}
                </div>
                {signupFields.slice(2).map((field, index) => (
                    <ReactInput
                        key={index}
                        label={field.label}
                        type={field.type}
                        getValues={getValues}
                        setValue={setValue}
                        placeholder={field.placeholder}
                        register={register}
                        validation={field.validation}
                        watch={watch}
                    />
                ))}

            </div>
            <button type='submit' className='px-5 py-3 rounded-md shadow-md outline-none disabled:bg-netural-300 bg-netural-500 hover:bg-netural-700 cursor-pointer text-white mb-5 focus:bg-netural-600 flex items-center justify-center' role='sumit' disabled={isLoading}>
                {isLoading ? <SpinnerLoader width={25}  className={' stroke-white fill-transparent'} /> : 'Register'}
            </button>
        </form>
    );
};

export default SignUp;