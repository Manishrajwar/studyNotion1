// !   sendOTP
const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");

// ! sendOTP
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req.body
    const { email } = req.body;

    //    check user already exist or not
    const checkUserPresent = await User.findOne({ email: email });
    //    if user exist already
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "user already registered",
      });
    }

    //    generate otp using package otp-generator
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp generated : ", otp);

    //  ! this is bekar code because we have to every time in db ... so in company we use libary not here
    //  check unique otp or not
    const result = await OTP.findOne({ otp: otp });

    // otp match
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }


    //  create an entry in db
    const otpBody = await OTP.create({ email, otp });
    console.log(`otpbody `, otpBody);

    return res.status(200).json({
      success: true,
      message: "otp send successfully ",
      otp,
    });
  } catch (error) {
    console.log(`error in sendOTP `, error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//! signup

exports.signup = async (req, res) => {
  try {
    // data fetch from req.body
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // validate data
    if (
      !firstName ||
      !lastName ||
      !confirmPassword ||
      !password ||
      !otp ||
      !email
    ) {
      return res.status(403).json({
        success: false,
        message: "all field are require",
      });
    }

    // 2 password match
    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        message:
          "password and confirmpassword vlaue does not match , please try again",
      });
    }
    // check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user is alreay registered",
      });
    }

    // find most recent otp stored for user
    // ! this code will return the newest otp on the basis of createdAt and -1 return an document in decending order and limit(1) return only first(one) otp
    const recentOtp = await OTP.findOne({ email:email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(`recentOtp `, recentOtp);

    // valid otp
    if (!recentOtp) {
      // otp not found
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    }
     else if (otp != recentOtp.otp)
      {
      return res.status(400).json({
        success: false,
        message: `invalid otp`,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // entry create in db
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // return res
    return res.status(200).json({
      success: true,
      message: `user is registered successfullly`,
      user,
    });
  } catch (error) {
    console.log(`error in signup `, error);
    return res.status(500).json({
      success: false,
      message: "user cannot be register please try again",
    });
  }
};

// !login
exports.login = async (req, res) => {
  try {
    //  get data from req.body
    const { email, password } = req.body;

    //  validation data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: `all fields are required ,please try again`,
      });
    }
    // user check exist of not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `please register before login`,
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };
    // password match and generate jwt
    if (await bcrypt.compare(password, user.password)) {
      //  creating token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      // todo: toObject ki jrurt ho skti hai fat skta hai
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // create cookie and send response
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `login successfully`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `password inccorrect`,
      });
    }
  } catch (error) {
    console.log(`error in login `, error);
    return res.status().json({
      success: false,
      message: ` login failure , please try again `,
    });
  }
};

// !changePassword
exports.changePassword = async (req, res) => {
  try {
    // fetch data from req.body
    console.log("start");
    const { currentPassword, newPassword } = req.body;

    if(!currentPassword || !newPassword){
      return res.json({
        success:false,
        message:"please fill all the data"
      })
    }

    const userId = req.user.id;
    console.log("userId" , userId);

    const userDetails = await User.findOne({_id:userId});
    console.log("userDetails" , userDetails);

    if (await bcrypt.compare(currentPassword, userDetails.password)) {
      // hash the password
      console.log("iinsde if");
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // update user password by finding using email
      await User.findOneAndUpdate(
        {
          _id:userId
        },
        { password: hashedPassword },
        {
          new: true,
        },
      );

      // send mail -> password change
      try {
        const mailResponse = await mailSender(
          userDetails.email,
          `confirm change password from studyNotion`,
          `your password has been successfully changed`
        );
        console.log(
          "password change successfully-> mailResponse ",
          mailResponse
        );
      } catch (error) {
        console.log(`error occur while sending password change mail  `, error);
        throw error;
      }
    }
    else{
      return res.json({
        success:false,
        message:"your currentPassword is wrong",
      })
    }

    return res.status(200).json({
      success: true,
      message: `password change successfully`,
    });
  } catch (error) {
    console.log(`error in changing the password `, error);
    return res.status(500).json({
      success: false,
      message: `cannot reset password , please try again`,
    });
  }
};
