import {RiDeleteBinLine} from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../services/operations/settingAPI";

function DeleteAccount(){
 const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function deleteHandler(){
      dispatch(deleteAccount(user?.token , navigate));
      
    }
    return (
        <div className="h-[200px] w-full bg-[#340019] flex gap-5 pl-5 pt-5 pr-5  ">
            <div className="w-14 h-14 rounded-full bg-[#691432] flex items-center justify-center ">
           <RiDeleteBinLine className="text-[#EF476F] text-3xl" />

            </div>
           <div className="flex flex-col gap-1 text-richblack-100 max-w-[50%]">
            <p className="text-white">Delete Account</p>
            <p>Would you like to delete account</p>
            <p>this account may contain paid course . deleting your account is permanent and will remove all the contain associated with it </p>
            <p onClick={deleteHandler} className="text-[#EF476F] font-semibold text-lg  cursor-pointer">i want to delete my account</p>
           </div>
        </div>
    )
}

export default DeleteAccount;