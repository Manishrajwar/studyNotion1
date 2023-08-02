import UpdatePassword from "./UpdatePassword";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";

function Settings(){
    return (
        <div className="flex flex-col gap-10 ">
        <h1 className=" text-3xl font-medium text-richblack-5  ">
          Edit Profile
        </h1>
        {/* Change Profile Picture */}
        <ChangeProfilePicture />
        {/* Profile */}
        <EditProfile />
        {/* Password */}
        <UpdatePassword />
        {/* Delete Account */}
        <DeleteAccount />
      </div>
    )
}


export default Settings;