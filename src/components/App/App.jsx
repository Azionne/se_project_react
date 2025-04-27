import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, deleteItems } from "../../utils/api";
import DeleteItemModal from "../DeleItemModal/DeleteItemModal";

const APIkey = "a55a98aaee04d0285bcba725026a08a1";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [cardToDelete, setCardToDelete] = useState(null);
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
      return [{ name, link: imageUrl, weatherType, _id: newId }, ...prevItems];
    });
    closeActiveModal();
  };

  const handleCardDelete = (card) => {
    setActiveModal("delete");
    setCardToDelete(card);
  };

  const handleConfirmCardDelete = () => {
    deleteItems(cardToDelete._id)
      .then((res) => {
        console.log(res);
        setClothingItems(([item, ...clothingItems]) =>
          [item, ...clothingItems].filter(
            (item) => item._id !== cardToDelete._id
          )
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
          onDelete={handleCardDelete}
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
