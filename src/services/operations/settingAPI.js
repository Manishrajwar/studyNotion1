import { setLoading } from "../../reducer/slices/authSlice";
import { settingsEndpoints } from "../api";
import { Toast, toast } from "react-hot-toast";
import { makeAuthenticatedDELETERequest, makeAuthenticatedPUTRequest } from "../serverHelper";
import axios from "axios";
import {  setToken } from "../../reducer/slices/authSlice";
import { setUser } from "../../reducer/slices/profileSlice";


const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

// ! update profile picture
export function updateDisplayPicture( formData) {
    return async (dispatch) => {
      const toastId = toast.loading("loading");
    try {
      const formData = new FormData();
      formData.append("displayPicture", formData);

      // Make a POST request to the backend endpoint to upload the file
      const response = await axios.put(UPDATE_DISPLAY_PICTURE_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };

}

// ! change password
export function changePassword(formData, token, setLoading) {
  return async () => {
    const toastId = toast.loading("loading");
    setLoading(true);
    try {
      const response = await makeAuthenticatedPUTRequest(
        CHANGE_PASSWORD_API,
        formData,
        token
      );
      console.log(`response`,response);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success("successfully change password");
      }
    } catch (error) {
      console.log(error);
      toast.error("error to change password");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
}


// ! changeProfile
export function changeProfile(formData , token , setLoading){
  return async()=>{
    const toastId = toast.loading("loading...");
    setLoading(true);
    try{
      const response = await makeAuthenticatedPUTRequest(UPDATE_PROFILE_API , formData , token);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success("successfully change password");
      }
    } catch(error){
      console.log(error);
      toast.error("error to change password");
    
    }
     setLoading(false);
    toast.dismiss(toastId);
  }
}


// ! delete account
export function deleteAccount(token , navigate ){
  return async(dispatch)=>{

    const toastId = toast.loading("loading");
    try{
      const response = await makeAuthenticatedDELETERequest(DELETE_PROFILE_API , token);

if(!response.success){
  toast.error(response.message);
}
else{
  toast.success("successfully deleted account");

}
    } catch(error){
      console.log(error);
      toast.error("error to change password");
    
    }
    toast.dismiss(toastId);
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
}