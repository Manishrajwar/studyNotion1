import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getFullDetailsOfCourse} from "../../../services/operations/courseDetailAPI"
import {setCourse, setEditCourse} from '../../../reducer/slices/courseSlice'
import RenderSteps from "../AddCourses/RenderStep"

function EditCourse(){

    const dispatch = useDispatch();
    const {courseId} =useParams();

    console.log(`courseId`, courseId); 

    const {course} = useSelector((state)=>state.course);
    const [loading , setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

  useEffect(()=>{
 const populateCourseDetails = async()=>{
    setLoading(true);
    const result = await getFullDetailsOfCourse(courseId , token);
    if(result?.courseDetails){
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));

    }
    setLoading(false);
 }

 populateCourseDetails();
  },[])

 if(loading){
    return (
        <div className="spinner"></div>
    )
 }

 return  (
    <div className="text-white">
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">
      Edit Course
    </h1>
    <div className="mx-auto max-w-[600px]">
      {course ? (
        <RenderSteps />
      ) : (
        <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
          Course not found
        </p>
      )}
    </div>
  </div>
 )
}

export default EditCourse;