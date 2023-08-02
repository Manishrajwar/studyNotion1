import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../data/dashboard-links";
import { logout } from "../../services/operations/authAPI";
import LinkSidebar from "./LinkSidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../Common/ConfirmationModal";

function SideBar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="text-white " >
      <div className="flex min-w-[222px]  flex-col border-r-[1px] border-r-richblack-700 min-h-[calc(100vh-3.5rem)] h-full bg-richblack-800 py-10 ">
        {/* upper icons */}
        <div className="flex flex-col justify-center ">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            else {
              return (
                
                  <LinkSidebar key={link.id} link={link} iconName={link.icon} />
              );
            }
          })}
        </div>

        {/* line */}
        <div className="h-[1px] mx-auto mt-6 mb-6 w-10/12 bg-richblack-600  "></div>

          {/* down icons */}

          <div className="flex flex-col justify-center gap-4 ">
            
            <LinkSidebar
              link={{ name: "Settings", path: "dashboard/settings" }}
              iconName="VscSettingsGear"
              />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "you will be logged out of your account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="text-sm font-medium pl-7 text-richblack-300">
                {/* this is for logout */}
              <div className="flex items-center gap-x-2 ">
                <VscSignOut className="text-lg text-white" />
                <span className="font-bold text-white">Logout</span>
              </div>
            </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal  modalData={confirmationModal} />}
    </div>
  );
}

export default SideBar;
