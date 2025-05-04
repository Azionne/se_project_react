import React, { useState } from "react";
import "./AddItemModal.css";
import ModelWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    console.log("Image URL:", e.target.value);
  };
  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItemModalSubmit({ name, imageUrl, weatherType })
      .then(() => {
        setName("");
        setWeatherType("");
        setImageUrl("");
        onClose();
      })
      .catch((err) => {
        console.log("onAddItemModalSubmit prop:", onAddItemModalSubmit); // Debug the prop
        console.error("Error adding item:", err);
        console.log("onAddItemModalSubmit prop:", onAddItemModalSubmit); // Debug the prop
      });
  };

  return (
    <ModelWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          required
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          required
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          minLength="1"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type: </legend>
        <label htmlFor="hot" className="modal__label model__label_type_radio">
          <input
            required
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
