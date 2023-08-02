import { BiSolidRightArrowAlt } from "react-icons/bi";
import HighlightText from "../Components/HomePage/HighlightText";
import CTAButton from "../Components/HomePage/CTAButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../Components/HomePage/CodeBlocks";
import TimelineSection from "../Components/HomePage/TimelineSection";
import LearningLanguageSection from "../Components/HomePage/LearningLanguageSection";
import InstructorSection from "../Components/HomePage/InstructorSection";
import ExploreMore from "../Components/HomePage/ExploreMore";
import Footer from "../Components/Common/Footer";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* section 1 */}
      <section className="text-white relative mx-auto  flex flex-col w-11/12 justify-between items-center max-w-maxContent">
        {/* btn */}
        
        <Link to={"/signup"}>
          <button className="group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-semibold text-richblack-200 trasition-all duration-200 hover:scale-95 ">
            <div className="flex  items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <BiSolidRightArrowAlt  />
            </div>
          </button>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7 ">
          Empower Your Future With <HighlightText text={"Coding Skills"} />
        </div>

        <div className="w-[80%] text-center text-md font-semibold text-richblack-300 mt-4 ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
            <BiSolidRightArrowAlt />
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div
          className="mx-3 my-12 shadow-blue-200 "
          style={{
            boxShadow:
              "15px 15px 0px 5px white , -8px -11px 30px -14px   rgb(173, 216, 230)",
          }}
        >
          <video muted loop autoPlay>
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div className="flex items-center ">
          <CodeBlocks
            postion={"lg:flex-row codeSection1"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"Coding Potential"} /> with our
                online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              text: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              text: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html> 
        head><title>Example<title>
        <linkrel="stylesheet"href="styles.css">
        /head>
        body>
        h1><ahref="/">Header</a>/h1>
        nav><ahref="one/">One</a><ahref="two/">Two</a>
        <ahref="three/">Three</a>
        /nav>
        `}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* code section 2 */}
        <div className="w-full">
          <CodeBlocks
            postion={"lg:flex-row-reverse codeSection1"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text={"Coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              text: "Continous Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              text: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html> 
        head><title>Example<title>
        <linkrel="stylesheet"href="styles.css">
        /head>
        body>
        h1><ahref="/">Header</a>/h1>
        nav><ahref="one/">One</a><ahref="two/">Two</a>
        <ahref="three/">Three</a>
        /nav>
        `}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* this is for cards with click bar */}
        <ExploreMore />
      </section>

      {/* section 2 white bg */}
      <section className="w-full bg-pure-greys-5 text-richblack-700 pb-24 mt-10">
        {/* line wali img wala */}
        <div className="w-full homepage_bg h-[310px]">
          <div className="lg:w-11/12 section2HomePageBg w-full max-w-maxContent flex h-full items-center justify-center gap-5 mx-auto">
            {/* two btn */}
            <div className="flex gap-7  text-white ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex gap-2 items-center">
                  Explore Full catalog
                  <BiSolidRightArrowAlt className="font-bold " />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12  max-w-maxContent mx-auto flex flex-col items-center justify-between">
          {/* first part */}
          <div className="flex lg:flex-row flex-col section2FirstPart  gap-10 mt-20 mb-20">
            {/* left part */}
            <div className="lg:w-[45%] w-[90%] section2Skills text-4xl font-semibold ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            {/* right part */}
            <div className="lg:w-[45%] w-[90%] section2Skills font-semibold flex flex-col gap-10 items-start">
              <p>
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>

              <CTAButton active={true} linkto={"/singhup"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          {/* second part */}
          <TimelineSection />

          {/* third part */}
          <LearningLanguageSection />
        </div>
      </section>

      {/* section 3 */}
      <section className="w-11/12 mx-auto mt-6 max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white  ">
        <InstructorSection />

        <h2 className="text-center text-4xl font-semibold mt-10">
          Review from other Learners
        </h2>

        {/* review sliders wala div */}
        <div></div>
      </section>

      {/* footer  */}
      <Footer />
    </div>
  );
}

export default Home;
