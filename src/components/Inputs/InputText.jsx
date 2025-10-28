import { useEffect, useState } from 'react';
import { mc, visa, rupay } from '../../assets/logos/index'
const InputText = ({ label, button, placeholder, className, inputType, inputId, isDisabled, handleApplyRefral, handleInputBlur, isCard, headClassName, setUserInputVal }) => {

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [cardType, setCardType] = useState('');

  const handleInputOnChange = (e, id) => {
    const value = e.target.value;
    const lowerId = id.toLowerCase();

    if (isCard) {
      // console.log(lowerId, value)
      const getOnlyDigits = (val, limit) => val.replace(/\D/g, "").slice(0, limit);

      if (lowerId === 'cvv') {
        setInputVal(getOnlyDigits(value, 3));
        return;
      } if (lowerId === 'expirydate') {
        const digits = getOnlyDigits(value, 4);
        setInputVal(digits.replace(/(\d{2})(\d{2})/, "$1/$2").trim());
        return;
      } if (lowerId === 'cardnumber') {
        const digits = getOnlyDigits(value, 16);
        setCardType(getCardType(digits));
        setInputVal(digits.replace(/(.{4})/g, "$1 ").trim());
        return
      }
    } else {
      setInputVal(value);
      // setTempWalletBalance(value)
    }
  }

  const getCardType = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (/^4/.test(cleaned)) return visa;
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return mc;
    if (/^6(?:0|52[12])/.test(cleaned)) return rupay;
    return '';
  };

  useEffect(() => {
    if(inputVal) setUserInputVal(inputId, inputVal)
  },[inputVal])

  return (
    <div className={`mt-5 ${headClassName}`}>
      {label && <label htmlFor={inputId} className='font-semibold'>{label}</label>}
      <div className={`bg-gray-200/50 px-7 py-1 rounded-lg mt-3 ${isInputFocused ? 'outline outline-netural-500 bg-netural-300/20' : ''} flex justify-start items-center ${className} ${isDisabled ? 'bg-green-300/20' : ''}`}>
        <input type={inputType} id={inputId} maxLength={(inputId).toLowerCase() === 'cvv' ? 3 : undefined || (inputId).toLowerCase() === 'expirydate' ? 5 : undefined} className=' appearance-none  flex-1 h-full bg-transparent py-4 outline-none' autoComplete='off' placeholder={isDisabled ? 'Coupne Activated!!!' : placeholder} value={inputVal} onChange={(e) => handleInputOnChange(e, inputId)} onFocus={() => setIsInputFocused(!isInputFocused)} onBlur={(e) => { setIsInputFocused(!isInputFocused); handleInputBlur && handleInputBlur(inputId, inputVal) }} disabled={isDisabled} />
        {getCardType !== '' ? isCard && <img alt='' src={cardType} className={`${cardType === rupay ? 'h-12' : ''}`} /> : ''}
        {button && <button className={` font-semibold px-3 py-2 rounded-md hover:text-netural-500 ${isButtonFocused ? ' text-netural-500 bg-netural-100' : ''}  outline-none ${isDisabled ? 'text-gray-400 hover:text-gray-400' : ''}`} onClick={() => handleApplyRefral(inputVal)} onFocus={() => setIsButtonFocused(!isButtonFocused)} onBlur={() => setIsButtonFocused(!isButtonFocused)} disabled={isDisabled}>{button ? button : ''}</button>}
      </div>
    </div>
  );
};

export default InputText;