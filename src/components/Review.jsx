import React from 'react';
import Rating from './Rating';

const Review = ({reviewData}) => {
    return (
        <div className='review w-full h-fit mt-7 flex gap-3 bg-white hover:bg-netural-300/5 rounded-lg px-3 py-3'>
            <div className='w-[60px] h-[60px] rounded-full border-2 flex justify-center items-center overflow-hidden'>
                <img src={reviewData.img} alt="img_user" className='w-full h-full bg-slate-200 object-cover'/>
            </div>
            <div className='flex-1 flex flex-col gap-3'>
                <div className='flex justify-between items-center '>
                    <div className='flex flex-col gap-3'>
                        <h2 className='font-bold text-md text-secondary-700'>{reviewData.userName}</h2>
                        <h2 className='text-secondary-300 font-semibold text-xs'>{reviewData.position} in {reviewData.location}</h2>
                    </div>
                    <div className='flex flex-col items-end gap-3'>
                        <h2 className='text-secondary-300 font-semibold text-xs'>{reviewData.date}</h2>
                        <div className='flex items-center'>
                            <Rating rating={reviewData.rating} />
                        </div>
                    </div>
                </div>
                <h2 className='text-xs text-secondary-300 font-medium leading-6 text-justify w-11/12'>{reviewData.review}</h2>
            </div>
        </div>
    );
};

export default Review;