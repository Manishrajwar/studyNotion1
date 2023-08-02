import HighlightText from "../Components/HomePage/HighlightText";
import  BannerImage1 from "../assets/Images/aboutus1.webp" 
import  BannerImage2 from "../assets/Images/aboutus2.webp" 
import  BannerImage3 from "../assets/Images/aboutus3.webp" 
import Quote from "../Components/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from "../Components/AboutPage/StatsComponent";
import LearningGrid from "../Components/AboutPage/LearningGrid";
import ContactFormSection from "../Components/AboutPage/ContactFormSection";
import Footer from "../Components/Common/Footer";

function About(){
return (
    <div className=" text-white w-full min-h-[calc(100%-3.5rem)]  ">
        <div >

        {/* section 1*/}
        <section className="bg-richblack-800 pt-[100px] ">
            <div className="max-w-maxContent w-11/12 mx-auto">
                <header className="flex flex-col gap-5">
                    <p className="text-3xl lg:max-w-[50%] md:max-w-[80%] max-w-[90%] mx-auto font-bold  text-center ">Driving Innovation in Online Education for a <HighlightText text={`Brighter Future`}/> </p>
            <p className="text-richblack-300 mx-auto lg:max-w-[60%] md:max-w-[80%] max-w-[90%] text-center">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>
                <div className="flex  gap-x-3 translate-y-[70px]  aboutBanner ">
        <img loading="lazy" src={BannerImage1} alt="banner1" className="banner" />
        <img loading="lazy" src={BannerImage2} alt="banner2" className="banner" />
        <img loading="lazy" src={BannerImage3} alt="banner3" className="banner" />
                </div>
            </div>
        </section>
 
 {/* line */}

        {/* section 2 */}
        <section className="w-full h-full ">
             <div  className="max-w-maxContent w-11/12 mx-auto">
                <Quote /> 
             </div>

        </section>

 <div className="h-[1px] w-full bg-richblack-500 mb-[100px]"></div>


        {/* section 3 */}
        <section>
            <div className="flex flex-col w-11/12 max-w-maxContent mx-auto gap-10 mb-20">
                {/* top box */}
                <div className="flex lg:flex-row flex-col gap-16 ">
                    {/* left */}
                    <div className="lg:w-[45%] w-[80%] flex flex-col gap-4">
                        <h1 className="text-3xl font-bold " 
                         style={{
                            background: "linear-gradient(to right, #833AB4, #FD1D1D,#FCB045)",
                            "WebkitBackgroundClip": "text",
                            "WebkitTextFillColor": "transparent"
                         }} >Our Founding Story</h1>
                        <p className="text-richblack-300">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className="text-richblack-300">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* right */}
                    <div className="lg:w-[45%] w-[80%] ">
                         <img loading="lazy" src={FoundingStory} alt="" className="max-w-[534px] max-h-[342px] " />
                    </div>
                </div>
                {/* botton box */}
                <div className="flex lg:flex-row flex-col gap-16 w-full h-full">
               {/* left part */}
               <div className="lg:w-[45%] w-[80%] flex flex-col  gap-4">
            <h1 style={{
                            background: "linear-gradient(to right, #E65C00, #F9D423)",
                            "WebkitBackgroundClip": "text",
                            "WebkitTextFillColor": "transparent"
                         }} className="text-3xl font-bold" >Our Vision</h1>
            <p className="text-richblack-300">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
               </div>
               {/* right part */}
               <div className="lg:w-[45%] w-[80%] flex flex-col gap-4">
       <h1 style={{
                            background: "linear-gradient(to right, #1FA2FF, #12D8FA ,#A6FFCB)",
                            "WebkitBackgroundClip": "text",
                            "WebkitTextFillColor": "transparent"
                         }} className="text-3xl font-bold " >Our Mission</h1>
       <p className="text-richblack-300">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
               </div>

                </div>
            </div>
        </section>

        {/* section 4 */}
        <section className="w-full h-full bg-richblack-700 mb-20">
             <StatsComponent />
        </section>

        {/* section 5 */}
        <section>
            <LearningGrid />
        </section>


        {/* section 6 form  */}
        <section>
        <ContactFormSection />
        </section>

        {/* rewiew wala section  */}


        <Footer/>


        </div>
    </div>
)
}

export default About;