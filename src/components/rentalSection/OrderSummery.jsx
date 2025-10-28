import React, { useEffect, useState } from 'react';
import Rating from '../Rating';
import InputText from '../Inputs/InputText';
import { getCoupne, getCoupneList, removeCoupne } from '../../Db/coupnes';
import { PatternOne, PatternTwo } from '../../assets/svgs';

const OrderSummery = ({ carData, setPayableAmount, payableAmount }) => {

    const [refralCodeInputVal, setRefralCodeInputVal] = useState("");
    const [coupneValue, setCoupneValue] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false); 
    const [oldPrice, setOldPrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [netPayable, setNetPayable] = useState(0);
    const [duration, setDuration] = useState(1);
    
    console.log(carData);
    
        
    const handleApplyRefral = (inputVal) => {
        setRefralCodeInputVal(inputVal.toUpperCase());
        const coupne = getCoupne(refralCodeInputVal);
        if (refralCodeInputVal === coupne?.name) {
            setCoupneValue(coupne.amount);
            setIsDisabled(true);
            removeCoupne(coupne.name);
            setRefralCodeInputVal("");
        } else if (refralCodeInputVal === "") {
            alert("Please enter a promo code");
            setRefralCodeInputVal("");
        }
        else {
            alert("Invalid promo code");
            setRefralCodeInputVal("");
        }
    };
    useEffect(() => {
        setOldPrice(carData.price);
        setDiscount(carData.discount);
        setTax(discount * 0.18);
        setDiscountPercent((oldPrice - discount) / oldPrice * 100);
        setNetPayable(discount + tax);
        setDuration(5); // Example duration, you can set it dynamically based on user input or selection
        setPayableAmount(isDisabled ? ((netPayable * duration ) - coupneValue) : (netPayable * duration));
    }, [carData, discount, oldPrice, handleApplyRefral]);


    return (
        <div className='w-full h-fit bg-white rounded-lg p-5'>
            <h2 className='font-bold text-sm'>Rental Summary</h2>
            <p className='text-secondary-300 mt-1 text-xs'>Prices may change depending on the length of the rental and the price of your rental car.</p>
            <div className='w-full my-5 flex gap-5 border-b-2 border-secondary-200/30 pb-7'>
                <div className=' w-2/6 relative flex justify-center items-center overflow-hidden rounded-xl h-[5rem] '>
                    <img src={PatternOne} alt="" className='w-full h-full object-cover absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl' />
                    <img src={carData?.imgs?.mainImage} alt="" className='w-full scale-90 object-fit z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                </div>
                <div className='flex-1 flex flex-col justify-center items-start'>
                    <h2 className='font-bold text-3xl'>{'Nissan GT-R'}</h2>
                    <div className='flex items-center mt-1 text-sm text-secondary-300 gap-0.5'>
                        <Rating rating={carData?.ratings} />
                        {carData.reviewsCount}+ Reviews
                    </div>
                </div>
            </div>
            <div className="priceSummary flex flex-col gap-4">
                <div className='flex justify-between items-center font-semibold text-md text-secondary-300 -mb-5'>
                    <span className='  inline-block'></span>
                    <span className='text-xs line-through '>₹ {oldPrice?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex justify-between items-center font-semibold text-md text-secondary-300'>
                    <span className='  inline-block'>Subtotal</span>
                    <span className='text-secondary-600'>₹ {discount?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex justify-between items-center font-semibold text-md text-secondary-300'>
                    <span className=' inline-block'>CGST</span>
                    <span className='text-secondary-600'>₹ {(tax / 2)?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex justify-between items-center font-semibold text-md text-secondary-300'>
                    <span className=' inline-block'>SGST</span>
                    <span className='text-secondary-600'>₹ {(tax / 2)?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex justify-between items-center font-semibold text-md text-secondary-300'>
                    <span className=' inline-block'>Rental Period</span>
                    <span className='text-secondary-600'>{duration} Days</span> {/*click function to detailed duration*/}
                </div>
                <div className='flex justify-between items-center font-semibold text-md border-t-2 border-secondary-200/30 pt-4 text-secondary-300'>
                    <span className=' inline-block'>Net Payable Amount</span>
                    <span className='text-secondary-600'>₹ {(netPayable * duration)?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
            </div>
            <InputText button="Apply Now" placeholder="Apply promo code" inputType="text" inputId="promoCode" className={'bg-bgColor'}  handleApplyRefral={handleApplyRefral} isDisabled={isDisabled} />
            <div className=' flex items-center justify-between pt-3 text-secondary-600'>
                <div className='mt-3 '>
                    <h2 className='text-2xl font-bold'>Total Rental Price</h2>
                    <span className='text-secondary-300 text-sm font-medium  inline-block'>Overall price and includes rental discount</span>
                </div>

                <h2 className='font-bold text-[2.1rem] inline-block'>₹ {payableAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h2>
            </div>
        </div>
    );
};

export default OrderSummery;