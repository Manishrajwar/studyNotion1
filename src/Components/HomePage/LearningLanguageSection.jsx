import HighlightText from "./HighlightText";
import know_your_progress from "../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../assets/Images/Compare_with_others.png"
import Plan_your_lessons from "../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./CTAButton";

function LearningLanguageSection(){
    return (
        <div className="w-full learningSection lg:mt-[12%] flex flex-col gap-5 items-center">

        <p className="text-4xl font-semibold learningSectionHeading lg:text-center ">
        Your swiss knife for <HighlightText text={'learning any language'} /> 
        </p>

        <p className="lg:text-center lg:max-w-[80%] lg:w-[55%] learningSectionDescription text-richblack-600 mx-auto text-base">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

        {/* for three cards */}
        <div className="flex lg:flex-row learningSectionCards items-center w-[70%] max-w-[70%] justify-center mt-5">
            <img loading="lazy" className="object-contain learningSectionCard1 lg:mr-[-130px]" src={know_your_progress} alt="know_your_progress" />
            <img loading="lazy" src={compare_with_others} alt="compare_with_others" className="object-contain learningSectionCard2" />
            <img loading="lazy" src={Plan_your_lessons} alt="Plan_your_lessons" className="object-contain lg:ml-[-130px] learningSectionCard3" />

        </div>

    {/* btn */}
    <CTAButton active={true} linkto={"/signup"} >Learn More</CTAButton>

        </div>
    )
}

export default LearningLanguageSection;