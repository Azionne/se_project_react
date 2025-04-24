import React from "react";
import "../Header/header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
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
        <div className="header__actions">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__button"
          >
            +Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__avatar-container">
              <p className="header__username">Terrence Tegegne</p>
              <img
                src={avatar}
                alt="Terrence Tegegne"
                className="header__avatar"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
