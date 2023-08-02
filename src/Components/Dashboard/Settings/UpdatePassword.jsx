import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../services/operations/settingAPI";


function UpdatePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const {user} = useSelector((state)=>state.profile);

  const [loading , setLoading] = useState(false);
  const dispatch = useDispatch();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });


  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };


 const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(changePassword(formData ,user?.token , setLoading)).then(()=>
    setFormData({
        currentPassword:"",
        newPassword:""
    }))
 }
  
  return (
    <div>

    <div className="h-[200px] w-full bg-richblack-700 pt-5 pl-5 pr-5 flex flex-col gap-5">
      <h1 className="font-bold text-3xl text-white ">Password</h1>

      
        {/* left */}
        <div className=" flex flex-row gap-5">
         
            <label className="relative w-[50%]">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                current Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleOnChange}
                placeholder="Enter current Password"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                />
              <span
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                {showCurrentPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        )}
              </span>
            </label>
            <label className="relative w-[50%]">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleOnChange}
                placeholder="enter new Password"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                {showNewPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        )}
              </span>
            </label>
      </div>
      </div>

      <div className="w-full justify-end mt-4  flex flex-row gap-4">
          <button
            type="button"
            className="rounded-md bg-richblack-600  w-fit px-6 text-[16px] font-bold py-4 text-white"
            >
            cancel
          </button>

          <button onClick={submitHandler}
            
            className="rounded-md bg-yellow-50  w-fit px-6 text-[16px] font-bold py-4 text-black"
            >
           {loading?(
         <span>Updating...</span>
           ):( <span>Update</span> )}
          </button>
              </div>
                </div>
  );
}

export default UpdatePassword;
