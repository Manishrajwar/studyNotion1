import RenderStep from "./RenderStep"

 function AddCourse() {
    return (
        
            <div className="text-white flex flex-row gap-10 w-full">
                <div className="w-[70%]">
                    <h1 className="text-2xl font-bold ">Add Course</h1>
                    <div>
                        <RenderStep />
                    </div>
                </div>
                <div className="flex flex-col gap-6 bg-richblack-700 h-fit  p-10 ">
                    <p className="text-2xl font-bold ">Course Upload Tips</p>
                    <ul className="flex flex-col gap-2">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                    </ul>
                </div>
            </div>
    
    )
}

export default AddCourse;