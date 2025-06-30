import React, { useContext } from "react";
import "./header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarImg from "../../assets/avatar.svg";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  setActiveModal,
  weatherData,
  isLogged,
  isLoading,
  activeModal,
}) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext); // <-- use context!
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const showUser =
    location.pathname === "/users/me" || location.pathname === "/profile";
  const hideAuthButtons =
    location.pathname === "/users/me" || location.pathname === "/profile";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city || "Unknown City"}
        </p>
      </div>
      <div className="header__right">
        {location.pathname !== "/profile" && <ToggleSwitch />}
        {isLogged && (
          <button
            className="header__add-clothes-button"
            type="button"
            onClick={handleAddClick}
          >
            + Add Clothes
          </button>
        )}

        <div className="header__actions">
          {isLogged ? (
            <Link to="/profile" className="header__profile-link">
              <span className="header__username">
                {currentUser?.name || "User"}
              </span>
              <img
                src={currentUser?.avatar || avatarImg}
                alt="User avatar"
                className="header__avatar"
              />
            </Link>
          ) : (
            !hideAuthButtons && (
              <div className="header__auth-buttons">
                <div className="header__user-container">
                  <div className="header__buttons-right">
                    <button
                      onClick={handleRegisterClick}
                      type="button"
                      className="header__register-button"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="header__user-container">
                    <button
                      onClick={handleLoginClick}
                      type="button"
                      className="header__login-button"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
