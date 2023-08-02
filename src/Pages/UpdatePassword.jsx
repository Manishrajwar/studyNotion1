import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import { resetPassword } from "../services/operations/authAPI";


function UpdatePassword(){
    const {loading } = useSelector((state)=>state.auth);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData , setFormData] = useState({
        newPassword:"",
        confirmNewPassword:""
    })

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

      const {newPassword , confirmNewPassword} = formData;
    
      function submitHandler(event){
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
      
        dispatch(resetPassword(newPassword , confirmNewPassword , token , navigate));

      }

    return (
        <div className="w-full min-h-[calc(100vh-3.5rem)] flex justify-center items-center">

        <div className="text-white  max-w-[508px]">
           {
            loading?(
                <div className="spinner">

                </div>
            ):(<div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl ">Choose new Password</h2>
                  <p className="text-richblack-100">Almost done. Enter your new password and youre all set.</p>
                </div>

                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
              {showConfirmPassword ? (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      )}
            </span>
          </label>
          <button
          type="submit"
          className="mt-6 rounded-[8px] font-bold bg-yellow-50 py-[8px] px-[12px] hover:scale-95 transition-all duration-200  text-richblack-900">
          Reset Password
        </button>
                </form>
                <div className="text-left">
            <Link to="/login">
                <div className="flex gap-2 items-center hover:text-blue-300 transition-all duration-150 mt-[-20px]">
<p><BsArrowLeft/></p>
              <p>  Back to login</p>
                </div>
            </Link>
          </div>
            </div>)
           }
        </div>
           </div>
    )
}

export default UpdatePassword;