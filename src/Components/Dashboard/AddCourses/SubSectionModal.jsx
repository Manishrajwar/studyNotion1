import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toast } from "react-hot-toast";
import { setCourse } from "../../../reducer/slices/courseSlice";
import { updateSubSection , createSubSection } from "../../../services/operations/courseDetailAPI";
import { RxCross1 } from "react-icons/rx";
import IconButton from "../../../Components/Common/IconButton"
import Upload from "./Upload";

function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);

  const { token } = useSelector((state) => state.auth);


  // !  useEffect
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);


  // ! is form updated 
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  // ! handle edit sub section
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    formData.append("courseId" , course._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);

    // API CALL
    const result = await updateSubSection(formData, token);

    if (result) {
    
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  };

  // ! onsubmit
  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      console.log("inside the eedit");
      if (!isFormUpdated) {
        console.log("inside isformupdated if");
        toast.error("no changes made to the form ");
        
      } else {
        // edit krdo store mai
        console.log("else");
        handleEditSubSection();
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    formData.append("courseId" , course._id);
    setLoading(true);

    //  API CALL
    const result = await createSubSection(formData, token);

    if (result) {
      // TODO: check for updation
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div>
      <div>
        <div>
          <p>
            {view && "viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Upload 
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div >
            <label htmlFor="lectureTitle">Lecture title</label>
            <input
              id="lectureTitle"
              placeholder="Enter lecture Title"
              {...register("lectureTitle", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
            {errors.lectureTitle && <span>Lecture title is required</span>}
          </div>
          <div>
            <label htmlFor="LectureDescription">Lecture Description</label>
            <textarea name="lectureDesc" id="lectureDesc"  placeholder="Enter lecture description" {...register("lectureDesc" , {required:true})}     style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] min-h-[130px] resize-none text-richblack-5" />{
                errors.lectureDesc && (
                    <span>Lecture Description is required</span>
                )
            }
          </div>

          {
            !view && (
                <div>
                    <IconButton type={'submit'} text={loading?'Loading...':edit?"save changes":"save"}/> 
                </div>
            )
          }
          
        </form>
      </div>
    </div>
  );
}

export default SubSectionModal;
