import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";


function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = dispatch(getUserEnrolledCourses(token));
      setEnrolledCourses(response);
    } catch (error) {
      console.log("unable to fetch enrolled courses", error);
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="text-white">
      <div>Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="spinner"></div>
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled in any Course</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>

          {/* cards */}
          {enrolledCourses.map((course, index) => {
            return (
              <div key={index}>
                <div>
                  <img src={course.thumbnail} alt="thumbnail" />
                  <div>
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription }</p>
                  </div>
                </div>

                <div>
                   {course?.totalDuration} 
                </div>

                <div>
                    <p>progress :{course.progressPercentage || 0}% </p>
                    <ProgressBar completed={course.progressPercentage || 0 } height="8px" isLabelVisible={false} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
