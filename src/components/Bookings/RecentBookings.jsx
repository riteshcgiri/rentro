import React from 'react';

const RecentBookings = ({booking}) => {
    return (
        <div key={booking.id} className='w-full border-b-2 border-secondary-300/20 py-4 flex items-center cursor-pointer hover:bg-secondary-300/10 px-3 hover:rounded-md transition-all duration-0 hover:border-transparent'>
            <div className='w-2/6 h-[5rem] mr-5'>
                <img src={booking.img} alt="" className='w-full h-full object-contain' draggable={false} />
            </div>
            <div className='flex flex-col gap-3'>
                <h2 className='text-secondary-600/80 font-semibold'>{booking.name}</h2>
                <h3 className='text-secondary-300 text-sm'>{booking.type}</h3>
            </div>
            <div className='flex flex-col gap-3 flex-1 items-end'>
                <h3 className='text-secondary-300 text-sm'>{booking.date}</h3>
                <h2 className='text-secondary-600/80 font-bold'> ₹ {(booking.price).toLocaleString("en-IN")}.00</h2>
            </div>
        </div>
    );
};

export default RecentBookings;
