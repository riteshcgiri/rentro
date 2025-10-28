import { useForm } from 'react-hook-form';
import axios from 'axios';
import ReactInput from '../Inputs/ReactInput';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/slices/notificationSlice';
import { login } from '../../redux/slices/authSlice';
import { useState } from 'react';
import SpinnerLoader from '../../components/Loaders/SpinnerLoader'
const Login = () => {

    const { register, handleSubmit, formState: { errors }, getValues, setValue, reset, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const baseURL = import.meta.env.VITE_API_SERVER_URL;
    
    const dispatch = useDispatch();
    const onSubmit = async (data) => {

            setIsLoading(true);
        try {
            const response = await axios.post(`${baseURL}/users/login`, {...data, email : data.email.toLowerCase()});

            dispatch(login(response.data));
            // console.log(response.data);
            
            dispatch(addNotification({ message: '🥳Login Successful🎊', type: 'success' }))
            reset(); // Only after success
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response?.data?.message || error.response?.data?.error || "Login failed";
                dispatch(addNotification({ message: String(errorMsg), type: 'error' }));

            } else {
                console.error("❌ Axios error:", error.message);
                dispatch(addNotification({ message: `Network Error 500, Please try again later`, type: 'error' }));
            }
        }finally {
            setIsLoading(false)
        }

        // console.log("Submitted data:", data);
    };

    // console.log(errors);

    const loginFields = [
        { label: 'email', type: 'email', placeholder: 'Enter Email', validation: { required: true } },
        { label: 'password', type: 'password', placeholder: 'Enter Password', validation: { required: true } }
    ];
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=' mx-auto flex flex-col gap-4 mt-5'>
            <div className="grid  gap-4">
                {loginFields.map((field, index) => (
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
                {isLoading ? <SpinnerLoader width={25}  className={' stroke-white fill-transparent'} /> : 'Continue'}
            </button>
        </form>
    );
};

export default Login;