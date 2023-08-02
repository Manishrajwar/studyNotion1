import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import ProfileDropDown from "../authentication/ProfileDropDown";
import { useEffect, useState } from "react";
import {fetchCourseCategories} from "../../services/operations/courseDetailAPI"

function Navbar() {
  // for redux
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const getSubLinks = async()=>{
      const result =await  fetchCourseCategories(token);
      if(result){
                setSubLinks(result);
      }

  }
  useEffect(() => {
    getSubLinks();
  }, []);


  // this is to match in which we current are
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent justify-between items-center">
        {/* image */}
        <Link to={"/"}>
          <img loading="lazy" src={logo} alt="logo" width={160} height={32} />
        </Link>

        {/* navlinks */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                //! catelog
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex items-center gap-2 group cursor-default relative">
                      <p>{link.title}</p>
                      <p className="text-sm">
                        <AiOutlineDown />
                      </p>
                    {/* /for white portion */}
                      <div className="invisible z-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[20%] flex flex-col rounded-md gap-3 bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                          {/* dimond shape */}
                          <div className="absolute left-[50%]  -top-1 h-6 w-6 rotate-45 rounded bg-richblue-5 translate-y-[10%]"> </div>
                          {
                            subLinks.length >0 && (
                             subLinks.map((sublink , index)=>(
                              <Link to={`catalog/${sublink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                      <p>{sublink.name}</p>
                              </Link>
                             ))
                            )
                          }
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      
                      <p onClick={()=> console.log(`clicked ` , link.path)}
                        className={`${
                        
                          matchRoute(link.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login / signup /dashboard */}

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-white text-xl" />
              {totalItems > 0 && (
                <span className="absolute text-white	 top-[-10px] right-[3px]">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md ">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md ">
                sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
