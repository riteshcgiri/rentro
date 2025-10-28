
import InputSelect from "../Inputs/InputSelect";
import { useState, useEffect } from "react";
import locationData from '../../Db/locationData';
import {StepOne, StepTwo} from './steps/index'
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";


const FormStep = ({setShowNotification, payableAmount, setPayableAmount }) => {
 

    return (
        <>
        <StepOne stepTitle={'Billing Info'} stepDesc={'Please enter your billing info'} stepCount={4} stepCurrent={1}/>
        <StepTwo stepTitle={'Rental Info'} stepDesc={'Please select your rental info'} stepCount={4} stepCurrent={2}/>
        <StepThree stepTitle={'Rental Info'} stepDesc={'Please select your rental info'} stepCount={4} stepCurrent={3} setShowNotification={setShowNotification} payableAmount={payableAmount} setPayableAmount={setPayableAmount}/>
        <StepFour stepTitle={'Confirmation'} stepDesc={'We are getting to the end. Just few clicks and your rental is ready!'} stepCount={4} stepCurrent={4}/>
        </>
        
    );
};

export default FormStep;