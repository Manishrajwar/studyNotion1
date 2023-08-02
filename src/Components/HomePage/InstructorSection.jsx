import instructor from "../../assets/Images/Instructor.png"
import CTAButton from "./CTAButton";
import HighlightText from "./HighlightText";
import { BiSolidRightArrowAlt } from "react-icons/bi";


function InstructorSection(){
    return (
        <div className="instructorSection w-full mt-16 flex lg:flex-row justify-between items-center ">
              {/* left */}
              <div className="lg:w-[50%] instructorSectionLeft">
           <img loading="lazy" style={{
            boxShadow:
              "-15px -15px 0px 5px white ",
          }} src={instructor} alt="instructor" className="shadow-white" />
              </div>
              {/* right */}
              <div className="lg:w-[45%] instructorSectionRight flex flex-col gap-6 ">
                <p className="text-4xl font-semibold instructorSectionRightHeading lg:w-[50%]">Become An  
                    <HighlightText text={' Instructor'} /> </p>
                    <p className="text-richblack-300  font-medium text-[16px] lg:w-[80%]">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

<div className="flex mt-12">

              <CTAButton active={true} linkto={'signup'} >
                Start Teaching Today 
                <BiSolidRightArrowAlt/>
              </CTAButton>
</div>
              </div>

        </div>
    )
}

export default InstructorSection;