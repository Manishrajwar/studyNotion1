import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/Dashboard/SideBar";

function Dashboard(){
    const {loading:authLoading} = useSelector((state)=>state.profile);
    const {loading:profileLoading} = useSelector((state)=>state.auth);

    if(profileLoading || authLoading){
        return (
            <div className="spinner"> 

            </div>
        )
    }

    return (
        <div className="relative flex min-h-[calc(100%-3.5rem)] w-full  ">
           <SideBar />

           <div className="min-h-[calc(100vh-3.5rem)] overflow-y-auto overflow-x-hidden min-w-[calc(100%-422px)] " >
            <div className="mx-auto  w-full max-w-[1000px] py-10 ">
                <Outlet/>
            </div>

           </div>

        </div>
    )
}

export default Dashboard;