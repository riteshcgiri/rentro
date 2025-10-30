import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cars from "./components/carsData";
import Loader from './components/Loader';
import { adOne, adTwo } from './Db/adData';
import Landing from './components/Landing';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import CarSection from './components/carsSection/CarSection';
import FilterSetting from './components/filter/FilterSetting';
import RentalPage from './components/rentalSection/RentalPage';
import ShowcaseCar from './components/carsSection/ShowcaseCar';

// ---------------------------------------------------------
import { setPageLoading } from './redux/slices/loaderSlice';
import NotificationManager from './components/notifications/NotificationManager';
import { addNotification } from './redux/slices/notificationSlice';
import { setPriceRange } from './redux/slices/searchFilterSlice';
import Menu from './components/Navigation/Menu';
import PrintInvoicePage from './components/Bookings/BookingPrint';
import AuthContainer from './components/user/AuthContainer';
import Hero from './components/user/Hero';
import SpinnerLoader from './components/Loaders/SpinnerLoader';
import { selectLoggedIn, selectUserId, selectToken, logout, checkLoginStatus, setUser, selectUser } from './redux/slices/authSlice';
import tokenConfig from './api/tokenConfig';
import Policies from './pages/Policies';
import Terms from './pages/Terms';
import Podcast from './pages/Podcast';
import Partnership from './pages/Partnership';
import Profile from './pages/Profile';
import { set } from 'date-fns';
import CreateCar from './components/Admin/CreateCar';
// import BookingCalendar from './components/Bookings/BookingCalendar';


function App() {
    const [selectedCar, setSelectedCar] = useState({});
    const [showAd, setShowAd] = useState(false);
    const [showRentPage, setShowRentPage] = useState(false);
    const [rentalCar, setRentalCar] = useState({});
    const [userInputVal, setUserInputVal] = useState({});
    // const [user, setUser] = useState();
    const [error, setError] = useState(null);

    // ---------------------------------------------------------
    const dispatch = useDispatch();

    const isFilterOpen = useSelector((state) => state.searchFilterSlice.isFilterVisible);
    const isHomePageVisible = useSelector((state) => state.searchFilterSlice.isHomePageVisible);
    const { priceRange } = useSelector((state) => state.searchFilterSlice.searchOptions);
    const isLoading = useSelector((state) => state.loaderSlice.isPageLoading);
    const type = useSelector((state) => state.searchFilterSlice.searchOptions.type);
    const seatingCapacity = useSelector((state) => state.searchFilterSlice.searchOptions.seatingCapacity);
    const isLoggedIn = useSelector(selectLoggedIn);
    const userId = useSelector(selectUserId) || JSON.parse(localStorage.getItem('rentroUserId'));
    const userToken = useSelector(selectToken) || JSON.parse(localStorage.getItem('rentroToken'));
    const user = useSelector(selectUser) 
    


    const loaderViewer = (showAdVal = false) => {
        dispatch(setPageLoading(true));

        setTimeout(() => {

            if (showAdVal) {
                setShowAd(true);
            } else {
                setShowAd(false);
            }
            dispatch(setPageLoading(false));
        }, 2500);

    };


    const handleRent = useCallback((name) => {
        loaderViewer()
        setRentalCar(cars.filter(car => car.name === name.target.name));
        setShowRentPage(true);
    }, []);



    const handleShowAd = (id) => {
        loaderViewer(true)
        // setShowAd(true)
        if (id.target.classList.contains(0)) setSelectedCar({ ...adOne })
        else if (id.target.classList.contains(1)) setSelectedCar({ ...adTwo })
        else setSelectedCar({}), setShowAd(!true)
    }

    const handleHideAd = () => loaderViewer(false) 

    
    /*Timer to check if user is logged in or not*/ 
    useEffect(() => {
        const checkUserStatus = () => {
            setInterval(() => {
                dispatch(checkLoginStatus());
                if(!userId && !userToken) {
                    dispatch(logout())
                }
                // console.log('checked');
                checkUserStatus()
            }, 600000);
            // will check in every min
        }
        checkUserStatus();
    }, [])



    useEffect(() => {
        // give notification on page load
        dispatch(addNotification({ message: 'Welcome to Rentro!', type: 'success' })); dispatch(checkLoginStatus());

        const fetchUserDetails = async () => {
            try {
                const res = await tokenConfig.get(`/users/${userId}`);
                // console.log("User data:", res.data);
                dispatch(setUser(res.data))
                
            } catch (err) {
                console.error("❌ Full error object:", err); // full raw object
                setError(err.response ? err.response.data : 'Network error or no response from server');
                if (err.response && err.response.status === 401) {
                    dispatch(logout());
                    dispatch(addNotification({ message: 'Session expired. Please log in again.', type: 'error' }));
                } else {
                    dispatch(addNotification({ message: 'Failed to fetch user details. Please try again later.', type: 'error' }));
                }

            }
        };
        if (userId && userToken) {
            fetchUserDetails()
        }
        else {
            dispatch(logout())
        }
    
    }, [setUser, userId,]);

    return (
        isLoggedIn ?
            <>

                <NotificationManager />
                <div className='w-full font-jakarta bg-bgColor relative'>
                    <Header />
                    {/* <Hero /> //if not logged in */}
                    {isLoading && <Loader />}

                    <NotificationManager />
                    {/* <SpinnerLoader className={'stroke-green-500 fill-transparent'} /> */}
                   {<div className='flex relative '>
                        <div className={`${isFilterOpen ? 'w-1/6' : 'w-0'} ${isHomePageVisible ? 'w-1/6' : 'w-0'} bg-white overflow-hidden duration-100 transform translate-x-0`}>
                            <div className={`filter ${isFilterOpen ? '' : 'hidden'} text-secondary-300`}>
                                <FilterSetting filterHeading='TYPE' filterOption={type} className="select-none h-4 w-4 checked:border-transparent border checked:bg-netural-500 rounded-sm cursor-pointer" />
                                <FilterSetting filterHeading='CAPACITY' filterOption={seatingCapacity} className="select-none h-4 w-4 checked:border-transparent border checked:bg-netural-500 rounded-sm cursor-pointer" />
                                <div className='px-5 py-7'>
                                    <h2 className='text-secondary-400 text-xs'>PRICE</h2>
                                    <input type="range" className={`w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:w-2  [&::-webkit-slider-thumb]:h-2  [&::-webkit-slider-thumb]:-mt-0.5  [&::-webkit-slider-thumb]:appearance-none  [&::-webkit-slider-thumb]:bg-white  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]  [&::-webkit-slider-thumb]:rounded-full  [&::-webkit-slider-thumb]:transition-all  [&::-webkit-slider-thumb]:duration-150  [&::-webkit-slider-thumb]:ease-in-out  [&::-webkit-slider-thumb]:dark:bg-neutral-200  [&::-moz-range-thumb]:w-1  [&::-moz-range-thumb]:h-1  [&::-moz-range-thumb]:appearance-none  [&::-moz-range-thumb]:bg-white  [&::-moz-range-thumb]:border-4  [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:rounded-full  [&::-moz-range-thumb]:transition-all  [&::-moz-range-thumb]:duration-150  [&::-moz-range-thumb]:ease-in-out  [&::-webkit-slider-runnable-track]:w-full  [&::-webkit-slider-runnable-track]:h-1  [&::-webkit-slider-runnable-track]:bg-gray-100  [&::-webkit-slider-runnable-track]:rounded-full  [&::-webkit-slider-runnable-track]:dark:bg-netural-200  [&::-moz-range-track]:w-full  [&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-gray-100 [&::-moz-range-track]:rounded-full select-none`} id='filterRange' min={100} max={10000} step={100} value={priceRange} onChange={e => dispatch(setPriceRange(e.target.value))} />
                                    <label htmlFor='filterRange' className="text-xs text-secondary-500 select-none cursor-pointer">₹ {(priceRange * 1).toLocaleString()}</label>
                                </div>
                            </div>
                            <div className={`dashboard h-full px-3 py-7 ${isHomePageVisible ? '' : 'hidden'}`}>
                                <Menu />
                            </div>
                        </div>

                        {showRentPage ?
                            <RentalPage rentalCar={rentalCar} setUserInputVal={setUserInputVal} userInputVal={userInputVal} /> :
                            <div className='flex-1 px-12 py-7 '>
                              
                                <ShowcaseCar selectedCar={selectedCar} handleHideAd={handleHideAd} setSelectedCar={setSelectedCar} showAd={showAd} setShowAd={setShowAd} />
                               
                                <Landing handleShowAdContent={handleShowAd} setSelectedCar={setSelectedCar} showAd={showAd} setShowAd={setShowAd} />
                                <div className='mt-7'>
                                    <CarSection heading={'Popular Car'} carData={isFilterOpen || isHomePageVisible ? cars.slice(0, 3) : cars.slice(0, 4)} handleRent={handleRent} />
                                    <CarSection heading={'Recommended Car'} carData={isFilterOpen || isHomePageVisible ? cars.slice(3, 6) : cars.slice(4)} handleRent={handleRent} />
                                    <div className='flex justify-center mt-7'>
                                        <button className=' bg-netural-500 hover:scale-95 transition origin-bottom text-white px-7 py-2 rounded-md'>Show more car</button>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>} 
                    {/* <Terms />
                    <Policies />
                    <Podcast/>
                    <Partnership /> */}
                    {/* {user && <Profile error={error} />} */}
                    {/* <CreateCar /> */}
                    <Footer />
                </div>
            </>
            :
            <>

                <NotificationManager />
                <div className='w-full font-jakarta bg-bgColor relative'>
                    <AuthContainer />
                </div>
            </>
    )
}

export default App
