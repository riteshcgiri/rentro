import carsData from '../components/carsData';
import {PatternOne, PatternTwo} from '../assets/svgs/index'
import reviews from './reviews';
const adOne = { 
    id : 0,
    heading: 'The Best Platform for Car Rental',
    desc: 'Ease of doing a car rental safely and reliably. Of course at a low price.',
    headingOpen : 'Sports car with the best design and acceleration',
    descOpen: 'Safety and comfort while driving a futuristic and elegant sports car',
    textColor: 'text-white',
    btn: {
        btnTitle: 'Rental Car',
        link: '/rental-car',
        bgColor: 'bg-blue',
    },
    img: carsData[0]?.imgs?.mainImage,
    coverOne: carsData[0]?.imgs?.coverImg1,
    coverTwo: carsData[0]?.imgs?.coverImg2,
    pattern : PatternOne,
    fullData: {...carsData[0]},
    isLiked : true,
    reviwsCount :Object.keys({...reviews}).length,
    reviews : reviews,
    
};

const adTwo = {
    id : 1,
    heading: 'Easy way to rent a car at a low price',
    desc: 'Providing cheap car rental services and safe and comfortable facilities.',
    headingOpen : 'Sports car with the best design and acceleration',
    descOpen: 'Safety and comfort while driving a futuristic and elegant sports car',
    textColor: 'text-white',
    btn: {
        btnTitle: 'Rental Car',
        link: '/rental-car',
        bgColor: 'bg-sky',
    },
   img: carsData[0]?.imgs?.mainImage,
    coverOne: carsData[0]?.imgs?.coverImg1,
    coverTwo: carsData[0]?.imgs?.coverImg2,
    pattern : PatternTwo,
    fullData: {...carsData[1]},
    isLiked : true,
    reviwsCount : reviews.length,
    reviews : reviews,
};
    



export { adOne, adTwo };