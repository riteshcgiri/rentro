import React, { useState } from 'react';
import { Poega, Austrian, Temerario } from '../assets/cars';
import { Query, ArrowDown, Information, At, Call, Building } from '../assets/svgs';

const Policies = () => {

    return (
        <div className='w-full h-full'>
            <section className='h-screen relative flex justify-center items-center select-none'>
                <div className='w-full h-full relative overflow-hidden'>
                    <img src={Austrian} className='w-full -mt-56 object-cover -backdrop-hue-rotate-60' alt="" />
                </div>
                <div className='w-full h-full absolute top-0 left-0 bg-gradient-to-t from-white via-white/40 to-transparent text-white flex justify-center items-center flex-col p-10 overflow-hidden'>
                    <h1 className='text-[25rem] font-extrabold  tracking-wide text-center leading-[7rem] absolute top-1/2 -mt-20 z-0 text-white/40'>RENTRO</h1>
                    <h1 className='text-8xl font-extrabold tracking-wide text-center leading-[7rem] z-10 text-netural-700'>Our Privacy Policies</h1>
                    {/* scroll down animation */}
                    <div className="w-6 h-10 border-2 border-netural-500 rounded-full flex justify-center items-start absolute bottom-7">
                        <div className="w-2 h-2 bg-netural-500 rounded-full animate-scroll-dot mt-1"></div>
                    </div>
                    <div className='w-3/4 text-justify text-sm absolute bottom-24 font-medium bg-white/80 backdrop-blur-md p-5 rounded-lg text-secondary-300'>
                        This Privacy Policy explains how Rentro - We collects, uses, shares, and protects your personal information when you use our services through our website or mobile platforms. Your trust is important to us, and we are committed to handling your personal information with care and transparency.
                    </div>
                </div>

            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex mb-10 shadow-lg`}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Information We Collect</h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We collect personal information to provide and improve our services. Information we collect includes:</p>


                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-10'>Information You Provide</h3>
                        <div className='flex flex-col gap-4 w-full px-5'>
                            {[
                                {
                                    heading: 'Account Registration ',
                                    text: ' To use Rentro’s services, users must register with their full name, email, phone number, password, and address. This information is used for identity verification, communication, and account security. Providing accurate, up-to-date details is essential. All information is securely handled as per our Privacy Policy.'
                                },
                                {
                                    heading: 'Driving License Info ',
                                    text: ' To rent a vehicle on Rentro, you must provide a valid driving license, including the license number, expiry date, and clear images (front and back if required). This ensures legal compliance and verifies your driving eligibility. False or expired details may result in cancellation. All data is securely stored as per our Privacy Policy.'

                                },
                                {
                                    heading: 'Booking Details ',
                                    text: ' When making a booking on Rentro, users must provide accurate car selection, pickup and drop-off locations, and rental start and end date/time. These details help us ensure smooth scheduling and availability. Incomplete or incorrect information may lead to delays or booking issues. Always double-check your booking before confirming.'

                                },
                                {
                                    heading: 'Payment Details ',
                                    text: ' Rentro accepts payments through UPI, credit, and debit cards. All transactions are securely processed via trusted third-party payment gateways. We do not store your card or UPI credentials. Users must ensure their payment details are valid to avoid booking failures or delays. All payments are encrypted and confidential.'

                                },
                                {
                                    heading: 'Customer Support Messages ',
                                    text: ' All interactions with Rentro’s customer support team—including chats, emails, and call summaries—may be recorded or stored to improve service quality, resolve disputes, and ensure accountability. These messages are kept confidential and used only for support-related purposes in accordance with our Privacy Policy.'

                                },
                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium'>Information We Automatically Collect</h3>
                        <div className='flex flex-col gap-4 w-full mt-10 px-5'>
                            {[
                                {
                                    heading: "Device & Usage Data:",
                                    text: "When accessing or using Rentro’s platform, we may automatically collect technical information including, but not limited to, your IP address, device type, operating system, browser type, timestamps of access, and referring URLs. This data is utilized to monitor system performance, ensure platform security, detect fraudulent activities, and analyze user interactions. All such data is processed and stored in accordance with applicable data protection regulations and our Privacy Policy."
                                },

                                {
                                    heading: `Cookies & Tracking: `,
                                    text: ` Rentro utilizes cookies, web beacons, and similar tracking technologies to monitor user activity across the platform. This includes data such as pages visited, elements clicked, session duration, referral paths, and on-site behavior patterns. These tools help optimize site performance, personalize content, and enhance user experience.
                                    Tracking data may also be used for analytics, remarketing, and fraud prevention. Users may control cookie preferences via their browser settings. Continued use of Rentro constitutes consent to our use of cookies, as detailed in our [Cookie Policy] and Privacy Policy.`
                                },
                                {
                                    heading: `Cookies & Tracking: `,
                                    text: ` Rentro may collect real-time or approximate geolocation data if location services are enabled on your device. This includes GPS data, Wi-Fi access points, IP address-based location, and browser geolocation. We use this information to provide location-based services, such as showing nearby vehicles, improving search results, and preventing fraudulent activity. Users may disable location sharing at any time via device or browser settings. Geolocation data is handled in accordance with applicable privacy laws and our Privacy Policy.`
                                },

                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false);
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} >
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-start mt-56 justify-center select-none'>
                    <img src={Query} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex flex-row-reverse  mb-10 shadow-lg`}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>How We Use Your Information</h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We use your information for the following purposes:</p>


                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Account Registration and Management',
                                    text: 'To register and manage your account, we collect and process personal information including your name, contact details, and login credentials. This data is used strictly for authentication, account security, and service delivery, in full compliance with applicable privacy regulations and data protection laws.'
                                },
                                {
                                    heading: 'Identity and Driving Eligibility Verification',
                                    text: 'To verify your identity and driving eligibility, we may collect personal documents such as government-issued ID, driver’s license, and related credentials. This information is used solely to ensure legal compliance, user authenticity, and safe usage of our services, in accordance with relevant data protection laws.'

                                },
                                {
                                    heading: 'Booking and Payment Processing',
                                    text: 'To process your bookings and payments, we collect necessary personal and financial information, including contact details and payment method data. This information is securely handled to complete transactions, confirm reservations, and provide related services, in strict accordance with financial regulations and data protection laws.'

                                },
                                {
                                    heading: 'Service Communication and Notifications',
                                    text: 'To communicate updates, booking confirmations, or cancellations, we use your contact information to send timely and relevant notifications. These communications are essential for service fulfillment and user awareness, and are conducted in compliance with applicable communication and data privacy regulations.'

                                },
                                {
                                    heading: 'Marketing and Promotional Communications',
                                    text: 'With your explicit consent, we may use your contact information to send reminders, promotional offers, or newsletters. These communications aim to enhance your user experience and inform you about relevant services, in full compliance with consent and data protection requirements under applicable privacy laws.'

                                },
                                {
                                    heading: 'Customer Service and Support',
                                    text: 'We use your personal information to provide customer service and support, including responding to inquiries, resolving issues, and ensuring service satisfaction. This data processing is necessary to fulfill our contractual obligations and is handled in compliance with applicable privacy and data protection laws.'

                                },
                                {
                                    heading: 'Usage Analysis and Service Improvement',
                                    text: 'We collect and analyze site usage data to better understand user behavior, optimize website performance, and enhance our services. This information is processed in aggregate or anonymized form where possible, in compliance with applicable data protection laws and privacy standards.'

                                },
                                {
                                    heading: 'Legal and Regulatory Compliance',
                                    text: 'We process and retain certain personal information to comply with legal, tax, and regulatory obligations. This includes fulfilling record-keeping requirements, responding to lawful requests, and ensuring adherence to applicable laws and governmental regulations, in accordance with established data protection frameworks.'

                                },
                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex mb-10 shadow-lg`}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Sharing of Your Information</h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We do not sell your personal data. However, we may share it with:</p>


                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Third-Party Service Providers',
                                    text: 'We may share your personal information with trusted third-party service providers, including payment processors, cloud storage providers, ID verification partners, and analytics tools. These partners are contractually obligated to handle your data securely and only for the purposes necessary to support our services, in compliance with data protection laws.'
                                },
                                {
                                    heading: 'Disclosure to Legal Authorities',
                                    text: 'We may disclose your personal information to legal authorities to comply with applicable laws, respond to lawful requests or legal processes, and to detect, prevent, or address fraud, security threats, or other illegal activities, in accordance with legal and regulatory requirements.'
                                },
                                {
                                    heading: 'Business Transfers',
                                    text: 'If Rentro is involved in a merger, acquisition, reorganization, or sale of assets, your personal information may be transferred as part of that transaction. We will ensure such transfers are conducted in accordance with applicable data protection laws and that your privacy rights remain protected.'
                                },


                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex flex-row-reverse  mb-10 shadow-lg`}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Legal Basis for Processing</h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>Depending on your jurisdiction (e.g., under GDPR), we rely on the following legal bases</p>


                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'User Consent',
                                    text: 'We obtain your explicit consent before sending promotional materials or collecting sensitive data such as your location. You have the right to withdraw your consent at any time. All consent-based data processing is conducted in accordance with applicable privacy laws and user rights protections.'
                                },
                                {
                                    heading: 'Contractual Necessity',
                                    text: 'We process your personal information as necessary to fulfill our contractual obligations, such as delivering the booking service you requested. This includes managing reservations, processing payments, and providing related customer support, all in accordance with applicable privacy and data protection laws.'
                                },
                                {
                                    heading: 'Legal Obligation',
                                    text: 'We process and retain certain personal data to fulfill legal obligations, including tax compliance, financial recordkeeping, and regulatory reporting. This is done in accordance with applicable laws and is necessary to ensure our operations meet statutory and governmental requirements.'
                                },
                                {
                                    heading: 'Legitimate Interests',
                                    text: 'We may process your personal information based on our legitimate interests, such as improving and securing our platform, enhancing user experience, and preventing fraud. Such processing is carefully balanced to ensure it does not override your fundamental rights and freedoms, in line with applicable privacy laws.'
                                },


                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex mb-10 shadow-lg`}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Data Retention</h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We retain your data:</p>


                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Retention Validity',
                                    text: 'We retain your personal information for as long as your account remains active or as needed to provide you with our services. Data may also be retained as required to comply with legal obligations, resolve disputes, or enforce our agreements, in accordance with applicable data retention laws.'
                                },
                                {
                                    heading: 'Retention for Legal Compliance',
                                    text: 'We retain your personal and transactional data for a minimum of 5 years after your last transaction to comply with tax laws, financial regulations, and other applicable legal requirements. This retention period ensures proper recordkeeping and regulatory reporting, in accordance with governing data protection laws.'
                                },
                                {
                                    heading: 'Data Disposal',
                                    text: 'After the applicable retention period ends, your personal data is securely deleted or irreversibly anonymized. This ensures that your information is no longer identifiable and cannot be reconstructed, in strict compliance with data protection and privacy regulations.'
                                },


                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex flex-row-reverse  mb-10 shadow-lg`}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Your Rights and Choices</h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>Depending on your location, you may have the right to:</p>


                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Right of Access',
                                    text: 'You have the right to request and obtain a copy of the personal information we hold about you. This includes details on how your data is processed, stored, and shared, in accordance with applicable data protection laws.'
                                },
                                {
                                    heading: 'Right to Rectification',
                                    text: 'You have the right to request the correction of any inaccurate or incomplete personal data we hold about you. We will update such information promptly to ensure accuracy, in compliance with applicable data protection laws.'
                                },
                                {
                                    heading: 'Right to Erasure',
                                    text: 'You have the right to request the deletion of your account and associated personal data, subject to any legal or regulatory obligations requiring its retention. We will process such requests in accordance with applicable data protection laws.'
                                },
                                {
                                    heading: 'Right to Object or Restrict Processing',
                                    text: 'You have the right to object to the processing of your personal data or request restrictions on its use where permitted by law. We will honor such requests unless we have compelling legitimate grounds or legal obligations requiring continued processing.'
                                },
                                {
                                    heading: 'Right to Withdraw Consent',
                                    text: 'You may withdraw your consent to receive marketing emails at any time. This withdrawal will not affect the lawfulness of any processing carried out before consent was withdrawn, and your request will be honored in compliance with applicable data protection laws.'
                                },
                                {
                                    heading: 'Right to Data Portability',
                                    text: 'You have the right to request your personal data in a structured, commonly used, and machine-readable format, and to have that data transmitted to another controller where technically feasible, in accordance with applicable data protection laws.'
                                },


                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h3 className='mt-5 ml-10 font-medium text-secondary-400'>To exercise these rights, contact: <a href="mailto:support@rentro.com" className="text-blue-600">support@rentro.com</a></h3>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex mb-10 shadow-lg `}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Cookies and Tracking Technologies</h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We use cookies and similar tools to:</p>


                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Authentication and Preferences',
                                    text: 'We use cookies and similar technologies to keep you logged in and remember your settings, ensuring a consistent and personalized user experience in compliance with applicable privacy regulations.'
                                },
                                {
                                    heading: 'Analytics and Performance',
                                    text: 'We use analytics tools to understand how you interact with our site, measure performance, and identify areas for improvement. Data is processed in aggregate or anonymized form where possible, in compliance with applicable privacy and data protection laws.'
                                },
                                {
                                    heading: 'Personalization',
                                    text: 'We may use your data to offer personalized content, recommendations, or promotions tailored to your interests and preferences, in accordance with applicable privacy and data protection laws.'
                                },
                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h3 className='mt-5 ml-10 font-medium text-secondary-400'>You can manage or delete cookies in your browser settings. <a href="mailto:support@rentro.com" className="text-blue-600"></a></h3>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex flex-row-reverse  mb-10 shadow-lg`}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Data Security
                    </h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We implement multiple security safeguards:</p>


                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Secure Data Transmission',
                                    text: 'We use SSL encryption for all transactions to protect your personal and financial information during transmission, ensuring confidentiality and integrity in compliance with applicable security and data protection standards.'
                                },
                                {
                                    heading: 'Controlled Internal Access',
                                    text: 'We implement strict access controls to ensure that only authorized internal team members can access personal data, and only to the extent necessary to perform their job responsibilities, in compliance with applicable data protection regulations.'
                                },
                                {
                                    heading: 'Security Audits and Testing',
                                    text: 'We conduct regular security audits and penetration testing to identify, address, and prevent potential vulnerabilities, ensuring the ongoing protection of personal data in accordance with industry best practices and applicable data protection laws.'
                                },
                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h3 className='mt-5 ml-10 font-medium text-secondary-400'>However, no online system is 100% secure, so we advise users to use strong passwords and avoid sharing credentials. <a href="mailto:support@rentro.com" className="text-blue-600"></a></h3>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex mb-10 shadow-lg `}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Children's Privacy
                    </h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We are committed to protecting children's privacy:</p>

                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Age Verification',
                                    text: 'Rentro\'s services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that such data has been collected, we will promptly delete it in compliance with applicable privacy laws.'
                                },
                                {
                                    heading: 'Parental Consent',
                                    text: 'We comply with all applicable child data protection and privacy laws to ensure the safety and confidentiality of minors information.'
                                },
                                {
                                    heading: 'Parental Data Deletion Rights',
                                    text: 'Parents or guardians have the right to request the deletion of any personal data collected from a minor.'
                                },
                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h3 className='mt-5 ml-10 font-medium text-secondary-400'><a href="mailto:support@rentro.com" className="text-blue-600"></a></h3>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex mb-10 shadow-lg  flex-row-reverse`}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Third-Party Links
                    </h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We are committed to clarifying our responsibility regarding third-party links.</p>

                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Scope of Privacy Policy',
                                    text: 'Our platform may include links to third-party websites for your convenience or reference. These external sites operate independently and are beyond our control. This Privacy Policy applies solely to our platform and services, and does not cover any third-party content, operations, policies, or privacy practices.'
                                },
                                {
                                    heading: 'Responsibility for Third-Party Practices',
                                    text: 'We do not take responsibility for the privacy policies, content, or security practices of any third-party websites linked from our platform. Users should carefully review each external site’s privacy policy before sharing personal information to understand how their data may be collected, processed, or disclosed.'
                                },
                                {
                                    heading: 'User Discretion and Risk',
                                    text: 'Your use of third-party websites accessed through links on our platform is entirely at your own discretion and risk. We encourage you to exercise caution online and take appropriate measures to safeguard your personal information when engaging with services, products, or offers from such external sites.'
                                },
                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h3 className='mt-5 ml-10 font-medium text-secondary-400'><a href="mailto:support@rentro.com" className="text-blue-600"></a></h3>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <section className={`w-full h-full bg-white px-10 pt-5 pb-10 flex mb-10 shadow-lg `}>
                <div className='w-full flex flex-col gap-5 '>
                    <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-10 whitespace-pre-line'>Changes to This Policy
                    </h2>
                    <p className='w-2/3 mt-3 text-secondary-300'>We are committed to clarifying our responsibility regarding third-party links.</p>

                    <div className='mt-5'>
                        <h3 className='text-3xl text-secondary-400 font-medium mb-5'></h3>
                        <div className='flex flex-col gap-4 w-full  px-5'>
                            {[
                                {
                                    heading: 'Policy Updates',
                                    text: 'We may update this Privacy Policy periodically to reflect changes in our services, legal obligations, or operational practices. These updates are intended to ensure our privacy practices remain transparent, relevant, and compliant with applicable laws, while keeping users informed about how their personal information is managed and protected.'
                                },
                                {
                                    heading: 'Notification of Changes',
                                    text: 'By continuing to access or use Rentro’s services after changes to this Privacy Policy are posted, you acknowledge and agree to the updated terms. If you do not agree with the revisions, you should discontinue use of our services and request deletion of your personal data where applicable.'
                                },
                                {
                                    heading: 'Acceptance of Updates',
                                    text: 'Your use of third-party websites accessed through links on our platform is entirely at your own discretion and risk. We encourage you to exercise caution online and take appropriate measures to safeguard your personal information when engaging with services, products, or offers from such external sites.'
                                },
                                {
                                    heading: 'Effective Date of Changes',
                                    text: 'Each update to this Privacy Policy will include a revised “Last Updated” date to indicate when the changes took effect. We encourage users to review this policy periodically to stay informed about how we collect, use, and protect their personal information over time.'
                                },
                            ].map((point, index, arr) => {
                                const [isPointOpen, setIsPointOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 ${isPointOpen ? 'border-gray-300' : ' border-transparent'}  rounded-lg bg-white px-7 py-4 transition-all duration-300`}
                                    >
                                        {/* Header Row */}
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsPointOpen((prev) => !prev)} onBlur={() => setIsPointOpen((prev) => !prev)}>
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-blue-600">
                                                    {index < 9 ? `0${index + 1}` : index + 1}
                                                </span>
                                                <span className="text-gray-600 font-semibold">{point.heading}</span>
                                            </div>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isPointOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>

                                        {/* Expandable Text */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPointOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{point.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <h3 className='mt-5 ml-10 font-medium text-secondary-400'><a href="mailto:support@rentro.com" className="text-blue-600"></a></h3>
                    </div>
                </div>
                <div className='w-full flex items-center mt-56 justify-center select-none'>
                    <img src={Information} alt={'title'} className='w-full object-contain' draggable={false} />
                </div>
            </section>

            <div className='w-full h-full bg-white p-10 flex flex-col items-start gap-3'>
                <h2 className='text-secondary-400/90 text-6xl tracking-tight font-semibold pt-5 whitespace-pre-line'>Privacy Quaries
                </h2>
                <p className='w-2/3 text-secondary-300'>For any privacy-related questions or to make a data request:</p>
                <div className="w-full h-[30vh] grid grid-cols-3 items-start gap-8 mt-10 text-secondary-400 font-semibold">
                    {
                        [
                            { link: "mailto:support@rentro.com", img: At, title: "support@rentro.com" },
                            { link: "tel:+919667331575", img: Call, title: "+91 (966) 733 1575" },
                            { link: "https://maps.app.goo.gl/rfALxbsYgmch5dDj6", img: Building, title: (<>25-B, Rishi Nagar,<br />  Amar Colony, Nangloi, <br />  Delhi, India - 110041</>) },
                        ].map((contact, index) => {
                            return (
                                <a key={'contact' + index} href={contact.link} target="_blank" className="w-full flex flex-col items-center justify-center gap-5 rounded-lg p-6 hover:text-netural-700 ">
                                    <img src={contact.img} alt="" className='w-10 h-10 mb-2 filter hue-rotate-[220deg]' />
                                    <span className=" break-all text-center">{contact.title}</span>
                                </a>
                            )
                        })
                    }

                </div>
            </div>


        </div>
    );
};

export default Policies;




