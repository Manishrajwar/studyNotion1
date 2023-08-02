import { Link } from "react-router-dom";

function CTAButton({children , active , linkto }){
 return (
    <Link to={linkto}>
         <div className={`ctabutton ${active?('bg-yellow-50 text-black'):('bg-richblack-800 text-white')} text-center px-6 py-3 rounded-md font-bold flex items-center hover:scale-95 transition-all duration-200 ctabutton shadow-inner -mx-2 -my-2`}
          style={{
            boxShadow:'0 0 3px white , 0 0 #161D29 '
         }}>
            {children}
         </div>
    </Link>
 )
}

export default CTAButton;