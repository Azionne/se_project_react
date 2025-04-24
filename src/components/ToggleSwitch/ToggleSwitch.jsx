import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

export const ToggleSwitch = () => {
  const { handleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__checkbox"
        onChange={handleSwitchChange}
      />
      <span className="switch__circle"></span>
      <span
        className={`switch__text switch__text_F ${
          currentTemperatureUnit === "F" ? "switch__text_color_white" : ""
        }`}
      >
        F
      </span>
      <span
        className={`switch__text switch__text_C ${
          currentTemperatureUnit === "C" ? "switch__text_color_white" : ""
        }`}
      >
        C
      </span>
    </label>
  );
};

export default ToggleSwitch;
