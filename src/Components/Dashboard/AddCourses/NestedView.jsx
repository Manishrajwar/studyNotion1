import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../services/operations/courseDetailAPI";
import { setCourse } from "../../../reducer/slices/courseSlice";
import ConfirmationModal from "../../Common/ConfirmationModal";

function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);


  // ! handleDeleteSection
  const handleDeleteSection =async (sectionId) => {
    const result = await deleteSection({
        sectionId ,
        courseId:course._id ,
        
    } , token)

    if(result){
        dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  };

  // ! handleDeleteSubSection
  const handleDeleteSubSection =async (subSectionId, sectionId) => {
    const courseId = course._id;
    const result =await deleteSubSection({subSectionId , sectionId ,courseId } , token);

    if(result){
        dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  };

  return (
    <div className="mt-10 ">
      <div className="rounded-lg bg-richblack-700 p-6 px-8 text-black flex flex-col gap-4">
        {course?.courseContent?.map((section) => (
          <details className="text-white " key={section._id} open>
            <summary className="flex items-center justify-between gap-x-3 border-b-2">
              <div className="flex flex-row gap-2">
                <RxDropdownMenu className=" text-white" />
                <p>{section.sectionName}</p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section ",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line />
                </button>
                <span>|</span>
                <BiSolidDownArrow className="text-xl text-richblack-300" />
              </div>
            </summary>

            {/* subSection map function   */}
            <div>
              {section?.subSection.map((data) => {
                return (
                  <div
                    key={data?._id}
                    
                    className="flex items-center justify-between gap-x-3 border-b-2 "
                  >
                    <div onClick={() => setViewSubSection(data)} className="flex flex-row gap-2">
                      <RxDropdownMenu className=" text-white" />
                      <p>{data.title}</p>
                    </div>

                    <div className="flex items-center gap-x-3">
                      <button
                        onClick={() =>
                          setEditSubSection({ ...data, sectionId: section._id })
                        }
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this subsection  ",
                            text2: "selected lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                );
              })}

              <button onClick={()=>setAddSubSection(section._id)} className="mt-4 flex items-center gap-x-2 text-yellow-50">
<AiOutlinePlus/>
<p>Add Lecture </p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {
        addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />):viewSubSection?(<SubSectionModal 
            modalData={viewSubSection} setModalData={setViewSubSection} view={true} />):editSubSection?(<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />):(<div></div>)

        }
        {confirmationModal?(<ConfirmationModal modalData={confirmationModal}  />):(<div></div> )}
    </div>
  );
}

export default NestedView;
