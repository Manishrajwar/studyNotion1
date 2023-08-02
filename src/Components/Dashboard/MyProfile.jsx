import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../Common/IconButton";

function MyProfile(){

    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();

    return(
        <div className="text-white flex flex-col gap-6" >
     <h1 className="font-bold text-3xl ">My Profile</h1>

{/* section 1 */}
     <section className=" h-[150px] rounded-lg flex flex-row items-center w-full bg-richblack-700 justify-between mx-auto "> 
     {/* left */}
     <div className="pl-10 flex flex-row items-center gap-4">
        <img src={user?.image} alt={`Profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover " />
        <div className="">
            <p className="text-2xl font-semibold">{user?.firstName + " " + user?.lastName}</p>
            <p className="text-sm "> {user?.email} </p>
        </div>
     </div>

     {/* right */}
     <div className="pr-10">

     <IconButton text={'Edit'} onclick={()=>{
         navigate("/dashboard/settings")
        }}  />
        </div>
    
     </section>

     {/* section 2 */}
    <section className=" h-[150px] rounded-lg flex flex-row items-center w-full bg-richblack-700 justify-between mx-auto ">
        <div className="flex flex-col gap-10 pl-10">
            <p className="text-3xl font-bold">About</p>
        <p className="text-richblack-200"> {user?.additionalDetails?.about ?? "write Something About Yourself"} </p>
        </div >
        <div className="pr-10">

            <IconButton text='Edit' onclick={()=>navigate("/dashboard/settings")} />
        </div>
    </section>

    {/* section 3 */}
    <section className=" min-h-[200px]  rounded-lg flex flex-col items-center w-full bg-richblack-700 justify-between mx-auto pb-4">
        <div className="flex w-full pt-5 flex-row justify-between pr-10 pl-10 ">
            <p className="font-semibold text-2xl">Personal Details</p>
            <IconButton text='Edit' onclick={()=>navigate("/dashboard/settings")} />
        </div>
        <div className=" grid grid-cols-2 gap-4 translate-x-[-200px] mt-5">
        <div>
            <p className="text-richblack-400">FirstName</p>
            <p>{user?.firstName}</p>
        </div>
        <div>
            <p className="text-richblack-400">Email</p>
            <p>{user?.email}</p>
        </div>
        <div>
            <p className="text-richblack-400">Gender</p>
            <p>{user?.additionalDetails?.gender ?? "add gender"}</p>
        </div>
        <div>
            <p className="text-richblack-400">LastName</p>
            <p>{user?.lastName}</p>
        </div>
        <div>
            <p className="text-richblack-400">Phone Number</p>
            <p>{user?.additionalDetails?.contactNumber ?? "add Contact number"}</p>
        </div>
        <div>
            <p className="text-richblack-400">Date of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth ?? 'Add a date of Birth'}</p>
        </div>
        </div>
    </section>

        </div>
    )
}


export default MyProfile;