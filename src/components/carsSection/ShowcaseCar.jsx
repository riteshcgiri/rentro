import React, { useEffect, useState } from 'react';
import AdHead from '../AdHead';
import ReviewsBox from '../ReviewsBox';
import Rating from '../Rating';

const ShowcaseCar = ({selectedCar, showAd, handleHideAd}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
    }
    let car = Object.keys(selectedCar).length;
    useEffect(() => {
        car !== 0 ? setIsOpen(true) : setIsOpen(false);
        setIsLiked(selectedCar.isLiked)
    }, [car, selectedCar,showAd])

  


    return (
        <div className={`${car === 0 || showAd === false ? 'hidden' : 'block' } w-full h-fit mb-5`} >
            <div className='carDiv flex gap-5'>
                <div className='carImgDiv w-1/2 flex flex-col gap-3 overflow-hidden relative group '>
                    <button className='absolute right-5 -top-10 group-hover:top-5 z-20  cursor-pointer hover:scale-125 hover:rotate-180 duration-150' onClick={handleHideAd}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='fill-white w-7 h-7' viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" />
                            <path d="M9.16986 15.58C8.97986 15.58 8.78986 15.51 8.63986 15.36C8.34986 15.07 8.34986 14.59 8.63986 14.3L14.2999 8.63999C14.5899 8.34999 15.0699 8.34999 15.3599 8.63999C15.6499 8.92999 15.6499 9.40998 15.3599 9.69998L9.69986 15.36C9.55986 15.51 9.35986 15.58 9.16986 15.58Z" />
                            <path d="M14.8299 15.58C14.6399 15.58 14.4499 15.51 14.2999 15.36L8.63986 9.69998C8.34986 9.40998 8.34986 8.92999 8.63986 8.63999C8.92986 8.34999 9.40986 8.34999 9.69986 8.63999L15.3599 14.3C15.6499 14.59 15.6499 15.07 15.3599 15.36C15.2099 15.51 15.0199 15.58 14.8299 15.58Z" />
                        </svg>
                    </button>
                    <AdHead adDetails={selectedCar} customHeight={true} isOpen={isOpen} />
                    <div className='flex gap-3 h-[8rem]'>
                        <div className='flex-1 h-full overflow-hidden rounded-xl relative '>
                            <img src={selectedCar.pattern} alt="" className='w-full h-full object-cover absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl' />
                            <img src={selectedCar.img} alt="" className='w-full h-full scale-90 object-fit z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                        </div>
                        <div className='flex-1 h-full overflow-hidden rounded-xl relative'>
                            <img src={selectedCar.coverOne} alt="" className='w-full  h-full object-fit' />
                        </div>
                        <div className='flex-1 h-full overflow-hidden rounded-xl relative'>
                            <img src={selectedCar.coverTwo} alt="" className='w-full  h-full object-fit' />
                        </div>
                    </div>
                </div>

                <div className='detailsCard w-1/2 h-fit bg-white px-7 py-7 rounded-xl'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-semibold text-3xl'>{selectedCar?.fullData?.name}</h2>
                        {
                            isLiked ?
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLike} width="26" height="26" className='cursor-pointer' viewBox="0 0 24 24" fill="none">
                                    <path d="M16.44 3.09998C14.63 3.09998 13.01 3.97998 12 5.32998C10.99 3.97998 9.37 3.09998 7.56 3.09998C4.49 3.09998 2 5.59998 2 8.68998C2 9.87998 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.87998 22 8.68998C22 5.59998 19.51 3.09998 16.44 3.09998Z" fill="#ED3F3F" />
                                </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLike} width="26" height="26" className='cursor-pointer' viewBox="0 0 24 24" fill="none">
                                    <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" stroke="#90A3BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                        }
                    </div>
                    <div className="ratings flex items-center mt-5 text-sm text-secondary-300">
                        <Rating rating={selectedCar?.fullData?.ratings} />
                        <h2 className='ml-2'>{selectedCar?.reviwsCount}+ Ratings</h2>
                    </div>
                    <h2 className='text-secondary-300 text-sm mt-5 text-justify leading-6'>{selectedCar?.fullData?.description}</h2>
                    <div className='grid grid-cols-2 gap-x-8 gap-y-3 mt-5 text-secondary-300 text-md'>
                        <div className='flex justify-between items-center'>
                            <span>Car Type</span> <span className='font-bold text-secondary-400'>{selectedCar?.fullData?.type}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Sitting Capacity</span> <span className='font-bold text-secondary-400'>{selectedCar?.fullData?.passengers} Persons</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Transmition</span> <span className='font-bold text-secondary-400'>{selectedCar?.fullData?.transmission}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Fule Capacity</span> <span className='font-bold text-secondary-400'>{selectedCar?.fullData?.fuleCapacity} L</span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-8 transition-all duration-100'>
                        <div className=''>
                            <h2 className='font-bold text-2xl text-secondary-500'>₹ {Number(selectedCar?.fullData?.discountPrice).toFixed(2)} / <span className='text-sm text-secondary-300 inline-block'>Day</span></h2>
                            <h2 className='font-semibold text-xl text-secondary-300 line-through'>₹ {Number(selectedCar?.fullData?.rentPrice).toFixed(2)}</h2>

                        </div>
                        <button className='bg-netural-500 hover:scale-95 transition origin-bottom text-white px-7 py-2.5 rounded-md'>Rent Now</button>
                    </div>

                </div>
            </div>
            <div className='reviewDiv'>
                <ReviewsBox />
            </div>
        </div>
    );
};

export default ShowcaseCar;