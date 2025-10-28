import React, { useState } from 'react'
import { loaderMain, loaderSecondary, loaderOptional } from '../assets/videos/index'
const Loader = (loaderId) => {
    const [currentLoader, setCurrentLoader] = useState(loaderMain);
    /* 
    const [loaderIndex, setLoaderIndex] = useState(1);
       const loaders = [loaderMain, loaderSecondary, loaderOptional];
       React.useEffect(() => {
           if (loaderId !== undefined) {
                 setLoaderIndex(loaderId);
                 setCurrentLoader(loaders[loaderIndex]);
           } else {
                 setCurrentLoader(loaderMain);
           }
          }, [loaderId])
    */
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center z-30 fixed top-0 left-0 overflow-hidden bg-white/50 backdrop-blur-sm shadow-2xl shadow-white'>
            <div className='flex flex-col justify-center items-center gap-4 relative'>
                <h2 className='font-semibold text-xs text-secondary-500 text-center absolute top-6 leading-5'>Hang Tight!!</h2>
                <video src={currentLoader} autoPlay loop muted className=' w-[230px] object-cover rounded-lg'></video>
                <h2 className='font-semibold text-xs text-secondary-500 text-center absolute bottom-4 leading-5'>Warming up the engine… almost there!</h2>
            </div>
        </div>
    )
}

export default Loader