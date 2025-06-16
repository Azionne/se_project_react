import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
        <ToggleSwitch />
        <button
          className="header__add-clothes-button"
          type="button"
          onClick={handleAddClick}
        >
          + Add Clothes
        </button>
        <div className="header__actions">
          {isLogged ? (
            <div className="header__avatar-container">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name ? currentUser.name[0].toUpperCase() : "?"}
                </div>
              )}
              <span className="header__username">
                {currentUser?.name || "User"}
              </span>
            </div>
          ) : (
            <>
              <div className="header__user-container">
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
