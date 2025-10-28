import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const ServerUrl = import.meta.env.VITE_API_SERVER_URL;
 const onSubmit = async (data) => {
  try {
    const response = await axios.post(`${ServerUrl}/users/signup`, data);
    console.log("Data sent successfully:", response.data);
    reset(); // Only after success
  } catch (error) {
    console.error("Error sending data:", error);
  }

  console.log("Submitted data:", data);
};

fetch()
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-1/2 mx-auto flex flex-col gap-4'>
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="text" placeholder="username"  {...register("username", {required: true})} />
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="email" placeholder="email" {...register("email", {required: true})} />
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="tel" placeholder="phone" {...register("phone", {required: true, min: 10, maxLength: 10, pattern: /^[6-9]\d{9}$/i})} />
      {/* <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="password" placeholder="password" {...register("password", {required: true})} /> */}
         <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="text" placeholder="city" {...register("city")} />
      <select className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' {...register("state")}>
        <option value="">Select State</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value=" Arunachal Pradesh"> Arunachal Pradesh</option>
        <option value=" Assam"> Assam</option>
        <option value=" Bihar"> Bihar</option>
        <option value=" Chhattisgarh"> Chhattisgarh</option>
        <option value=" Goa"> Goa</option>
        <option value=" Gujarat"> Gujarat</option>
        <option value=" Haryana"> Haryana</option>
        <option value=" Himachal Pradesh"> Himachal Pradesh</option>
        <option value=" Jharkhand"> Jharkhand</option>
        <option value=" Karnataka"> Karnataka</option>
        <option value=" Kerala"> Kerala</option>
        <option value=" Madhya Pradesh"> Madhya Pradesh</option>
        <option value=" Maharashtra"> Maharashtra</option>
        <option value=" Manipur"> Manipur</option>
        <option value=" Meghalaya"> Meghalaya</option>
        <option value=" Mizoram"> Mizoram</option>
        <option value=" Nagaland"> Nagaland</option>
        <option value=" Odisha"> Odisha</option>
        <option value=" Punjab"> Punjab</option>
        <option value=" Rajasthan"> Rajasthan</option>
        <option value=" Sikkim"> Sikkim</option>
        <option value=" Tamil Nadu"> Tamil Nadu</option>
        <option value=" Telangana"> Telangana</option>
        <option value=" Tripura"> Tripura</option>
        <option value=" Uttar Pradesh"> Uttar Pradesh</option>
        <option value=" Uttarakhand"> Uttarakhand</option>
        <option value=" West Bengal"> West Bengal</option>
        <option value=" New Delhi"> New Delhi</option>
      </select>
      <select className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' {...register("country")}>
        <option value="India">India</option>
      </select>
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="url" placeholder="profilePic" {...register("profilePic")} />
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="datetime-local" placeholder="dob" {...register("dob")} />
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="text" placeholder="licenseNumber" {...register("licenseNumber")} />
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="url" placeholder="licenseImage" {...register("licenseImage")} />
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="url" placeholder="facebook" {...register("facebook")} />
      <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="url" placeholder="twitter" {...register("twitter")} />
        <input className='px-5 py-3 rounded-md shadow-md outline-none focus:bg-gray-100' type="url" placeholder="instagram" {...register("instagram")} />
      <input className='px-5 py-3 rounded-md shadow-md outline-none bg-netural-500 mb-5 focus:bg-gray-100' type="submit" />
    </form>
  );
}