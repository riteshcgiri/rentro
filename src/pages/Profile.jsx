import React, { useState, useEffect } from 'react';
import { user1 } from '../assets/users';
import { Austrian, Farari, LemboAve, MgZsNew, MgZxEx, nissanGTR, nissanGTR2 } from '../assets/cars';
import { Menu } from '../assets/svgs/index'
import { Bell, MessageCircle, UserPen, Globe, NotepadText, UserRoundCheck, HandCoins, MapIcon, Users, X, ChevronRight, PlusCircle, Clock, } from 'lucide-react'
import { useForm } from 'react-hook-form';
import profileSections from '../Db/profileUpdate';
import Form from '../components/Forms/Form';
import tokenConfig from '../api/tokenConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../redux/slices/notificationSlice';
import Verified from '../components/Verified';
import TransactionCard from '../components/TransactionCard';
import SpinnerLoader from '../components/Loaders/SpinnerLoader';
import RecentBookings from '../components/Bookings/RecentBookings';
import {selectUserId, selectUser, selectToken} from '../redux/slices/authSlice'



const Profile = ({ error }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isWalletTxnLoading, setIsWalletTxnLoading] = useState(false);

    const [userData, setUserData] = useState({});
    const [txnData, setTxnData] = useState([]);
    const { register, handleSubmit, formState: { errors }, getValues, setValue, reset, watch } = useForm();
    const userId =  useSelector(selectUserId) || JSON.parse(localStorage.getItem('rentroUserId'));
    const token = useSelector(selectToken) || JSON.parse(localStorage.getItem('rentroToken'));
    const user = useSelector(selectUser);



    const handleMenuOption = () => setIsMenuOpen(prev => !prev)
    const handleEditProfileOption = () => {
        setIsEditable(prev => !prev);
        setActiveSection(null);
        setIsMenuOpen(false)
    }

    const greetings = () => {
        const hour = new Date().getHours()
        if (hour <= 12 && hour >= 4) return 'Good Morning'
        else if (hour >= 12 && hour <= 15) return 'Good Afternoon'
        else if (hour >= 16 && hour <= 21) return 'Good Evening'
        else if (hour >= 22 && hour <= 3) return 'Good Night'


    }



    const transformUserData = (data) => {
        return {
            ...data,
            emergencyContact: {
                name: data.emergencyName,
                phone: data.emergencyContact,
                relation: data.relation
            },
            address: {
                house: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                pin: data.pinCode
            },
            socialLinks: {
                instagram: data.instaLink,
                facebook: data.facebookLink,
                twitter: data.twitterLink,
                linkedin: data.linkedinLink
            },
            licenceImg: data.licenseImg ? data.licenseImg[0] : null

        }
    }


    // Save User Details
    const onSave = async (section) => {
        const sectionFields = section.fields.map(field => field.label);
        const sectionValues = {};

        sectionFields.forEach(field => sectionValues[field] = getValues()[field]);
        const transformedData = transformUserData(sectionValues);
        setIsLoading(true)

        try {
            // const res = await axios.put(`/users/profile/${userId}`, transformedData, {headers : { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }});
            const res = await tokenConfig.put(`/users/profile/${userId}`, transformedData);

            console.log("Profile updated successfully:", res.data);
            reset(res.data);
            dispatch(addNotification({ message: 'Profile updated successfully!', type: 'success' }));
            setIsLoading(false);
            setTimeout(() => {
                setActiveSection(null);
                setIsEditable(false);
                reset();
            }, 1000);
        } catch (error) {
            setIsLoading(true);
            dispatch(addNotification({ message: `❌ Error updating profile! Error :${error.status}`, type: 'error' }));
            console.log("❌ Error updating profile:", error);
            setIsLoading(false);
        }
    };


    // fill user details
    useEffect(() => {
      const checkUserDetails = () => {
             if (user) {
            const userInfo = {
                ...user,
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                gender: user.gender || '',
                emergencyName: user?.emergencyContact?.name || '',
                emergencyContact: user?.emergencyContact?.phone || '',
                relation: user?.emergencyContact?.relation || '',
                address: user?.address?.house || '',
                city: user?.address?.city || '',
                state: user?.address?.state || '',
                country: user?.address?.country || '',
                pinCode: user?.address?.pin || '',
                instaLink: user?.socialLinks?.instagram || '',
                facebookLink: user?.socialLinks?.facebook || '',
                twitterLink: user?.socialLinks?.twitter || '',
                linkedinLink: user?.socialLinks?.linkedin || '',
                licenseNumber: user?.licenseNumber || '',
                dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
                licenseImg: user?.licenseImg || '',

            }
            setUserData(userInfo);
            reset(userInfo);
        }
        }

        if(user) checkUserDetails()
       

    }, [user]);

    // fetch user wallet transactions

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsWalletTxnLoading(true)
                const res = await tokenConfig.get(`/transactions/${userId}`);
                if (res.status === 200) {
                    setTxnData(res.data);
                    setIsWalletTxnLoading(false)

                    dispatch(
                        addNotification({
                            message: `Transactions Loaded Successfully`,
                            type: "success",
                        })
                    );
                }
                // console.log(res.data); 
            } catch (error) {
                dispatch(
                    addNotification({ message: `Failed to Fetch Transactions with Error Code : ${error.response?.status || error.message}`, type: "error", })
                );
                setIsWalletTxnLoading(false)
            }
            finally {
                setIsWalletTxnLoading(false)

            }
        };

        if (userId) fetchTransactions();
    }, [userId, dispatch]);



    const calculateAge = (dob) => {
        if (!dob) return null; // guard for missing dob
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // if birthday hasn’t occurred yet this year → subtract 1
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };


    const actionCards = [
        { heading: 'Personal Information', textColor: 'text-green-600', bgColor: 'bg-green-300/40', icon: <UserPen strokeWidth={1.5} className='w-20 h-20 text-green-600' />, editHandle: () => { setActiveSection(1); isEditable && setIsEditable(false); } },
        { heading: 'Billing Information', textColor: 'text-blue-600', bgColor: 'bg-blue-300/40', icon: <MapIcon strokeWidth={1.5} className='w-20 h-20 text-blue-600' />, editHandle: () => { setActiveSection(2); isEditable && setIsEditable(false); } },
        { heading: 'Social Links', textColor: 'text-purple-600', bgColor: 'bg-purple-300/40', icon: <Globe strokeWidth={1.5} className='w-20 h-20 text-purple-600' />, editHandle: () => { setActiveSection(3); isEditable && setIsEditable(false); } },
        { heading: 'Documents', textColor: 'text-amber-600', bgColor: 'bg-amber-300/40', icon: <NotepadText strokeWidth={1.5} className='w-20 h-20 text-amber-600' />, editHandle: () => { setActiveSection(4); isEditable && setIsEditable(false); } },
    ];

    const recentBookings = [
        {
            id : 1,
            img : nissanGTR,
            name : 'Nissan GT-R',
            type : 'Sport',
            date : new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short"}),
            price : 8000
        },
        
        {
            id : 2,
            img : Farari,
            name : 'Nissan GT-R',
            type : 'Sport',
            date : new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short"}),
            price : 10000
        },
        {
            id : 3,
            img : MgZxEx,
            name : 'Nissan GT-R',
            type : 'Sport',
            date : new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short"}),
            price : 2000
        },
        {
            id : 4,
            img : LemboAve,
            name : 'Nissan GT-R',
            type : 'Sport',
            date : new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short"}),
            price : 5000
        },
        {
            id : 5,
            img : MgZsNew,
            name : 'Nissan GT-R',
            type : 'Sport',
            date : new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short"}),
            price : 8000
        },

    ]

    return (
        <div className="profile-page p-10">
            <section className='w-full  flex gap-3'>
                <div className='w-3/4 min-h-screen rounded-lg flex flex-col justify-start gap-b-2 items-center overflow-hidden'>

                    {!user?.isVerified && <Verified user={userData} activeSection={activeSection} isEditable={isEditable} />}


                    {/* Action Cards */}
                    <div className={`w-full h-full flex flex-col rounded-lg transition-all duration-300 overflow-hidden bg-white  ${isEditable ? " p-5 max-h-[2000px]" : "max-h-0 opacity-0"} `}>
                        {/* <h2 className='text-lg font-semibold'>Edit User</h2> */}
                        <div className='w-full flex justify-end  items-center mb-2 '>
                            <div className=' bg-red-300/30 hover:bg-red-300/50 group p-3 rounded-full transition hover:scale-105 cursor-pointer' onClick={() => { setIsEditable(false); setActiveSection(null); }}>
                                <X className='w-4 h-4  cursor-pointer text-red-400/80 group-hover:text-red-400 ' role="presentation" />
                            </div>
                        </div>
                        <div className={`w-full h-[87vh] relative grid grid-cols-2 gap-7 grid-rows-2 transition-all duration-300 bg-white p-5`}>
                            {actionCards.map((actionCard, index) =>
                                <div key={index} role="presentation" autoComplete="off" onClick={() => actionCard.editHandle()} className={`w-full h-full cursor-pointer hover:scale-105 focus:scale-105 outline-none transition-all duration-300 select-none shadow-sm rounded-lg flex justify-center items-center mt-2 flex-col py-5 ${actionCard.bgColor}`}>
                                    <div className='flex-1 p-3'>{actionCard.icon}</div>
                                    <div className="text-center pointer-events-none flex-1 flex flex-col justify-center items-center" autoComplete="off" role="presentation"  >
                                        <h2 className={`text-xl font-semibold tracking-wide ${actionCard.textColor}`} autoComplete="off" role="presentation"  >{actionCard.heading}</h2>
                                        <p className="text-sm mt-2 text-gray-500" autoComplete="off" role="presentation"  >Update your personal information</p>
                                    </div>
                                </div>
                            )}
                        </div>



                    </div>
                    {/* Forms */}
                    <div className={`w-full flex flex-col items-center transition-all duration-300 ${activeSection !== null && activeSection !== undefined ? "max-h-[2000px]" : "max-h-0 opacity-0"}`}>

                        {profileSections.map(section => (
                            activeSection === section.step && (
                                <Form
                                    key={section.id}
                                    onSave={onSave}
                                    onClose={handleEditProfileOption}
                                    section={section}
                                    register={register}
                                    setValue={setValue}
                                    getValues={getValues}
                                    watch={watch}
                                    errors={errors}
                                    isLoading={isLoading}
                                />
                            )
                        ))}


                    </div>
                    
                    {/* Transactions */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 bg-transparent rounded-lg gap-3 w-full h-fit ${activeSection ? 'hidden' : ''}`}>
                        {/* Wallet History */}
                        <div className="w-full h-fit bg-white rounded-xl p-6 flex flex-col">
                            <div className="flex justify-between items-center group text-secondary-500/70 pb-3 mb-4 cursor-pointer">
                                <h2 className="font-semibold text-md ">Wallet History</h2>
                                <div className=' text-sm font-medium flex gap-1 text-netural-500 hover:text-netural-600 cursor-pointer items-center justify-center'>
                                    <span>View All </span>
                                </div>
                            </div>
                            {/* Transaction Card */}
                            <div className='flex flex-col gap-3'>
                                {
                                    txnData?.filter((txn) => txn.mode === 'wallet') <= 0 ?
                                        <div className=" w-full h-56  flex flex-col gap-2 justify-center items-center  text-netural-500">
                                            <HandCoins strokeWidth={1.5} className='w-16 h-16' />
                                            <h2 className='font-semibold '>No Transactions Found!</h2>
                                        </div>
                                        :
                                        (
                                            isWalletTxnLoading ?
                                                <div className=" w-full h-56  flex flex-col gap-5 justify-center items-center text-netural-600">
                                                    <SpinnerLoader width={40} className={'stroke-netural-500 fill-transparent'} />
                                                    <h2 className='font-semibold '>Loading...</h2>
                                                </div>
                                                :
                                                txnData?.filter((txn) => txn.mode === 'wallet').slice(-2).map((txn) => (<TransactionCard key={txn._id} txn={txn} />))
                                        )
                                }

                            </div>
                        </div>
                        {/* Recent Bookings */}
                        <div className='w-full h-full bg-white rounded-xl  py-6 px-5 row-span-2 overflow-hidden'>
                            <div className=' flex items-center justify-between'>
                                <h2 className='text-md text-secondary-500/70 font-semibold'>Recent Trips</h2>
                                <div className=' text-sm font-medium flex gap-1 text-netural-500 hover:text-netural-600 cursor-pointer items-center justify-center'>
                                    <span>View All </span>
                                </div>
                            </div>
                            <div className='w-full mt-5 flex flex-col gap-3 p-3'>
                               {
                                recentBookings.map((booking => <RecentBookings key={booking.id} booking={booking} />))
                               }
                               
                                
                            </div>

                        </div>
                        <div className="w-full h-fit bg-white rounded-xl p-6 flex flex-col">
                            <div className="flex justify-between items-center group text-secondary-500/70 pb-3 mb-4 cursor-pointer">
                                <h2 className="font-semibold text-md ">Transaction History</h2>
                                <div className=' text-sm font-medium flex gap-1 text-netural-500 hover:text-netural-600 cursor-pointer items-center justify-center'>
                                    <span>View All </span>
                                </div>
                            </div>
                            {/* Transaction Card */}
                            <div className='flex flex-col gap-3'>
                                {
                                    txnData?.filter((txn) => txn.mode !== 'wallet').length <= 0 ?
                                        <div className=" w-full h-56  flex flex-col gap-2 justify-center items-center  text-netural-500">
                                            <HandCoins strokeWidth={1.5} className='w-16 h-16' />
                                            <h2 className='font-semibold '>No Transactions Found!</h2>
                                        </div>
                                        :
                                        (
                                            isWalletTxnLoading ?
                                                <div className=" w-full h-56  flex flex-col gap-5 justify-center items-center text-netural-600">
                                                    <SpinnerLoader width={40} className={'stroke-netural-500 fill-transparent'} />
                                                    <h2 className='font-semibold '>Loading...</h2>
                                                </div>
                                                :
                                                txnData?.filter((txn) => txn?.mode !== 'wallet')?.slice(-2)?.map((txn) => (<TransactionCard key={txn?._id} txn={txn} />))
                                        )
                                }

                            </div>
                        </div>
                    </div>




                </div>
                <div className='w-1/4 min-h-screen bg-white rounded-xl overflow-hidden'>

                    <div className={`w-full`}>
                        {/* Profile Update Options */}
                        <div className={`w-full flex justify-between items-center p-5`}>
                            <h2 className='w-1/3 text-md font-medium text-secondary-300'>Your Profile</h2>
                            <div className={`relative w-2/3 flex justify-end items-center gap-3`} >
                                <button className='appearance-none w-8 h-8 rounded-md hover:bg-secondary-200/30 focus:bg-secondary-200/30 p-1 cursor-pointer focus:outline-none' onClick={() => handleMenuOption()} aria-haspopup="true" aria-expanded={isMenuOpen} aria-controls="profile-menu">
                                    <img src={Menu} alt="" className='h-full w-full' role='button' tabIndex={2} />
                                </button>
                                <div className={`w-full ${isMenuOpen ? '' : 'hidden'} absolute top-full z-[3] right-0 bg-white text-secondary-300  shadow-xl rounded-md p-2`}>
                                    <button className='w-full text-left text-sm rounded-md py-2 px-2 hover:bg-secondary-200/30 focus:bg-secondary-200/30 focus:outline-none' onClick={() => handleEditProfileOption()}>Edit Profile</button>
                                    <button className='w-full text-left text-sm rounded-md py-2 px-2 hover:bg-secondary-200/30 focus:bg-secondary-200/30 focus:outline-none' onClick={() => handleChangePassword()}>Change Password</button>
                                    <button className='w-full text-left text-sm rounded-md py-2 px-2 hover:bg-secondary-200/30 focus:bg-secondary-200/30 focus:outline-none' onClick={() => handleAccountManagement()}>Account Managment</button>
                                    <button className='w-full text-left text-sm rounded-md py-2 px-2 hover:bg-secondary-200/30 focus:bg-secondary-200/30 focus:outline-none' onClick={() => handleChangeLanguage()}>Change Language</button>
                                    <button className='w-full text-left text-sm rounded-md py-2 px-2 hover:bg-secondary-200/30 focus:bg-secondary-200/30 focus:outline-none' onClick={() => handleSettings()}>Settings</button>
                                </div>
                            </div>
                        </div>
                        <div className={`w-full  flex flex-col items-center justify-center  `}>
                            {/* user profile */}
                            <div className='w-32 h-32 rounded-full flex items-center justify-center relative   border-4 border-green-400'>
                                <img src={user1} alt="User" className='w-full h-full object-cover p-1 rounded-full' />
                                <div>
                                    {userData?.isVerified ? <UserRoundCheck className='absolute bottom-1 right-1 w-6 h-6 text-green-400 fill-green-400 bg-white rounded-full p-1 border-2 border-green-400' /> : null}
                                </div>
                            </div>
                            {/* user Name & username */}
                            <div className={` w-10/12 flex flex-col items-center mt-2  gap-0 text-secondary-400 `}>
                                <h2 className='tracking-wide  text-xl font-bold leading-tight text-secondary-400-500 flex items-center justify-center gap-2'>{/*greetings()*/} Hello {(userData?.username)?.trim().split(/\s+/)[0] || ''} </h2>
                                <h2 className='text-sm leading-tight text-secondary-400-500'>@{(userData?.username || '').toLowerCase().replace(/\s+/g, '')}</h2>
                            </div>
                            {/* User Details */}
                            <div className={`w-10/12 flex bg-secondary-300/10 font-medium text-xs py-3 px-8 shadow-sm rounded-lg justify-center items-center mt-4 gap-10 text-secondary-400`}>
                                <h2 >{(userData?.gender || 'Not Gender').charAt(0).toUpperCase() + (userData?.gender || 'Not Gender').slice(1)}</h2>
                                <h2>{(userData?.dob ? calculateAge(userData?.dob) + ' Y/o' : 'Set Age')}</h2>
                                <h2>{userData.state === 'Delhi NCR' ? 'Delhi' : (userData?.state || 'Set State')}</h2>
                            </div>
                            {/* User Buttons  */}
                            <div className='w-10/12 flex gap-10 mt-5 justify-evenly text-secondary-300'>
                                <button className='w-10 h-10 rounded-full border-2 border-secondary-200 group cursor-pointer p-2 flex justify-center items-center hover:border-netural-600'>
                                    <MessageCircle className='w-[80%] h-[80%] focus:outline-netural-600 object-cover group-hover:fill-netural-600 group-hover:text-netural-600 group-focus:fill-netural-600 group-hover:text-transparent group-focus:text-transparent    ' />
                                </button>
                                <button className='w-10 h-10 rounded-full border-2 border-secondary-200 group cursor-pointer p-2 flex justify-center items-center hover:border-netural-600'>
                                    <Bell className='w-[80%] h-[80%] focus:outline-netural-500  object-cover group-hover:fill-netural-600 group-focus:fill-netural-600 group-hover:text-netural-600 group-hover:text-transparent group-focus:text-transparent   ' />
                                </button>
                                <button className='w-10 h-10 rounded-full border-2 border-secondary-200 group cursor-pointer p-2 flex justify-center items-center hover:border-netural-600'>
                                    <Users className='w-[80%] h-[80%] focus:outline-netural-500  object-cover group-hover:fill-netural-600 group-focus:fill-netural-600 group-hover:text-netural-600 group-hover:text-transparent group-focus:text-transparent   ' />
                                </button>
                            </div>
                            {/* wallet recharge */}
                            <div className="w-10/12 mt-7 bg-secondary-300/10 rounded-xl px-5 py-4 flex flex-col items-center gap-3">
                                <p className="text-sm text-secondary-400 font-bold">Wallet Balance</p>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-netural-500 to-netural-800 text-transparent bg-clip-text">₹ {userData ? userData?.walletBalance?.toLocaleString("en-IN") : 0}.00</h3>

                                <div className=" flex bg-gradient-to-r from-netural-600/90 to-netural-800/90 rounded-lg text-white">
                                    <button className=" flex-1 rounded-lg px-8 py-2 hover:bg-netural-500/30 flex items-center gap-1">
                                        <PlusCircle className="w-4 h-4" /> Add
                                    </button>
                                    <button className=" flex-1 rounded-lg px-5 py-2 hover:bg-netural-500/30 hover:bg-gray-300 flex items-center gap-1">
                                        <Clock className="w-4 h-4" /> History
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </section>
        </div>
    );
};

export default Profile;