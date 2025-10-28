import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import SignUp from './SignUp';
import Login from './Login';
import Title from '../Title';
import { corolaCross } from '../../assets/cars';

const AuthContainer = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const formWrapperRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                formWrapperRef.current,
                { opacity: 0, y: -100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                }
            );
        });

        return () => ctx.revert(); // Cleanup on unmount
    }, [isSignUp]);

    const handleChangeForm = () => {
        const tl = gsap.timeline();

        // Fade out
        tl.to(formWrapperRef.current, {
            opacity: 0,
            y: 100,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                setIsSignUp((prev) => !prev); // switch form AFTER fade-out
            },
        });
    };

    return (
        <div className="auth-container w-full h-screen relative overflow-y-hidden">
            <div className="w-full px-7 py-5">
                <Title title="Rentro" className="text-4xl font-bold " />
            </div>

            {/* Background Repeating Title */}
            <div className="w-full h-full flex items-center justify-start gap-5 overflow-hidden mt-24 select-none opacity-60">
                {Array.from({ length: 5 }).map((_, index) => <Title key={`heading-${index}`} title="Rentro" className="text-7xl font-bold -ml-5 text-netural-700 mr-5" />)}
            </div>

            {/* Background Car */}
            <img src={corolaCross} draggable={false} alt="car" className="z-10 w-1/2 h-auto object-cover absolute left-7 bottom-10 select-none" />

            {/* Animated Form */}
            <div className="w-full h-full flex items-center justify-end absolute right-20 top-0 px-10 prespective-1000">
                <div ref={formWrapperRef} className="w-5/12 mt-5 bg-white rounded-lg shadow-lg flex-col px-7 py-5">
                    <div className="w-full flex flex-col items-start justify-start">
                        <h2 className="text-2xl font-semibold text-netural-700">
                            {isSignUp ? 'Welcome to Rentro!' : 'Welcome Back!'}
                        </h2>
                        <h3 className="text-sm mt-1 font-normal text-secondary-300">
                            {isSignUp
                                ? "Let's get you on the road. Sign up to explore and book cars anytime, anywhere."
                                : 'Please log in to your account.'}
                        </h3>
                    </div>

                    {/* Actual Form */}
                    {isSignUp ? <SignUp /> : <Login />}

                    <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500 font-medium">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className='w-full flex justify-center items-center'>
                        <button
                            className="w-fir text-center py-1 text-sm text-netural-500 font-semibold hover:text-netural-700 hover:underline"
                            onClick={handleChangeForm} >
                            {isSignUp ? 'Have an account? Log in' : "Don't have an account? Sign up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;
