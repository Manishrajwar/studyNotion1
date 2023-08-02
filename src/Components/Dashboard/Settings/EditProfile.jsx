import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { changeProfile } from "../../../services/operations/settingAPI";

function EditProfile() {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    dateOfBirth: `${user?.additionalDetails?.dateOfBirth?(user?.additionalDetails?.dateOfBirth):("")}`,
    gender: `${user?.additionalDetails?.gender?(user?.additionalDetails?.gender):('')}`,
    contactNumber:  `${user?.additionalDetails?.contactNumber?(user?.additionalDetails?.contactNumber):("")}`,
    firstName: `${user?.firstName}`,
    lastName: `${user?.lastName}`,
    about: `${user?.additionalDetails?.about?(user?.additionalDetails?.about):("")}`,
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }



  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(changeProfile(formData, user?.token, setLoading));
      
  };

  return (
    <div>
      <div className="min-h-[200px] w-full bg-richblack-700 text-white pl-5 pr-5 pt-5 flex flex-col gap-5">
        <h1 className="font-bold text-3xl ">Profile Information</h1>

        <form>
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex gap-5">
              {/* firstName */}
              <div className="flex flex-col gap-2 w-[50%]">
                <label htmlFor="firstName" className="text-left">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder={`${user?.firstName}`}
                  onChange={changeHandler}
                  value={formData.firstName}
                  className="text-white w-full rounded-[0.5rem] bg-richblack-800 p-[12px]"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </div>

              {/* lastName */}
              <div className="flex flex-col gap-2 w-[50%]">
                <label htmlFor="lastName" className="text-left">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  onChange={changeHandler}
                  value={formData.lastName}
                  className="text-white w-full rounded-[0.5rem] bg-richblack-800 p-[12px]"
                  placeholder={`${user?.lastName}`}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </div>
            </div>
            {/* dob */}
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 w-[50%]">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  onChange={changeHandler}
                  placeholder={`${user?.additionalDetails?.dateOfBirth}`}
                  value={formData.dateOfBirth}
                  className="text-white w-full rounded-[0.5rem] bg-richblack-800 p-[12px]"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </div>

              {/* gender */}
              <div className="flex flex-col gap-2 w-[50%]">
                <label htmlFor="gender" className="text-left">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={changeHandler}
                  name="gender"
                  placeholder={`${user?.additionalDetails?.gender}`}
                  className="text-white w-full rounded-[0.5rem] bg-richblack-800 p-[15px] "
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="flex gap-5">
              {/* contact number */}
              <div className="flex flex-col gap-2 w-[50%]">
                <label htmlFor="contactNumber" className="text-left">
                  contact Number
                </label>
                <input
                  type="number"
                  name="contactNumber"
                  onChange={changeHandler}
                  value={formData.contactNumber}
                  placeholder={`${
                    user?.additionalDetails?.contactNumber
                      ? user?.additionalDetails?.contactNumber
                      : "1234567890"
                  }`}
                  className="text-white w-full rounded-[0.5rem] bg-richblack-800 p-[12px]"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </div>

              {/* about */}
              <div className="flex flex-col gap-2 w-[50%]">
                <label htmlFor="about" className="text-left">
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  placeholder={`${
                    user?.additionalDetails?.about
                      ? user?.additionalDetails?.about
                      : "write about your self"
                  }`}
                  onChange={changeHandler}
                  value={formData.about}
                  className="text-white w-full rounded-[0.5rem] bg-richblack-800 p-[12px]"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full justify-end mt-4 flex flex-row gap-4">
        <button
          type="button"
          className="rounded-md bg-richblack-600  w-fit px-6 text-[16px] font-bold py-4 text-white"
        >
          cancel
        </button>

        <button
          onClick={submitHandler}
          className="rounded-md bg-yellow-50  w-fit px-6 text-[16px] font-bold py-4 text-black"
        >
          {loading ? <span>Saving..</span> : <span>Save</span>}
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
