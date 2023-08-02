import * as Icons from "react-icons/vsc"
import { matchPath } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";


function LinkSidebar({ link, iconName }) {
  const Icon = Icons[iconName];

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 font-medium transition-all duration-150  ${
        matchRoute(link.path) ? "bg-yellow-600 " : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      {/* content */}
      <div className="flex items-center gap-x-2 ">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}

export default LinkSidebar;
