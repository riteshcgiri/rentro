import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import tokenConfig from "../../api/tokenConfig";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../redux/slices/notificationSlice";
import { TriangleAlert, Unplug } from "lucide-react";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import { fetchCars } from "../../redux/slices/carsSlice";

const CarSection = ({ heading, filterOpen, handleRent }) => {
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
     
  const { data, loading, error } = useSelector((state) => state.carsSlice); 

    useEffect(() => {
        dispatch(fetchCars())

    }, [dispatch]);
    useEffect(()=> {
         if (loading) {
            setIsLoading(true)
        }
        else {
            setIsLoading(false)
            if (error) {
                dispatch(addNotification({message : error, type : 'error'}))
            }
            else{
                setCars(data)
                dispatch(addNotification({message : 'Cars Loaded', type : 'success'}))
            }
        }
    },[loading, error, data])
    return (
        <div className="mb-7">
            <div className="flex justify-between items-center px-5 py-5 text-sm font-semibold mt-4">
                <h2 className="text-secondary-300">{heading}</h2>
                <button className="text-netural-500 hover:scale-105 origin-bottom transition">
                    View All
                </button>
            </div>

            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center flex-col text-secondary-300 gap-3">
                    <SpinnerLoader width={36} className={'fill-transparent stroke-netural-500'} />
                    <h2>Few Inches away..</h2>
                </div>
            ) : (
                <div
                    className={`flex ${filterOpen ? "justify-center" : "justify-start"
                        } items-center flex-wrap gap-5 mt-3 relative perspective-1000`}
                >
                    {cars?.length > 0 ? (
                        heading === 'Popular Car' ?
                            cars?.slice(0, 4)?.map((car) => (
                                <CarCard key={car?._id} car={car} handleRent={handleRent} />
                            ))
                            : cars?.slice(4,12)?.map((car) => (
                                <CarCard key={car?._id} car={car} handleRent={handleRent} />
                            ))
                    ) : (
                        <div className="w-full h-full p-2 flex justify-center items-center">
                            <div className="w-1/5 h-40 flex items-center justify-center flex-col gap-3 bg-white rounded-xl font-medium text-lg text-secondary-300">
                                <Unplug strokeWidth={1.3} className=" w-12 h-12" />
                                <h2> Cars not found!</h2>
                            </div>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
};

export default CarSection;
