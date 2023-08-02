import { courseEndpoints } from "../api";
import { makeAuthenticatedDELETERequest, makeAuthenticatedGETRequest } from "../serverHelper";
import { toast } from "react-hot-toast";

const { GET_MY_COURSES_API , DELETE_MY_COURSES_API } = courseEndpoints;


// ! get instructor own course
export function getInstructorMyCourse(setLoading , token) {
  return async (dispatch) => {
    let result = [];
    setLoading(true);

    try {
      const response = await makeAuthenticatedGETRequest(
        GET_MY_COURSES_API,
        token
      );
      if (!response.success) {
        toast.error(response.message);
      } else {
        result = response.data;
          
      }
      setLoading(false);
      return result;
    } catch (error) {
      console.log("error in mycourse", error);
    }
  };
}

// ! delete instructor course 
export function deleteMyCourse(setLoading ,courseId , token){
    return async (dispatch) => {
        setLoading(true);
        try {
          const response = await makeAuthenticatedDELETERequest(
            DELETE_MY_COURSES_API + `/${courseId}`,
            token
          );
          if (!response.success) {
            toast.error(response.message);
          } else {
             toast.success("successfully Deleted");
          }
          setLoading(false);
          
        } catch (error) {
          console.log("error in mycourse", error);
        }
      };
}
