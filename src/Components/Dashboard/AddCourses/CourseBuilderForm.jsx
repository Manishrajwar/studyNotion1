import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiSkipNext } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../reducer/slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../services/operations/courseDetailAPI";

function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  // !  it will contain our section Id
  const [editSectionName, setEditSectionName] = useState(null);

  const { course } = useSelector((state) => state.course);


  // ! cancel edit button
  const cancelEdit = async () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  // ! back button handler
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };


  // ! go to next button handler
  const goToNext = () => {
    if (course?.courseContent.length === 0) {
      toast.error("please add atleast one section");
      return;
    }
    if (
      course?.courseContent.some((section) => section?.subSection.length === 0)
    ) {
      toast.error("please add atleast one lecture in each section ");
      return;
    }

    //    everything is good
    dispatch(setStep(3));
  };


  // ! on submit 
  const submitHandler = async (data) => {


    setLoading(true);
    let result;

    if (editSectionName) {
      console.log("inside editsectionName ");
      // we are editing the section Name
      console.log("edit section Name" , editSectionName);
      console.log("courseId " , course._id);
      console.log("sectionName" , data.sectionName);
        result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
           courseId:course._id,
          
        },
        token
      );
    } else {
      console.log("inside else condition ");
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
        );
      }
      
      // update values
      console.log("result" ,result);
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
          setValue("sectionName", "");
    }

    // loading false
    setLoading(false);
  };


  // * handle chnage edit secction Name
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="text-white font-bold text-xl">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="sectionName">
            section Name <sup>*</sup></label>
            <input
            
              id="sectionName"
              placeholder="Add section Name"
              {...register("sectionName", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.sectionName && (<span>section Name is required</span>)}
          
        </div>
        <div className="mt-10 flex items-center gap-6">
          <button type="submit">
            {editSectionName ? (
              <span className="flex items-center gap-3 text-yellow-25 px-2 py-2 border-2 rounded-md ">
                {" "}
                <span>
                  <AiOutlinePlusCircle className="text-yellow-25 " />
                </span>{" "}
                Edit section Name
              </span>
            ) : (
              <span className="flex items-center gap-3 text-yellow-25 px-2 py-2 border-2 rounded-md ">
                {" "}
                <span>
                  <AiOutlinePlusCircle className="text-yellow-50" />
                </span>{" "}
                create Section
              </span>
            )}
          </button>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

{/* buttons  */}
      <div className="flex justify-end gap-x-3 mt-10">
        <button onClick={goBack} className=" " >Back</button>
        <button onClick={goToNext} className="flex items-center gap-1 px-2 py-2 rounded-lg text-black border-2 bg-yellow-25">
          Next
          <span className="text-black "> <BiSkipNext className="text-3xl" /></span> 
        </button>
      </div>
    </div>
  );
}

export default CourseBuilderForm;
