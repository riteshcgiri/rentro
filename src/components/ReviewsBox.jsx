import { useEffect, useState } from 'react';
import React from 'react';
import Review from './Review';
import reviews from '../Db/reviews';


const ReviewsBox = () => {

    const [reviewsData, setReviewsData] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (showAll) {
            setReviewsData(reviews);
        } else {
            setReviewsData(reviews.slice(0, 2));
        }
    }, [showAll]);

    

    return (
        <div className='reviewsBox w-full h-fit bg-white px-7 py-7 rounded-xl mt-7 transition-[height] duration-100'>
            <div className='flex justify-start items-center gap-4 font-semibold'>
                <h2 className=' text-xl'>Reviews</h2>
                <h2 className=' text-sm text-white bg-netural-500 px-5 py-1.5 rounded-md'>{reviews.length}</h2>
            </div>
            <div className='transition-all duration-100'>

                {
                    reviewsData.map((review, index) => <Review key={index} reviewData={review} />)
                }
            </div>

            <div className='flex justify-center items-center mt-10'>
                <button className='flex items-center gap-2 text-secondary-300 font-semibold text-sm hover:text-netural-500 group' onClick={() => setShowAll(!showAll)}>
                    Show All
                    {
                        showAll ?
                            <svg xmlns="http://www.w3.org/2000/svg" className='transform rotate-180 text-secondary-300 group-hover:text-netural-500' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" className='text-secondary-300 group-hover:text-netural-500' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 5.646a.5.5 0 0 1 .708 0L8 11.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                            </svg>
                    }

                </button>
            </div>
        </div>
    );
};

export default ReviewsBox;