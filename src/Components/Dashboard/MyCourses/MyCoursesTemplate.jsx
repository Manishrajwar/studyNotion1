import { useDispatch, useSelector } from "react-redux";
import { deleteMyCourse, getInstructorMyCourse } from "../../../services/operations/courseAPI";
import { useState } from "react";
import { useEffect } from "react";
import { GiPencil } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { COURSE_STATUS } from "../../../utils/constant";
import { Table, Tbody, Th, Thead, Tr , Td } from "react-super-responsive-table";
import ConfirmationModal from "../../Common/ConfirmationModal"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'


function MyCoursesTemplate() {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [courseData, setCourseData] = useState([]);
  const [flag , setFlag] = useState(false);

  const[confirmationModal , setConfirmationModal] = useState(null);


  // ! get my course funtion
  const getMyCourse = async () => {
    try {
      const response = await dispatch(getInstructorMyCourse(setLoading, token));
      
      setCourseData(response);
    } catch (error) {
      console.log("unablle to fetch the mycoursee data ", error);
    }
  };

  // ! handle on delete 
  const handleOnDelete = async(courseId)=>{
    try{

        const response = await dispatch(deleteMyCourse(setLoading ,courseId , token  ));
        setConfirmationModal(null);
        setFlag((prev)=>!prev);
    }catch(error){
        console.log("unable to delete the mycourse");
    }
  }

  useEffect(() => {
    getMyCourse();
  }, [flag]);

  return (
    <div className="mt-10">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
              <Table>
                <Thead>
                   <Tr className="flex gap-x-10 justify-between border-richblack-800 p-8 ">
                    <Th className=" w-[70%] text-left">
                      Courses
                    </Th>
                    <div className="flex justify-between w-[30%]">
                    <Th>
                      Duration
                    </Th>
                    <Th>
                      Price
                    </Th>
                    <Th>
                      Actions
                    </Th>
                    </div>
                   </Tr>

                </Thead>
                <Tbody>
                {
                  courseData.length===0?(
                    <Tr>
                      <Td>
                        No courses Found
                      </Td>
                    </Tr>
                  ):(
                    courseData.map((course)=>(
                      <Tr key={course._id} className="flex gap-x-10 justify-between border-richblack-800 p-8 "  >
                   <Td className="flex gap-x-4 w-[70%]">
                    <img src={course?.thumbnail} className="h-[150px] w-[220px] rounded-lg object-cover bg-center bg-cover "  />
                    <div className="flex flex-col justify-between">
                <p>{course.courseName}</p>
                <p>{course.courseDescription}</p>
                <p>created: </p>
                {
                  course.status=== COURSE_STATUS.DRAFT?(
                    <p className="text-pink-50 rounded-3xl text-center w-fit px-5  bg-richblack-700">DRAFTED</p>
                  ):(
                    <p className="text-yellow-50 rounded-3xl text-center  w-fit px-5 bg-richblack-700">PUBLISHED</p>
                  )
                }
                    </div>
                   </Td>
                   <div className="flex justify-between w-[30%]">

                   <Td>
                    2hr 30min
                   </Td>
                   <Td>
                    {course?.price}
                   </Td>
                   <Td >

                    {/* two buttons  */}
                    <div className="flex gap-5">

                    <button onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)} disabled={loading}  >
                      <GiPencil className="hover:scale-150 transition-all duration-200 text-xl hover:text-blue-300" />
                    </button>
                    <button  disabled={loading} onClick={()=>setConfirmationModal({
                      text1:"Do you want to delete this course" ,
                      text2:"All the data related to this course will be deleted",
                      btn1Text:"Delete",
                      btn2Text:"cancel" , 
                      btn1Handler:!loading?()=>handleOnDelete(course._id):()=>{},
                      btn2Handler:!loading?()=>setConfirmationModal(null):()=>{},
                    })} >
                   <RiDeleteBin6Line className="hover:scale-150 trasition-all duration-200 text-xl hover:text-pink-400" />
                    </button>
                      </div>
                   </Td>
                      </div>
                      </Tr>
                    ))
                  )
                }
                </Tbody>
              </Table>
              {
                confirmationModal && <ConfirmationModal modalData = {confirmationModal}/>
              }
            </div>
         
          
      )}
    </div>
  );
}

export default MyCoursesTemplate;
