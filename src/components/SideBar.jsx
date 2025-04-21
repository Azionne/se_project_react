import avatar from "../assets/avatar.svg";

import "../blocks/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Default User" className="sidebar__img" />
      <p className="sidebar__username">Default User's Name</p>
    </div>
  );
}

export default Sidebar;
