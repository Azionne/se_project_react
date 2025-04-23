import avatar from "../../assets/avatar.svg";

import "./SideBar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Default User" className="sidebar__img" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default Sidebar;
