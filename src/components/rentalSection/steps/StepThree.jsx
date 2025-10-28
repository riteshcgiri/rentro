import { useState } from 'react';
import InputText from '../../Inputs/InputText';
import QRCode from "react-qr-code";
import { mc, paytm, visa, wallet, phonePe } from '../../../assets/logos/index'
import FormHead from '../FormHead';
import PaymentMethod from './PaymentMethod';
import Processing from '../../Processing';
import { useDispatch } from 'react-redux';
import {addNotification} from '../../../redux/slices/notificationSlice';

const StepThree = ({ stepCount, stepCurrent, stepDesc, stepTitle, payableAmount, setPayableAmount }) => {
    const [userData, setUserData] = useState({})
    const [walletBalance, setWalletBalance] = useState(0)
    const [tempWalletBalance, setTempWalletBalance] = useState(0)
    const [paymentOption, setPaymentOption] = useState('creditCard')
    const [showWalletRechargeOption, setShowWalletRechargeOption] = useState(false)
    const [showQRCode, setShowQRCode] = useState(false)
    const [QRCodeLoading, setQRCodeLoading] = useState(false)
    const [isQRBtnHidden, setIsQRBtnHidden] = useState(false)
    const [checkedCard, setCheckedCard] = useState(false)
    const [checkedUPI, setCheckedUPI] = useState(false)
    const [checkedWallet, setCheckedWallet] = useState(false)


    const dispatch = useDispatch();
    const handleInputBlur = (id, val) => setUserData(prev => ({ ...prev, [id]: val }))
    const handleShowRecharge = (val) => setShowWalletRechargeOption(val || !showWalletRechargeOption)
    const generateQR = () => {
        setQRCodeLoading(true)
        setIsQRBtnHidden(true)
        setTimeout(() => {
            setQRCodeLoading(false)
            payableAmount > 0 && payableAmount !== null && payableAmount !== undefined ? setShowQRCode(true) : dispatch(addNotification({ message: 'Something Went Wrong!! Please Try Again', type: 'warning', duration: 4000, sound: true,}));

        }, 3000);
    }
    const handlePaymentType = (type) => {
        if (type === 'creditCard') {
            setPaymentOption('creditCard')
            setCheckedCard(true)
            setCheckedUPI(false)
            setCheckedWallet(false)
            return type;
        }
        else if (type === 'paytm') {
            setPaymentOption('paytm')
            setCheckedCard(false)
            setCheckedUPI(true)
            setCheckedWallet(false)
            return type;

        }
        else if (type === 'wallet') {
            setPaymentOption('wallet')
            setCheckedCard(false)
            setCheckedUPI(false)
            setCheckedWallet(true)
            return type;
        }

    }

    const handleAddWalletAMount = () => {
        setWalletBalance(prev => Number(prev) + Number(tempWalletBalance))
        dispatch(addNotification({
            message: `₹ ${tempWalletBalance} added to your wallet successfully!!!`,
            type: 'success',
            duration: 4000,
            sound: true,
        }));
        
        setTempWalletBalance(0)
        setShowWalletRechargeOption(false)

    }

    const handleCancle = () => {
        dispatch(addNotification({
            message: 'Transaction Cancelled!!!',
            type: 'warning',
            duration: 4000,
            sound: true,
        }));
        
        handleShowRecharge(false)

    }
    // useEffect(() => {
    //     // console.log(userData)
    //     // setWalletBalance(10000)
    // }, [checkedCard, checkedUPI, checkedWallet])



    const creditInputs = [
        {
            "id": 1,
            inputTpye: 'text',
            inputId: 'cardNumber',
            label: 'Card Number',
            placeholder: 'Card Number',
            className: 'bg-white inputSpinnerHider',
            handleInputBlur: handleInputBlur,
            isCard: true
        },
        {
            "id": 2,
            inputTpye: 'text',
            inputId: 'expirydate',
            label: 'Expiration Date',
            placeholder: 'MM/YY',
            className: 'bg-white',
            handleInputBlur: handleInputBlur,
            isCard: true
        },
        {
            "id": 3,
            inputTpye: 'text',
            inputId: 'cardHolder',
            label: 'Card Holder Name',
            placeholder: 'Card Holder Name',
            className: 'bg-white',
            handleInputBlur: handleInputBlur,
        },
        {
            "id": 4,
            inputTpye: 'password',
            inputId: 'cvv',
            label: 'CVV',
            placeholder: 'CVV / CVC',
            min: 3,
            max: 3,
            className: 'bg-white inputSpinnerHider',
            handleInputBlur: handleInputBlur,
        }

    ]
    return (
        <div className="w-full h-fit bg-white rounded-lg p-5 flex flex-col gap-4">
            <FormHead stepTitle={stepTitle} stepCount={stepCount} stepCurrent={stepCurrent} stepDesc={stepDesc} />
            {/* Payment Type 1 */}
            <div className={`mt-3 bg-gray-200/50 p-5 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${paymentOption === 'creditCard' ? 'h-fit' : ' h-16'}`} style={{ maxHeight: paymentOption === 'creditCard' ? '500px' : '80px' }} onClick={() => handlePaymentType('creditCard')}>
                <PaymentMethod payImg_1={visa} payImg_2={mc} labelName={'Credit Card'} payeeName={'paymentMethod'} payeeId={'creditCard'} handlePaymentType={handlePaymentType} isChecked={checkedCard} />
                <div className="grid grid-cols-2 gap-4 w-full">
                    {
                        creditInputs.map((item) => <InputText key={item.id} inputType={item.inputTpye} inputId={item.inputId} label={item.label} placeholder={item.placeholder} className={item.className} min={item?.min} max={item?.max}  handleInputBlur={handleInputBlur} isCard={item.isCard} />)
                    }
                   
                </div>
            </div>
            {/* Payment Type 2 */}
            <div className={` bg-gray-200/50 p-5 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${paymentOption === 'paytm' ? 'h-fit' : ' h-16'}`} style={{ maxHeight: paymentOption === 'paytm' ? '500px' : '80px' }} onClick={() => handlePaymentType('paytm')}>
                <PaymentMethod payImg_1={phonePe} classNameImg_1={true} payImg_2={paytm} labelName={'Net Banking/UPI'} payeeName={'paymentMethod'} payeeId={'paytm'} handlePaymentType={handlePaymentType} isChecked={checkedUPI} />
                <div className="">
                    <div className={`flex flex-1 justify-start items-end gap-4 transition-all duration-500 ease-in-out`}>
                        <InputText inputType={'text'} inputId={'VPA'} label={'VPA/UPI ID'} placeholder={'0123456789@upi'} headClassName={'w-full'} button={'Request Payment'} className={'bg-white inputSpinnerHider '} handleInputBlur={handleInputBlur} />
                        {/* <button className='border-2 border-netural-500 text-netural-500 hover:bg-netural-600 hover:scale-95 duration-100 focus:outline-netural-500 focus:outline-2 focus:bg-netural-400 py-[18px] px-4 w-1/3 hover:text-white font-semibold rounded-md' onClick={() => handleAddWalletAMount()}>Proceed</button> */}
                    </div>
                    <h2 className='mt-7 font-semibold text-center'>OR</h2>
                    <div className={`flex justify-center items-center gap-2 ${showQRCode ? 'mt-3' : 'mt-5'}`}>
                        <button className={`w-fit border-2 border-netural-500 text-netural-500 hover:text-white hover:bg-netural-500 duration-150 px-3 py-3 rounded-md font-semibold ${isQRBtnHidden ? 'hidden' : ''}`} onClick={() => generateQR()}>Generate QR Code</button>
                        {
                            QRCodeLoading ?
                                <Processing /> :
                                <QRCode value={`upi://pay?pa=7065717084@ptsbi&pn=Ritesh%20%20Giri&am=${Number(payableAmount).toFixed(0)}&cu=INR`} bgColor='transparent' className={`rounded-sm w-40 h-40 ${showQRCode ? '' : 'hidden'}`} />
                        }
                    </div>

                </div>
            </div>
            {/* Payment Type 3 */}
            <div className={` bg-gray-200/50 p-5 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${paymentOption === 'wallet' ? 'h-fit' : ' h-16'}`} style={{ maxHeight: paymentOption === 'wallet' ? '500px' : '80px' }} onClick={() => handlePaymentType('wallet')} >

                <PaymentMethod payImg_1={wallet} labelName={'Wallet'} payeeName={'paymentMethod'} payeeId={'wallet'} handlePaymentType={handlePaymentType} isChecked={checkedWallet} />
                <div className={`mt-5 transition-all duration-500 ease-in-out`}>
                    <div className=' flex justify-between items-center font-semibold' >
                        <h2 className='font-bold text-lg text-secondary-300 '>Wallet Amount : {walletBalance.toLocaleString('en-IN')}.00 ₹</h2>
                        {
                            !showWalletRechargeOption ? <button className={` text-netural-500 py-2 px-4 rounded-md border-2 border-netural-500 hover:bg-netural-500 hover:text-white hover:scale-95 duration-75`} onClick={() => handleShowRecharge()} >Add Amount</button>
                                : <button className={` text-white py-2 px-4 rounded-full bg-error-500 hover:bg-error-600  hover:scale-95 duration-75`} onClick={() => handleCancle()} >Cancle</button>
                        }
                    </div>
                    <div className={`flex justify-start items-end gap-4 ${showWalletRechargeOption ? 'h-fit' : 'h-0 overflow-hidden'} transition-all duration-500 ease-in-out`}>

                        <InputText inputType={'number'} inputId={'walletAmount'} placeholder={'Enter Amount'} className={'bg-white inputSpinnerHider mt-0'} headClassName={'w-2/3'} setTempWalletBalance={setTempWalletBalance} handleInputBlur={handleInputBlur} />

                        <button className='bg-netural-500 hover:bg-netural-600 hover:scale-95 duration-100 focus:outline-netural-500 focus:outline-2 focus:bg-netural-400 py-[18px] px-4 w-1/3 text-white font-semibold rounded-md' onClick={() => handleAddWalletAMount()}>Proceed</button>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default StepThree;