
import { EligibleCar, UserAccount, Bookings, Cancle, Rules, Crash, Err403, Terms as TermsImg } from '../assets/svgs/index';

const termsData = [
        {
            title: 'Eligibility',
            img: EligibleCar,
            points: [
                {
                    text: "You must be at least 18+ years old possess a valid driving license to rent a vehicle.",
                    icon: '',
                },
                {
                    text: "You must provide accurate and complete information while registering and booking.",
                    icon: ''
                },
            ]
        },
        {
            title: 'User Account',
            img: UserAccount,
            points: [
                {
                    text: "Users are responsible for maintaining the confidentiality of their account credentials.",
                    icon: '',
                },
                {
                    text: "You agree to notify us immediately of any unauthorized use of your account.",
                    icon: ''
                },
                {
                    text: "Rentro reserves the right to suspend or terminate your account at any time for any reason.",
                    icon: ''
                },
            ]
        },
        {
            title: 'Booking & Payments',
            img: Bookings,
            points: [
                {
                    text: "Booking is confirmed only upon successful payment.",
                    icon: '',
                },
                {
                    text: "Users can select pickup and drop-off locations and time during booking.",
                    icon: ''
                },
                {
                    text: "Payment methods include UPI, Credit/Debit Cards, Wallet, Net Banking, etc.",
                    icon: ''
                },
                {
                    text: "Late returns may incur additional charges.",
                    icon: ''
                },
                {
                    text: "Prices displayed are exclusive of applicable taxes unless stated otherwise. Taxes will be calculated and added at checkout.",
                    icon: ''
                },
            ]
        },
        {
            title: `Cancellation & 
            Refund Policy`,
            img: Cancle,
            points: [
                {
                    text: "Refunds are processed within 7-10 working days.",
                    icon: '',
                },
                {
                    text: "Late cancellations or no-shows may incur cancellation fees or partial refunds.",
                    icon: ''
                },
                {
                    text: "Cancellations must be made at least 24 hours before the scheduled pickup to receive a full refund.",
                    icon: ''
                },
            ]
        },
        {
            title: 'Vehicle Usage',
            img: Rules,
            points: [
                {
                    text: "Vehicles are to be used strictly for lawful and personal use only.",
                    icon: '',
                },
                {
                    text: "Users must follow traffic rules and drive responsibly.",
                    icon: ''
                },
                {
                    text: "Sub-renting, commercial use, or driving under the influence of alcohol/drugs is strictly prohibited.",
                    icon: ''
                },
                {
                    text: "Any damage, traffic fines, or penalties during the rental period are the user’s responsibility.",
                    icon: ''
                },
                {
                    text: "Vehicles must be returned with the same fuel level as at pickup.",
                    icon: ''
                },
                {
                    text: "Any shortage may be charged at market fuel rates plus a service fee.",
                    icon: ''
                },
            ]
        },
        {
            title: 'Breakdown, Accidents & Liability',
            img: Crash,
            points: [
                {
                    text: "In case of a breakdown, contact Rentro support immediately.",
                    icon: '',
                },
                {
                    text: "In the event of an accident, users must inform local authorities and Rentro support.",
                    icon: ''
                },
                {
                    text: "Insurance covers basic damage; however, negligence or misuse may void coverage.",
                    icon: ''
                },
                {
                    text: "Users are liable for all damage resulting from unauthorized or negligent use.",
                    icon: ''
                },
                {
                    text: "Rentro is not liable for any indirect, incidental, or consequential damages arising from the use of our services.",
                    icon: ''
                },
            ]
        },
        {
            title: 'Prohibited Activities',
            img: Err403,
            points: [
                {
                    text: "Tamper with or modify the vehicle in any way.",
                    icon: '',
                },
                {
                    text: "Smoking/Drinking inside the vehicle is strictly prohibited.",
                    icon: ''
                },
                {
                    text: "Use the vehicle for illegal purposes or speed racing.",
                    icon: ''
                },
                {
                    text: "Exceed the allowed number of passengers or load capacity.",
                    icon: ''
                },
                {
                    text: "Rentro is not liable for any indirect, incidental, or consequential damages arising from the use of our services.",
                    icon: ''
                },
            ]
        },
        {
            title: 'Privacy & Laws',
            img: TermsImg,
            points: [
                {
                    text: "Your personal data is collected and used according to our Privacy Policy.",
                    icon: '',
                },
                {
                    text: "Rentro does not sell or share personal data with third parties without consent.",
                    icon: ''
                },
                {
                    text: "Rentro reserves the right to terminate any booking or user account without prior notice for violation of these terms.",
                    icon: ''
                },
                {
                    text: "These Terms are governed by the laws of Delhi, India. Disputes shall be resolved in the courts of Delhi Jurisdiction.",
                    icon: ''
                },
                {
                    text: "Rentro reserves the right to modify these terms at any time. Continued use of the website after changes implies acceptance of the updated terms.",
                    icon: ''
                },
            ]
        },
    ]


    export default termsData;