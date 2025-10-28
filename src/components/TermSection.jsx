import { fabClasses } from '@mui/material';
import React from 'react';

const TermSection = ({title, img, points, index }) => {
    const  isSectionEven = index % 2 !== 0;
    return (
        <section className={`w-full h-full bg-white p-10 flex  ${isSectionEven ? 'flex-row-reverse' : ''} `}>
                        <div className='w-full flex flex-col gap-5 '>
                            <h2 className='text-secondary-400/90 text-6xl tracking-wide font-semibold pt-20 whitespace-pre-line'>{title}</h2>
        
                            <div className={`${index === 0 ? 'flex flex-col' : 'grid grid-cols-2'} gap-4 p-6`}>
                                {points.map((point, index, arr) => {
                                    const isLast = index === arr.length - 1;
                                    const isOdd = arr.length % 2 !== 0;
                                    const spanFull = isLast && isOdd;
                                    return (
                                        <div key={index} className={`bg-white border  rounded-xl p-5 hover:shadow-sm transition ${spanFull ? 'col-span-2' : ''}`}>
                                            <div className="text-3xl font-bold text-blue-600 mb-2 flex justify-between items-center">
                                                <span>0{index + 1}</span>
                                            </div>
                                            <p className="text-secondary-400/70">{point.text}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-center select-none'>
                            <img src={img} alt={title} className='w-full object-contain' draggable={false} />
                        </div>
        </section>
    );
};

export default TermSection;