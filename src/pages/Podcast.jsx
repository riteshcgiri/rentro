import React, { useState } from "react";
import { FaSpotify, FaApple, FaGoogle, FaYoutube } from "react-icons/fa";
import { ArrowDown, Crash } from '../assets/svgs/index'; // example, replace with your asset
import { Farari, FarariRed, Ducati, Austrian, GreenCar } from "../assets/cars/index";
import SpinnerLoader from '../components/Loaders/SpinnerLoader';
import { user1 } from "../assets/users";

const PodcastPage = () => {
    const episodes = [
        {
            id: 1,
            title: 'Road Trip Stories: Euro Trip Recap',
            date: ' October 22, 2024',
            host: 'Varun Thakur, Kautuk Srivastava, Neville Shah, Aadar Malik',
            description: 'Dive into this entertaining episode where the four hosts recount their exciting European adventure. Fresh off their tour performing live, uncensored versions of the podcast, they dish out personal stories from the road. Expect a mix of laugh-out-loud moments, from navigating new cities to sharing wild anecdotes, all while tying in their classic style of exploring quirky online facts inspired by European vibes. It\'s a fun departure from their usual format, focusing on real-life experiences with plenty of banter that keeps things light and engaging.',
            audioEmbed: 'https://open.spotify.com/embed/episode/5FS4heRIwFT3VfvnJpAKU4?utm_source=generator&theme=0', // replace with real
            episodeLink: 'https://open.spotify.com/episode/5FS4heRIwFT3VfvnJpAKU4?si=BJkrRIB-RciDxKLh-vmU3A',
            notes: 'Catch the full episode on Spotify or YouTube to hear all the uncensored details straight from the hosts. This card is based on episode metadata and descriptions—listening yourself is the best way to get the complete vibe!',
            topics: [
                {
                    topicTitle: 'Live Tour Experiences',
                    topicDescription: 'Behind-the-scenes tales from uncensored shows in various European cities, including crowd reactions, venue surprises, and memorable interactions with international fans.'
                },
                {
                    topicTitle: 'Travel Adventures and Mishaps',
                    topicDescription: 'Hilarious recounts of food discoveries, cultural differences, travel hacks gone wrong, and unexpected challenges faced during the trip.'
                },
                {
                    topicTitle: 'Cultural Observations and Insights',
                    topicDescription: 'The hosts\' comedic takes on European customs, historical trivia, and how they compare to life back home in India.'
                },
                {
                    topicTitle: 'Group Banter and Reflections',
                    topicDescription: 'Signature roasting among the hosts, inside jokes, and thoughts on how the tour has shaped their podcast journey.'
                },


            ]
        },
        {
            id: 2,
            title: 'The Internet Said So | EP 001 | The Boys Are Back',
            date: 'September 24, 2019',
            host: 'Aadar Malik, Kautuk Srivastava, Neville Shah, Varun Thakur',
            description: 'Kick off the series with this inaugural episode of The Internet Said So, where the four comedian hosts reunite to set the tone for their weekly podcast. They dive into a mix of absurd and entertaining internet discoveries, blending comedy with casual chit-chat. As the first episode, it introduces the show\'s format of exploring pointless yet fascinating online trivia, all delivered in an unscripted, engaging style that emphasizes humor over accuracy. Expect plenty of laughs from their group dynamic, inside jokes, and playful debates, making it a perfect entry point for new listeners. However, note that direct access to the full audio or a complete transcript wasn\'t available, so this is based on episode metadata and general show patterns. For the authentic experience, listen on Spotify or YouTube.',
            audioEmbed: 'https://open.spotify.com/embed/episode/1nkgLYqDUQeabEUEzEUFAv?utm_source=generator&theme=0', // replace with real
            episodeLink: 'https://open.spotify.com/episode/1nkgLYqDUQeabEUEzEUFAv?si=KHTw4jiqRF6MDdNTxYMv8Q',
            notes: 'Catch the full episode on Spotify or YouTube for all the unfiltered fun. This card is compiled from available metadata and descriptions—direct listening is recommended for complete details!',
            topics: [
                {
                    topicTitle: 'Introduction to the Podcast Format',
                    topicDescription: ' The hosts explain their concept of sharing random internet "facts," setting expectations for future episodes filled with stupid, weird, and shocking trivia.'
                },
                {
                    topicTitle: 'Group Reunion and Banter',
                    topicDescription: 'Stories and roasting among the hosts as they "get back" together, highlighting their chemistry and comedic styles.'
                },
                {
                    topicTitle: 'Random Internet Fact',
                    topicDescription: 'Discussions on fun, pointless topics like animal quirks, pop culture oddities, or everyday absurdities pulled from online sources.'
                },
                {
                    topicTitle: 'Humor and Relatability',
                    topicDescription: 'Light-hearted takes on relatable scenarios, with a nod to how these facts tie into daily life or broader entertainment.'
                },
            ]
        },
        {
            id: 3,
            title: 'The Internet Said So | EP 274 | True Crime',
            date: 'July 2, 2024',
            host: 'Aadar Malik, Kautuk Srivastava, Neville Shah, Varun Thakur',
            description: 'This episode shifts from the podcast\'s usual lighthearted trivia to explore true crime stories, blending intrigue with the hosts\' signature humor. They discuss notable cases, analyzing details, motives, and bizarre elements while adding witty commentary and debates. As part of the long-running series, it maintains the engaging, group-chat vibe but tackles darker themes like murders and mysteries, making it both educational and entertaining. Note that full audio access or transcripts weren\'t directly available, so this is synthesized from episode metadata, descriptions, and show patterns. For the complete experience, tune in on Spotify or YouTube.',
            audioEmbed: 'https://open.spotify.com/embed/episode/3NSPHkgT3HI8IeY5H8z4JF?utm_source=generator&theme=0', // replace with real
            episodeLink: 'https://open.spotify.com/episode/3NSPHkgT3HI8IeY5H8z4JF?si=niDOSZu3TOa8kxxMHZopwA',
            notes: 'Stream the full episode on Spotify or YouTube for all the detailed discussions. This card draws from available metadata—direct listening is ideal for accuracy!',
            topics: [
                {
                    topicTitle: 'True Crime Cases',
                    topicDescription: 'Breakdowns of real-life incidents, including motives, investigations, and shocking twists in various stories.'
                },
                {
                    topicTitle: 'Host Discussions and Debates',
                    topicDescription: 'Comedic reactions to crime details, ethical questions, and "what if" scenarios tied to the facts.'
                },
                {
                    topicTitle: 'Internet-Sourced Facts',
                    topicDescription: 'Ties into online trivia about crimes, such as historical cases or urban legends with a factual basis.'
                },
                {
                    topicTitle: 'Group Banter',
                    topicDescription: 'Playful roasting, personal anecdotes, and humor to lighten the heavy subject matter.'
                },
            ]
        },
        {
            id: 4,
            title: 'Talking Cars | Road Trip in Tata Altroz Diesel',
            date: 'January 29, 2023',
            host: 'Talking Cars Team',
            description: 'In this episode, the hosts embark on a road trip from an unspecified starting point to Bangalore in the Tata Altroz, highlighted as India\'s last remaining diesel hatchback. They evaluate whether diesel cars still make sense in the modern era, considering factors like fuel efficiency, performance, and market trends. The discussion extends to broader automotive topics, including how some car manufacturers failed by not taking the Indian market seriously, leading to their decline, and critiques of policies like the sun film ban. Blending hands-on driving impressions with industry commentary, the episode emphasizes the Altroz\'s strengths as a hatchback, such as its diesel engine\'s torque and economy, while noting its suitability for city and highway use. As with many Talking Cars episodes, it provides an engaging, enthusiast-driven perspective without full access to audio or transcripts, so this is based on metadata, video counterparts, and related reviews.',
            audioEmbed: 'https://open.spotify.com/embed/episode/0LQsbXb1bxlRg1CyusIaSZ?utm_source=generator&theme=0', // replace with real
            episodeLink: 'https://open.spotify.com/episode/0LQsbXb1bxlRg1CyusIaSZ?si=OGSJKWgBSP6KY-xQ-L5SjA',
            notes: 'Catch the full episode on Spotify or YouTube for all the detailed road trip stories and discussions. This card is compiled from available metadata and related sources—direct listening is recommended for complete details!',
            topics: [
                {
                    topicTitle: 'Road Trip and Diesel Viability',
                    topicDescription: 'Testing the Tata Altroz diesel on a journey to Bangalore, assessing real-world fuel efficiency (around 17-23 km/l), torque advantages (200 Nm), and whether diesel remains practical amid rising petrol preferences'
                },
                {
                    topicTitle: 'Car Manufacturer Histories',
                    topicDescription: 'Reflections on brands that underestimated India, resulting in their exit from the market, and lessons for current players.'
                },
                {
                    topicTitle: 'Policy and Feature Critiques',
                    topicDescription: 'Debate on the sun film ban\'s drawbacks, plus discussions on diesel engine solidity, weight savings, and hatchback dynamics versus compact SUVs.'
                },
                {
                    topicTitle: 'Altroz Driving Impressions',
                    topicDescription: ' Ride quality, handling, engine refinement, and comparisons to other Tata models like the Nexon, with notes on city driveability and long-distance comfort'
                },
            ]
        },



    ];

    const [openEpisode, setOpenEpisode] = useState(null);


    const [isPodcastLoading, setIsPodcastLoading] = useState(true);


    return (

        <>

            <section className="w-full h-[87vh] relative flex justify-center items-center select-none ">


                <div class="relative flex w-full h-full bg-yellow-200 overflow-hidden">

                    <h1 className='text-[25rem] font-extrabold  tracking-wide text-center leading-[7rem] absolute top-1/2 -left-14 -mt-20 z-0 text-white/90 '>RENTRO</h1>

                    <div class=" w-full h-full bg-green-400 [clip-path:polygon(0%_0%,100%_0%,70%_100%,0%_100%)] relative z-[1]">
                        <img src={GreenCar} className="w-full h-full object-contain absolute right-10 z-[2]" alt="" />
                        <h1 className='text-[25rem] font-extrabold  tracking-wide text-center leading-[7rem] absolute top-1/2 -left-14 -mt-20 z-[3] text-white/90 '>RENTRO</h1>
                    </div>

                    <div class=" w-full h-full  z-[1] relative flex items-center justify-center">
                        <img src={Ducati} className="w-full z-[2]" alt="" />
                    </div>

                    <div class=" w-full h-full bg-red-400 [clip-path:polygon(1%_0%,100%_0%,100%_100%,30%_100%)] z-[1] relative flex justify-center items-center">
                        <img src={FarariRed} alt="" className="w-full  absolute left-10 z-[2]" />
                        <h1 className='text-[25rem] font-extrabold  tracking-wide text-center leading-[7rem] absolute top-1/2 -right-[9.38rem] -mt-20 z-[3] text-white/90 '>RENTRO</h1>
                    </div>

                </div>

                <div className="w-full h-full absolute top-0 left-0 bg-black/70 z-[1] flex justify-center text-white items-center flex-col gap-1 backdrop-blur-[1px] overflow-hidden">
                    {/* <h1 className="text-5xl md:text-6xl font-bold text-white">The Rentro Podcast</h1> */}
                    <h1 className='text-8xl font-extrabold tracking-wide text-center leading-[7rem] '>The Rentro Podcast</h1>
                    <div className='text-justify text-lg font-medium p-5 rounded-lg'>
                        Conversations about travel, cars, and road trip stories — straight from the driver’s seat.
                    </div>
                    <a href="#latest" className="mt-6 bg-netural-600 hover:bg-netural-700 px-6 py-3 rounded-full transition">Listen Now</a>

                </div>



            </section>

            <section id="latest" className="w-full h-screen bg-white text-secondary-500 px-20 py-10">
                <h2 className="text-5xl font-bold text-center mb-16 ">Latest Episode</h2>

                <div className="w-full h-full flex items-start gap-10">
                    <div className={`w-1/2 h-full ${isPodcastLoading ? 'block' : 'flex justify-start items-center flex-col'}`}>
                        {isPodcastLoading && (
                            <div className="flex flex-col items-center justify-center h-full">
                                <SpinnerLoader height={50} width={50} className={'stroke-netural-500 fill-transparent'} />
                                <br />
                                <h2>Almost there</h2>
                            </div>
                        )}
                        <iframe src={episodes[0].audioEmbed} className="w-full h-2/5" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture " title={episodes[0].title} onLoad={() => setIsPodcastLoading(false)} ></iframe>
                        <div className="w-full flex flex-col items-start mt-4 gap-4">
                            <h3 className="text-xl font-bold">{episodes[0].title}</h3>
                            <p className="text-sm text-gray-500">{episodes[0].date}</p>
                            <h2 className="text-secondary-400 text-sm text-justify">{episodes[0].notes}</h2>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex flex-col">
                        <div>
                            <h2 className="text-md font-bold mb-4">Main Topics Covered</h2>
                            {episodes[0].topics.map((topic, index) => {
                                const [isTopicOpen, setIsTopicOpen] = useState(false)
                                return (
                                    <div key={index} className={`border hover:border-gray-300 cursor-pointer  border-transparent  rounded-md bg-white text-black px-7 py-4 transition-all duration-300`} onClick={() => setIsTopicOpen((prev) => !prev)} onBlur={() => setIsTopicOpen((prev) => !prev)}>
                                        <div className="flex justify-between items-center text-sm" >
                                            <span className="text-gray-600 font-semibold ">{topic.topicTitle}</span>
                                            <img src={ArrowDown} className={`w-4 h-4 transform transition-transform duration-300 ${isTopicOpen ? "rotate-180" : ""}`} alt="Toggle" />
                                        </div>
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTopicOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="text-gray-500 text-sm text-justify">{topic.topicDescription}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="text-justify mt-10">
                            <h2 className="text-md font-bold mb-4">Podcast Summary</h2>
                            <p className="text-secondary-400 text-sm">{episodes[0].description}</p>
                        </div>

                    </div>
                </div>

            </section>

            <section className="w-full bg-gray-50 text-secondary-500 px-20 py-10">
                <h2 className="text-5xl font-bold text-center mb-16 ">Recent Episodes</h2>
                <div className="w-full flex gap-10 justify-center items-start">
                    {
                        episodes.slice(1).map((episode, index) => {

                            const [isOpen, setIsOpen] = useState(false);
                            return (
                                <div className="w-full h-fit bg-white rounded-xl shadow-lg overflow-hidden">
                                    <iframe src={episode.audioEmbed} className="w-full h-40" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title={episode.title}></iframe>

                                    <div className="p-6 w-full">
                                        <h3 className="text-xl font-bold">{episode.title}</h3>
                                        <p className="text-sm mt-2 text-gray-500">{episode.date}</p>

                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out  mt-3 ${isOpen ? "max-h-[100vh]" : "max-h-40"}`}>
                                            <p className="text-secondary-400 text-sm text-justify">{episode.description}</p>
                                            <div className="w-full flex justify-end mt-3">
                                                <a href={episode.episodeLink} target="_blank" className="mt-2 text-white px-4 py-2 rounded-full hover:bg-netural-600 bg-netural-500 text-right">Listen Now</a>
                                            </div>
                                        </div>

                                        <button onClick={() => setIsOpen(!isOpen)} className="w-full mt-4 text-netural-600 hover:text-netural-800 text-right text-sm flex items-center justify-center gap-3" >
                                            {isOpen ? "View less" : "View more"}
                                            <img src={ArrowDown} alt="" className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                                        </button>
                                    </div>
                                </div>
                            )



                        })
                    }

                </div>


            </section>
            <section className="py-16 px-6 md:px-20 bg-gray-50 text-center">
                <h2 className="text-3xl font-semibold mb-6">About the Podcast</h2>
                <p className="max-w-2xl mx-auto text-gray-700">
                    Hosted by passionate car enthusiasts from all over the world, this podcast dives deep into travel stories,
                    car reviews, rental tips, and behind-the-scenes industry insights — all while keeping it fun and engaging.
                </p>
                <img src={user1} alt="Host" className="w-32 h-32 rounded-full mx-auto mt-6 object-cover shadow-lg" />
                <p className="mt-4 font-medium">Ritesh Giri</p>
            </section>
            <section className="py-16 px-6 md:px-20 text-center bg-white">
                <h2 className="text-3xl font-semibold mb-6">Subscribe & Follow</h2>
                <div className="flex justify-center gap-6 text-3xl text-netural-500">
                    <a target="_blank" href="https://open.spotify.com/search/travel%20podcast"><FaSpotify /></a>
                    <a target="_blank" href="https://podcasts.apple.com/us/search?term=travel%20"><FaApple /></a>
                    <a target="_blank" href="https://www.google.com/search?q=travel+podcast+%26+stories"><FaGoogle /></a>
                    <a target="_blank" href="https://www.youtube.com/results?search_query=travel+podcasts"><FaYoutube /></a>
                </div>
            </section>

            <section className="bg-netural-500 text-white py-10 px-6 text-center">
                <h2 className="text-2xl font-semibold">Ready for your own road trip?</h2>
                <p className="mt-2">Book your dream car today and create your own story.</p>
                <a href="/booking" className="mt-4 inline-block bg-white text-netural-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                    Book a Car
                </a>
            </section>

        </>
    );


}



export default PodcastPage;