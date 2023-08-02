import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../reducer/slices/courseSlice";
import { COURSE_STATUS } from "../../../utils/constant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../services/operations/courseDetailAPI";

function CoursePublishForm(){

    const {register , handleSubmit, setValue , getValues } = useForm();
    const dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);

    const [loading ,setLoading] = useState(false);

const navigate = useNavigate();

    useEffect(()=>{
 if(course?.status === COURSE_STATUS.PUBLISHED){
    setValue("public" , true);
 }
    },[])
    
    // ! go back funtion 
    const goBack = ()=>{
        dispatch(setStep(2));
        
    }
   
// ! goToCourses
    const goToCourses = ()=>{
        console.log("Go to course inside");
  dispatch(resetCourseState());
 navigate("/dashboard/my-courses");
    }

    // ! handleCoursePublish
    const handleCoursePublish = async()=>{
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public")===true) || (course?.status ===COURSE_STATUS.DRAFT && getValues("public")===false)){
            // no updation in form 
            // no need to make api call
            console.log("inside if ");
            goToCourses();
            return ;
        } 

        // if form is updated 
        const formData = new FormData();

        formData.append("courseId" , course._id);
        const courseStatus = getValues("public")?COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        console.log("courseStatus" , courseStatus);

        formData.append("status" , courseStatus);

        setLoading(true);
        console.log("formdata" ,formData);
        
       const result = await editCourseDetails(formData , token);
       console.log("result " , result);

       if(result){
        goToCourses();
       }
setLoading(false);
    }
    
    // ! onSubmit
    const onSubmit = (event)=>{
        event.preventDefault();
        console.log("enter onsubmit funtion ");
       handleCoursePublish();
    }
return (
    <div className="rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 ">
        <p>Publish Course</p>
             <form onScroll={handleSubmit(onSubmit)}>
                <div>
                    <label  htmlFor="public"  >

                    <input type="checkbox" id="public" {...register("public")} className="rounded h-4 w-4"  />
                    <span className="ml-3">Make this course as public</span>
                    </label>
                </div>


{/* two  buttons */}
                <div className="flex justify-end gap-x-3 mt-10">
        <button onClick={goBack} type="button" className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900" >Back</button>
        <button type="submit" onClick={handleCoursePublish} disabled={loading} className="flex items-center gap-1 px-2 font-bold  py-2 rounded-lg text-black border-2 bg-yellow-25">
          save Changes
        </button>
      </div>
             </form>
    </div>
)
}

export default CoursePublishForm;