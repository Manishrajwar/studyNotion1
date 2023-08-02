import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import { IoIosTimer } from 'react-icons/io';
import OtpInput from "react-otp-input";


function VerifyEmail(){
    const {loading , signupData} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
       const [otp , setOtp] = useState("");
       const dispatch = useDispatch();


    //    so when we refresh we will go to automatically to signup page with this line of code 
       useEffect(()=>{
      if(!signupData){
        navigate("/signup");
      }
       },[])

       function submitHandler(event){
     event.preventDefault();

     const {accountType , firstName , lastName , email , password , confirmPassword} = signupData;
     dispatch(signUp(accountType , firstName , lastName , email , password , confirmPassword , otp , navigate));

       }
return (
    <div  className="w-full min-h-[calc(100vh-3.5rem)] flex justify-center items-center">

    <div className="text-white max-w-[508px]">
       {
           loading?(
            <div className="spinner"></div>
            ):(
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">

                <h1 className="text-3xl">Verify Email</h1>
                <p className="text-richblack-100">A verification code has been sent to you. Enter the code below</p>

                </div>
                <form onSubmit={submitHandler} className="flex flex-col text-white ">
                <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
                
                <button
          type="submit"
          className="mt-6 rounded-[8px] font-bold bg-yellow-50 py-[8px] px-[12px] hover:scale-95 transition-all duration-200  text-richblack-900">
          Verify Email
        </button>
                              </form>
            
            <div className="flex justify-between items-center">
            <div className="text-left">
            <Link to="/login">
                <div className="flex gap-2 items-center hover:text-blue-300 transition-all duration-150 ">
<p><BsArrowLeft/></p>
              <p>  Back to login</p>
                </div>
            </Link>
          </div>

          <button className="text-blue-200" onClick={()=>dispatch(sendOtp(signupData.email,  navigate))}>
            <div className="flex gap-2 items-center">
                <IoIosTimer/>
                <p>
            Resend it
                </p>
            </div>
            </button>

            </div>
            </div>
        )
    }
    </div>
    </div>
)
}

export default VerifyEmail;