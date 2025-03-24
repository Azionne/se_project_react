import { useState } from "react";
import "../blocks/App.css";
import Header from "./Header";
import Main from "../components/main";
import ModelWithForm from "./ModalWithForm";
import ItemModal from "../components/ItemModal";
function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__container">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModelWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image {""}{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type: </legend>
          <label htmlFor="hot" className="modal__label model__label_type_radio">
            <input id="hot" type="radio" className="modal__radio-input " />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label model__label_type_radio"
          >
            <input id="warm" type="radio" className="modal__radio-input " />
            Warm
          </label>

          <label
            htmlFor="cold"
            className="modal__label model__label_type_radio"
          >
            <input id="cold" type="radio" className="modal__radio-input " />
            Cold
          </label>
        </fieldset>
      </ModelWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onCLose={closeActiveModal}
      />
    </div>
  );
}

export default App;
