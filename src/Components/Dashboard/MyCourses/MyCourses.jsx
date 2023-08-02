import { useNavigate } from "react-router-dom";
import MyCoursesTemplate from "./MyCoursesTemplate";
import {GrAddCircle} from "react-icons/gr";

function MyCourses(){

    const navigate = useNavigate();
    return (
        <div className="text-white flex flex-col mx-auto">
            <div className="flex justify-between items-center">
           <h1 className="text-3xl font-bold ">My Courses</h1>
 <button onClick={()=>navigate("/dashboard/add-course")} className="flex gap-2 items-center bg-yellow-25 px-4 py-2 rounded-lg">
    <GrAddCircle/>
    <p className="text-black" >New</p>
 </button>
            </div>

            {/* all Courses  */}
            <div>
                <MyCoursesTemplate />
            </div>
        </div>
    )
}

export default MyCourses;