import React, { useEffect, useRef, useState } from 'react';
const typeStyles = {
    success: { bg: 'bg-green-500', stroke: 'text-green-400' },
    error: { bg: 'bg-red-500', stroke: 'text-red-400' },
    warning: { bg: 'bg-yellow-500', stroke: 'text-yellow-400' },
    info: { bg: 'bg-blue-500', stroke: 'text-blue-400' },
};

const Notification = ({ id, message, type = 'info', onClose = () => { }, duration = 5000, sound = false }) => {

    const [progress, setProgress] = useState(0);
    const [animateOut, setAnimateOut] = useState(false);

    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!message) return;
        if (sound) playSound();
        startTimer();
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [message]);

    const startTimer = () => {
        const increment = 100 / (duration / 100);
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current);
                    return 100;
                }
                return prev + increment;
            });
        }, 100);

        timeoutRef.current = setTimeout(() => handleClose(), duration);
    };

    const handleClose = () => {
        setAnimateOut(true);
        setTimeout(() => onClose(id), 300);
    };

    const playSound = () => {
        const audio = new Audio('../../assets/sounds/notification.mp3');
        audio.play().catch(console.error);
    };

    if (!message) return null;

    const { bg, stroke } = typeStyles[type] || typeStyles.info;

    return (
        <div role="alert" aria-live="assertive" className={`notification w-fit p-4 rounded-lg text-white shadow-lg transition-all duration-300 ${bg} ${animateOut ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <div className="flex justify-between items-center gap-4">
                <img src="" alt="" />
                <div className="flex-1">{message}</div>
                <button onClick={handleClose} className="relative w-8 h-8">
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                        <path
                            className="text-white opacity-20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32"
                        />
                        <path
                            className={stroke}
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="100, 100"
                            strokeDashoffset={100 - progress}
                            d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32"
                        />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Notification;
