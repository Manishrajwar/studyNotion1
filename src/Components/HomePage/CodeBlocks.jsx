import CTAButton from "./CTAButton";
import { BiSolidRightArrowAlt } from "react-icons/bi";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
  postion,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor,
}) {
  return (
    <div className={`flex ${postion} my-20 justify-between gap-10 `}>
      {/* section 1 */}
      <div className="flex lg:w-[50%] codeBlockSec1 flex-col gap-8">
        <h1 className="codeBlockSec1Heading">{heading}</h1>
        <div className="text-richblack-300 font-bold ">{subheading}</div>

        <div className="flex gap-6 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
             <p className="ctaButtonText"> {ctabtn1.text}</p>
              <BiSolidRightArrowAlt />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div className="flex  items-center">
            <p >  {ctabtn2.text}</p>
            </div>
          </CTAButton>
        </div>
      </div>

      {/* section 2 */}

      <div className="flex  h-fit py-4 lg:w-[500px] codeBlockSec2 ">
        {/* bg gradient hw */}

{/* numbering */}
        <div className="flex flex-col text-center w-[10%] text-richblack-400 font-inter font-bold">
<p>1</p>
<p>2</p>
<p>3</p>
<p>4</p>
<p>5</p>
<p>6</p>
<p>7</p>
<p>8</p>
<p>9</p>
<p>10</p>
        </div>

 <div className={`w-[90%] flex relative flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
    <p className=" rounded-full absolute w-[70%] h-[70%] opacity-30" style={{ background:' linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,120,9,1) 34%, rgba(0,212,255,1) 100%)'  , filter: 'blur(50px)' 
}}>this is me</p>
  <TypeAnimation
  sequence={[codeblock , 2000 , ""]}
  repeat={Infinity}
omitDeletionAnimation={true}
cursor={true}
style={{
    display:"block",
    whiteSpace:"pre-line"
}}
/>
 </div>

      </div>
    </div>
  );
}

export default CodeBlocks;
