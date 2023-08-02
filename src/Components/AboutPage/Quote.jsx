import HighlightText from "../HomePage/HighlightText";

function Quote(){
    return (
        <div className="w-full - h-full mt-[130px] text-3xl mb-20 font-bold text-center ">
     We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={` combines technology,`} /> 
     <span className="text-orange-400" 
     style={{
        background: "linear-gradient(to right, #FF512F, #F09819)",
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent"
     }}>
        {" "} expertise,</span> and community to create an <span   style={{
        background: "linear-gradient(to right, #E65C00, #F9D423)",
        "WebkitBackgroundClip": "text",
        "WebkitTextFillColor": "transparent"
     }}> unparalleled educational experience.</span> 
        </div>
    )
}

export default Quote;