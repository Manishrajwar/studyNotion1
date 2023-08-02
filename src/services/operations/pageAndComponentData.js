import { toast } from "react-hot-toast";
import {  makeAuthenticatedGETRequest } from "../serverHelper";
import {catalogData} from "../api"

export const getCatalogPageData =async (categoryId , token)=>{

   const toastId = toast.loading("loading...");
    let result = [];
    try{
    
        const response = await makeAuthenticatedGETRequest(catalogData.CATALOGPAGEDATA_API + `/${categoryId}` , token)

        console.log("response of the " ,response);
     
        if(!response?.success){
             throw new Error("could not fetch category page data");
        }
       
         result = response?.data;

    } catch(error){
 console.log(error);
 toast.error(error.message);
    }

    toast.dismiss(toastId); 
    return result;

}

