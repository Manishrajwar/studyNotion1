import { toast } from "react-hot-toast";
import { profileEndpoints } from "../api";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";

const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;

export function getUserEnrolledCourses(token) {
  return async (dispatch) => {
    let result = [];
    try {
      const response = await makeAuthenticatedGETRequest(
        GET_USER_ENROLLED_COURSES_API,
        token
      );

      if (!response.success) {
        toast.error(response.message);
      } 
      
      else {
        result = response.data;
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
