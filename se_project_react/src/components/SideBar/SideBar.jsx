import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const handleEditProfileClick = () => {
    if (onEditProfile) {
      onEditProfile();
    }
  };

  const handleSignOutClick = () => {
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || avatar}
          alt="user's avatar"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__button sidebar__button_edit-profile"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button sidebar__button_logout"
          onClick={handleSignOutClick}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
