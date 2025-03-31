import "../blocks/header.css";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || "Unknown City"}
      </p>
      <div className="header__actions">
        <button
          onClick={handleAddClick}
          type="button"
          className="header__button"
        >
          +Add clothes
        </button>
        <div className="header__avatar-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
