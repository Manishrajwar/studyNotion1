import "./App.css";
import {Route, Routes } from "react-router-dom";
import Home from "./Pages/Home"
import Navbar from "./Components/Common/Navbar"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import OpenRoute from "./Components/authentication/OpenRoute";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import MyProfile from "./Components/Dashboard/MyProfile";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/authentication/PrivateRoute";
import Error from "./Pages/Error";
import Settings from "./Components/Dashboard/Settings";
import EnrolledCourses from "./Components/Dashboard/EnrolledCourses.jsx/EnrolledCourses";
import Cart from "./Components/Dashboard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constant";
import AddCourse from "./Components/Dashboard/AddCourses/AddCourse";
import MyCourses from "./Components/Dashboard/MyCourses/MyCourses"
import EditCourse from "./Components/Dashboard/EditCourse/EditCourse";
import Catalog from "./Pages/Catalog";


function App() {
  const {user} = useSelector((state)=>state.profile);
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route
          path="/signup" 
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
    <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgetPassword />
            </OpenRoute>
          }
        />
    <Route
          path="/update-password/*"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
    <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
    <Route
          path="/about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        /> 

         <Route  element={ <PrivateRoute>  <Dashboard/>  </PrivateRoute> }>
        <Route path="/dashboard/my-profile" element={<MyProfile/>} />
        <Route path="dashboard/Settings" element={<Settings />} /> 

 {
  user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <>
    <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
    <Route path="dashboard/cart" element={<Cart />} />
    </>
  )
} 
 
{
  user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
    <>
    <Route path="dashboard/my-courses" element={<MyCourses />} />
    <Route path="dashboard/add-course" element={<AddCourse />}  />
    <Route path="dashboard/edit-course/:courseId" element={<EditCourse />}  />
    </>
  )
} 

        </Route> 

         <Route path="*" element={<Error/>} /> 
     </Routes> 

   </div>
  );
}

export default App;
