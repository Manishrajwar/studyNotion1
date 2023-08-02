import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import { getPasswordResetToken } from "../services/operations/authAPI";


function ForgetPassword() {
    const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const [emailSend, setEmailSend] = useState(false);
  const [email , setEmail] = useState("");



//   for form submit 
function submitHandler(event){
    event.preventDefault();

 dispatch(getPasswordResetToken(email , setEmailSend));

}

  return (
    <div className="w-full text-white flex justify-center flex-col gap-5 items-center min-h-[calc(100vh-3.5rem)] h-full">
      {loading ? (
        <div className="spinner"></div>
      ) : (
          
          <div className="flex max-w-[508px] flex-col gap-[36px]">
            <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{!emailSend ? "Reset Your Password" : "Check your Email"}</h1>

          <p className="text-richblack-100 max-w-[90%]">
            {!emailSend
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

              </div>
          <form onSubmit={submitHandler} className="flex flex-col ">
            {!emailSend && (
              <label>
                <p>Email Address</p>
                <input
          required
          type="text"
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-[90%] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
              </label>
            )}

<button  type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] w-[90%] hover:scale-95 transition-all duration-200 font-bold   text-richblack-900" > {
    emailSend?('Resend Email'):('Reset Password')
} </button>
          </form>

          <div className="text-left">
            <Link to="/login">
                <div className="flex gap-2 items-center hover:text-blue-300 transition-all duration-150 mt-[-20px]">
<p><BsArrowLeft/></p>
              <p>  Back to login</p>
                </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
