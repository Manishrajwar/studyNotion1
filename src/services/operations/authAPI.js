import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../reducer/slices/authSlice";
import { resetCart } from "../../reducer/slices/cartSlice";
import { setUser } from "../../reducer/slices/profileSlice";
import { endpoints } from "../api";
import {
  makeAuthenticatedPOSTRequest,
  makeUnauthenticatedPOSTRequest,
} from "../serverHelper";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  
} = endpoints;

// !send otp
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loadings..");
    dispatch(setLoading(true));
    try {
      const response = await makeUnauthenticatedPOSTRequest(SENDOTP_API, {
        email,
      });
      console.log(`email response `, response);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success("OTP Sent Successfully");
        navigate("/verify-email");
      }
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// ! signup
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await makeUnauthenticatedPOSTRequest(SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success("Signup Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// ! login
export function login(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await makeUnauthenticatedPOSTRequest(
        LOGIN_API,
        formData
      );

      if (!response.success) {
        throw new Error(response.data.message);
      } else {
        toast.success("login Successfully");
        dispatch(setToken(response.token));
      }

      const userImage = response.image
        ? response.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.user.firstName} ${response.user.lastName}`;
      dispatch(setUser({ ...response.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard/my-profile")

    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// ! resetPasswordToken
export function getPasswordResetToken(email, setEmailSend) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await makeUnauthenticatedPOSTRequest(
        RESETPASSTOKEN_API,
        { email }
      );
      console.log("reset token response ", response);
      if (!response.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Email Sent");
      setEmailSend(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed To Send Reset Email");
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

//! reset Password
export function resetPassword(
  newPassword,
  confirmNewPassword,
  token,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await makeAuthenticatedPOSTRequest(
        RESETPASSWORD_API,
        { newPassword, confirmNewPassword, token },
        token
      );

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success("Password Reset Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error);
      toast.error("Failed To Reset Password");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

// ! logout
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
