import React, { useEffect, useState } from 'react';
import AdHead from './AdHead';
import ReviewsBox from '../ReviewsBox';
import Rating from '../Rating';
import { XCircle, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { PatternOne, PatternTwo } from '../../assets/svgs';
import { closeBanner } from '../../redux/slices/bannerSlice';


const ShowcaseCar = ({}) => {
    const [isLiked, setIsLiked] = useState(false);
    const { id, isAdOpen, carDetails, loading, error,} = useSelector((state) => state?.bannerSlice)
    const dispatch = useDispatch();

    const handleLike = () => {
        setIsLiked(!isLiked);
    }



    const randomNumGen = () => {
        return Math.round(Math.random());

    }
    

  
    // console.log( id, isAdOpen, carDetails, loading, error );
    
    const carData = {
        id,
        img : carDetails?.media?.mainImage,
        heading : 'Sports car with the best design and acceleration',
        desc : carDetails?.info?.description,
        pattern : Math.round(Math.random()) === 1 ? PatternOne : PatternTwo 
    }

    return (
        <div className={`${!isAdOpen ? 'hidden' : 'block' } w-full h-fit mb-5`} id={id} >
            <div className='carDiv h-full flex gap-5'>
                <div className='carImgDiv w-1/2 h-full flex flex-col gap-3 overflow-hidden relative group '>
                    <button className='absolute right-5 -top-10 group-hover:top-5 z-20  cursor-pointer hover:scale-125 hover:rotate-180 duration-150' onClick={() => dispatch(closeBanner())}>
                       <XCircle strokeWidth={1.2} className='w-6 h-6 text-white' />
                    </button>
                    <AdHead adData={carData} customHeight={true} isOpen={true} />
                    <div className='flex gap-3 h-[8rem]'>
                        <div className='flex-1 h-full overflow-hidden rounded-xl relative '>
                            <img src={carData?.pattern} alt="" className='w-full h-full object-cover absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl' />
                            <img src={carDetails?.media?.backImage} alt="" className='w-full scale-90 object-cover z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                        </div>
                        <div className='flex-1 h-full overflow-hidden rounded-xl relative'>
                            <img src={carDetails?.media?.topImage} alt="" className='w-full  h-full object-cover' />
                        </div>
                        <div className='flex-1 h-full overflow-hidden rounded-xl relative bg-white'>
                            <img src={carDetails?.media?.sideImage} alt="" className='w-full  h-full object-cover' />
                        </div>
                    </div>
                </div>

                <div className='detailsCard w-1/2 h-full bg-white px-7 py-7 rounded-xl'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-xl'>{carDetails?.basicInfo?.carName} - ({carDetails?.basicInfo?.brand})</h2>
                        {
                        <Heart strokeWidth={1.5} className={` ${isLiked ? 'text-red-500 fill-red-500': 'text-secondary-300'}`} onClick={handleLike}/>
                        }
                    </div>
                    <div className="ratings flex items-center mt-5 text-xs text-secondary-300">
                        <Rating rating={4.4} /> {/* data will be inserted here */}
                        <h2 className='ml-2'>{carDetails?.reviews?.count}100+ Ratings</h2>
                    </div>
                    <h2 className='text-secondary-300 text-xs mt-5 text-justify leading-6'>{carDetails?.info?.description}</h2>
                    <div className='grid grid-cols-2 gap-x-8 gap-y-3 mt-5 text-secondary-300 text-xs'>
                        <div className='flex justify-between items-center'>
                            <span>Car Type</span> <span className='font-bold text-secondary-400'>{carDetails?.basicInfo?.carType}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Sitting Capacity</span> <span className='font-bold text-secondary-400'>{carDetails?.specifications?.seatingCapacity} Persons</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Transmition</span> <span className='font-bold text-secondary-400'>{carDetails?.specifications?.transmission}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Fule Capacity</span> <span className='font-bold text-secondary-400'>{carDetails?.specifications?.fuleCapacity} L</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Fule Type</span> <span className='font-bold text-secondary-400'>{carDetails?.specifications?.fuleType}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Milage</span> <span className='font-bold text-secondary-400'>{carDetails?.specifications?.mileage} Km/L</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Top Speed</span> <span className='font-bold text-secondary-400'>{carDetails?.specifications?.topSpeed} Km/hr</span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-8 transition-all duration-100'>
                        <div className=''>
                            <h2 className='font-bold text-xl text-secondary-500'>₹ {carDetails?.pricing?.price.toFixed(2)} / <span className='text-sm text-secondary-300 inline-block'>Day</span></h2>
                            <h2 className='font-semibold text-lg text-secondary-300 line-through'>₹ {((carDetails?.pricing?.price / (1 - ( carDetails?.pricing?.discount / 100))))?.toFixed(2)}</h2>

                        </div>
                        <button className='bg-netural-500 hover:scale-95 transition origin-bottom text-white px-7 py-2.5 rounded-md' id={carDetails?._id}>Rent Now</button>
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