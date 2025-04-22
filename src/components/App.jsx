import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../blocks/App.css";
import { coordinates } from "../utils/constants";
import Header from "./Header";
import Main from "../components/Main";
import Footer from "./Footer";
import Profile from "./Profile";
import ItemModal from "../components/ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import Switch from "./ToggleSwitch";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext";
import AddItemModal from "./AddItemModal";
import { defaultClothingItems } from "../utils/constants";
import { getItems, postItems, deleteItems } from "../utils/api";
import DeleteItemModal from "./DeleteItemModal";

const APIkey = "a55a98aaee04d0285bcba725026a08a1";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    console.log("Add Clothes button clicked");
  };
  const handleActiveModal = () => {
    setActiveModal("add-garment");
  };

  useEffect(() => {
    console.log("Current activeModal:", activeModal);
  }, [activeModal]);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weatherType }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    setClothingItems((prevItems) => {
      [{ name, link: imageUrl, weatherType, _id: newId }, ...prevItems];
    });
    closeActiveModal();
  };

  const handleAddItem = () => {
    setActiveModal("add-garment");
  };

  const handleCardDelete = (cardId) => {
    setActiveModal("delete");
    setSelectedCard(cardId);
  };

  const handleConfirmCardDelete = (cardId) => {
    deleteItems(cardId)
      .then(() => {
        console.log(cardId);
        setClothingItems(([item, ...clothingItems]) =>
          [item, ...clothingItems].filter((item) => item._id !== cardId)
        );
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Fetched clothing items:", data);
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error.message);
      });
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleSwitchChange }}
    >
      <div className="page">
        <div className="page__container">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <Footer year={new Date().getFullYear()} />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
          handleCloseModal={closeActiveModal}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleCardDelete} // Pass handleCardDelete as onDelete
        />
        <DeleteItemModal
          activeModal={activeModal}
          onConfirm={handleConfirmCardDelete}
          onClose={closeActiveModal}
          isOpen={activeModal === "delete"}
          onDelete={handleCardDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
