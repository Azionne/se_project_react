import React, { useState } from "react"; // Import useState from React
import "../blocks/AddItemModal.css";
import ModelWithForm from "./ModalWithForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState(""); // useState is now properly imported
  const [imageUrl, setImageUrl] = useState(""); // Added state for image URL
  const [weatherType, setWeatherType] = useState(""); // Added state for weather type

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weatherType }); // Pass the new item to the parent component
    setName(""); // Reset name after submission
    setImageUrl(""); // Reset image URL after submission
    setWeatherType(""); // Reset weather type after submission
  };

  return (
    <ModelWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      OnSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          minLength="1"
          maxLength="30"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type: </legend>
        <label htmlFor="hot" className="modal__label model__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            onChange={handleWeatherTypeChange}
            checked={weatherType === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label model__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            onChange={handleWeatherTypeChange}
            checked={weatherType === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label model__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            onChange={handleWeatherTypeChange}
            checked={weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModelWithForm>
  );
}
