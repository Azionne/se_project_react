import React from "react";
import "../Header/header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useLocation } from "react-router-dom";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  setActiveModal,
  weatherData,
  isLogged,
  isLoading,
  activeModal,
  currentUser, // <-- add this
}) {
  const location = useLocation();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const isUsersMe = location.pathname === "/users/me";

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
        <div className="header__actions">
          {isUsersMe && (
            /*isLogged*/ <>
              <button
                onClick={handleAddClick}
                type="button"
                className="header__button"
              >
                +Add clothes
              </button>
              <Link to="/profile" className="header__link">
                <div className="header__avatar-container">
                  <p className="header__username">
                    {currentUser?.name || "Azionne Vorrice"}
                  </p>
                  {activeModal !== "login" && !isLoading && (
                    <img
                      src={currentUser?.avatar || avatar}
                      alt="User avatar"
                      className="header__avatar"
                    />
                  )}
                </div>
              </Link>
            </>
          )}

          {/* Show Sign Up and Log In buttons everywhere except /users/me */}
          {!isUsersMe && (
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
