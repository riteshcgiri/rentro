import { Handshake, Rocket, Users, Mail } from "lucide-react";
import { Austrian, MercedeceBenz1 } from "../assets/cars";




const Partnership = () => {

    const banners = [
        {
            icon: <Rocket className="w-8 h-8 text-netural-600" />,
            title: "Business Collaborations",
            desc: "Work with us to build innovative solutions and expand opportunities.",
        },
        {
            icon: <Users className="w-8 h-8 text-green-600" />,
            title: "Brand Sponsorships",
            desc: "Showcase your brand to our growing audience and create meaningful impact.",
        },
        {
            icon: <Handshake className="w-8 h-8 text-purple-600" />,
            title: "Investors & Funding",
            desc: "Be part of our journey with financial support and strategic guidance.",
        },
    ]

    return (


        <>
            <section className='h-[87vh] relative flex justify-center items-center select-none'>
                <div className='w-full h-full relative overflow-hidden'>
                    {/* <img src={MercedeceBenz1} className='w-full -mt-56 object-cover -backdrop-hue-rotate-60' alt="" /> */}
                </div>
                <div className='w-full h-full absolute top-0 left-0 t text-secondary-700 flex justify-center items-center flex-col p-10 overflow-hidden'>
                    <h1 className='text-[26rem] font-extrabold  tracking-wide text-center leading-[7rem] absolute top-1/2 -mt-20 z-0 text-black/10'>RENTRO</h1>
                    <h1 className='text-8xl font-extrabold tracking-wide text-center leading-[7rem] z-10 '>Let's Grow <span className="text-netural-500">Together</span></h1>
                    {/* scroll down animation */}

                    <div className='w-3/4  text-sm font-medium text-center p-5 rounded-lg mt-3'>
                        Owned and operated solely by <span className="font-bold text-netural-500">Rentro Technologies Pvt Ltd</span>. Passionate about building innovative solutions and driving impactful growth.
                        <br />
                        With experience in technology, operations, and customer success, I am looking to collaborate with visionaries, investors, and brands who believe in creating lasting change.
                    </div>
                    <div className="w-6 h-10 border-2 border-netural-500 rounded-full flex justify-center items-start absolute bottom-7">
                        <div className="w-2 h-2 bg-netural-500 rounded-full animate-scroll-dot mt-1"></div>
                    </div>
                </div>

            </section>
            <section className="w-full h-[70vh] flex justify-center items-center gap-5 bg-white p-10">
                {
                    banners.map((banner, index) => {
                        return (
                            <div className="w-3/5 h-3/5 bg-white border border-secondary-100 rounded-xl shadow-xl flex flex-col justify-center gap-5 items-center p-10 text-center">
                                {banner.icon}
                                <h2 className="text-secondary-600 text-xl font-semibold">{banner.title}</h2>
                                <p className="text-sm text-secondary-400">{banner.desc}</p>
                            </div>
                        )
                    })
                }

            </section>
            <section className="w-full h-screen flex justify-start items-center flex-col text-center gap-20 bg-white p-10">
                <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="text-secondary-600 text-3xl font-bold mb-5">About the Owner</h2>
                    <p className="text-md text-secondary-400 w-3/4">Hi, I am <span className="text-netural-500 font-semibold">Ritesh Giri</span>, founder and sole owner of <span className="text-netural-500 font-semibold">Rentro Technologies Pvt Ltd (RENTRO)</span>. With a passion for technology and a vision for innovation, I started this journey to create impactful solutions for businesses and communities.My mission is to grow this platform into a leading name in the industry, and I believe strategic partnerships will accelerate our journey towards excellence.</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="text-secondary-600 text-3xl font-bold mb-5">Our Future Vision</h2>
                    <p className="text-md text-secondary-400 w-3/4"> We envision a future where technology and mobility come together to create smarter, more efficient solutions for businesses and individuals. Our goal  is to expand into new markets, embrace sustainable practices, and foster  innovation that drives real impact. With the right partners, we aim to  build a platform that empowers growth, strengthens communities, and  delivers long-term value.</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="text-secondary-600 text-3xl font-bold mb-5">Get In Touch</h2>
                    <p className="text-md text-secondary-400 w-3/4">If you're interested in partnering with us or learning more about our vision, feel free to reach out!</p>
                    <button className="bg-secondary-500 hover:bg-secondary-700 hover:scale-105 transition-all text-white px-7 py-4 rounded-full mt-7 flex items-center justify-center gap-3"> <Mail className="w-5 h-5" /> Contact Us</button>
                </div>
            </section>
        </>
    )





}


export default Partnership;