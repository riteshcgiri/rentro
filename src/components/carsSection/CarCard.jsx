import { Fuel, Heart, LifeBuoy, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { use } from 'react';
const CarCard = ({ car, handleRent }) => {
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
    }
    useEffect(() => {
        setIsLiked(car.liked)
    }, []);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    
        const handleMouseMove = (e) => {
            const { clientX, clientY, currentTarget } = e;
            const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
            // Calculate rotation angles
            const xRotation = ((clientY - top) / height - 0.5) * 10; // Rotate along X-axis (vertical tilt)
            const yRotation = ((clientX - left) / width - 0.5) * -10;  // Rotate along Y-axis (horizontal tilt)
    
            setRotation({ x: xRotation, y: yRotation });
        };
    
        const handleMouseLeave = () => {
            setRotation({ x: 0, y: 0 }); // Reset tilt when mouse leaves
        };

        
    return (
        <div className="car-card w-[20.85rem] h-[26rem] bg-white rounded-md p-7 select-none flex flex-col justify-between cursor-pointer"  onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,}}>
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-lg'>{car?.basicInfo?.carName}</h2>
                    {
                        <Heart strokeWidth={1.5} className={` ${isLiked ? 'text-red-500 fill-red-500': 'text-secondary-300'}`} onClick={handleLike}/>
                    }
                </div>
                <h2 className='text-xs text-secondary-300 font-semibold'>{car?.basicInfo?.carType}</h2>
            </div>
            <div className='relative'>
                <img src={car?.media?.mainImage} alt={car?.basicInfo?.carName   } className="car-image" />
                <div className='bg-gradient-to-t from-white to-white/0 absolute -bottom-4 z-[1] w-full h-[90%]'></div>
            </div>
            <div className="car-details">
                <div className='flex justify-between items-center text-xs z-10'>
                    <h2 className='flex items-center text-secondary-300 font-semibold gap-1'>
                        <Fuel className='w-4 h-4' />
                        <span>{car?.specifications?.fuleCapacity}Ltr</span>

                    </h2>
                    <h2 className='flex items-center text-secondary-300 font-semibold gap-1'>
                        <LifeBuoy className='w-4 h-4' /> 
                        <span>{car?.specifications?.transmission}</span>

                    </h2>
                    <h2 className='flex items-center text-secondary-300 font-semibold gap-1'>
                       <Users className='w-4 h-4'/>
                        <span>{car?.specifications?.seatingCapacity} People</span>

                    </h2>

                </div>
                <div className='flex justify-between items-center mt-4'>
                    <div>
                        <h2 className='font-semibold text-xl text-secondary-600'>₹ {(car?.pricing?.price)?.toFixed(0)}/<span className='text-sm text-secondary-300 inline-block'>day</span></h2>
                        { <h2 className='font-semibold text-xs text-secondary-300 line-through'>₹ {((car?.pricing?.price / (1 - ( car?.pricing?.discount / 100))))?.toFixed(0)}</h2> }

                    </div>
                    <button className={`bg-netural-500 hover:scale-95 transition origin-bottom text-white px-7 py-2.5 rounded-md`} id={car?._id} onClick={handleRent}>Rent Now</button>
                </div>
            </div>
        </div>
    );
};

export default CarCard;