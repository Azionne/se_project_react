import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { getItems, deleteItems, postItems } from "../../utils/api";
import DeleteItemModal from "../DeleItemModal/DeleteItemModal";
import RegisterModalForm from "../RegisterModalForm/RegisterModalForm";

import LoginModalForm from "../LoginModalForm/LoginModalForm";
import EditProfileModal from "../EditProfileModal/EditProfile";
import CurrentUserContext from "../../context/CurrentUserContext";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

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

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLogged, setIsLoggedin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState({});
  const [registerError, setRegistraterError] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const [isAuthChecked, setIsAuthChekced] = useState(false);

  //const location =useLocation();
  //const navigate = useNavigate();

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

  const handleAddClick = () => setActiveModal("add");

  function handleSubmit(request, onSuccess) {
    setIsSaving(true);
    request()
      .then((res) => {
        if (onSuccess) {
          onSuccess(res);
        }
        closeActiveModal();
      })
      .catch(async (err) => {
        if (typeof err === "string") {
          console.error("Error:", err);
        } else if (err instanceof Response) {
          const errorText = await err.text();
          console.error("Server responded with:", errorText);
        } else {
          console.error("Unexpected error:", err);
        }
      })
      .finally(() => {
        setIsSaving(false);
      });
  }
  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const apiMethod = isLiked ? api.removeCardLike : api.addCardLike;
    apiMethod(_id, token)
      .then((newCard) => {
        setClothingItems((oldCards) =>
          oldCards.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    const makeRequest = () => api.updateUserProfile({ name, avatar }, token);
    const onSuccess = setCurrentUser;
    handleSubmit(makeRequest, onSuccess);
  };

  const handleRegisterClick = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then(() => {
        setActiveModal("register");
      })
      .catch(async (err) => {
        console.error("Register error", err);

        let errorMessage = "An error has occured. Please try again";

        if (err) {
          try {
            const errorData = await err.json();

            if (errorData?.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            console.warn("Error parsing JSON", jsonError);
          }
        } else if (err?.message) {
          errorMessage = err.message;
        }

        if (
          errorMessage.includes("Email already exists") ||
          errorMessage.includes("Email is already registered")
        ) {
          setRegistrationError(errorMessage);
        }
      });
  };

  const handleLogin = ({ email, name, password }) => {
    return auth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setisLoggedin(true);
        setLoginError("");
        return auth.chekToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login error", err);
        setLoginError("Invalid email or password");
      })
      .finally(() => {
        setisSaving(false);
      });
  };

  const closeActiveModal = () => {
    console.log("closeActiveModal called"); // <-- Add this line
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weatherType }) => {
    return postItems({ name, weather: weatherType, imageUrl })
      .then((res) => {
        setClothingItems((prevItems) => [
          { name, imageUrl, weather: weatherType, _id: res._id },
          ...prevItems,
        ]);
      })
      .then(closeActiveModal)
      .catch((err) => {
        console.error("Error adding item:", err);
      });
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
        console.log("Filtered weather data:", filteredData);
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

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setisLoggedin(false);
    setCurrentUser({});
    setToken("");
    closeActiveModal();
    setClothingItems([]);
    navigate("/", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleSwitchChange }}
      >
        <div className="app">
          <Header
            handleAddClick={handleAddClick}
            handleRegisterClick={() => setActiveModal("register")}
            handleLoginClick={() => setActiveModal("login")}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                  <RegisterModalForm
                    activeModal={activeModal}
                    onClose={closeActiveModal}
                    onRegister={handleRegisterClick}
                    isSaving={isSaving}
                    setActiveModal={setActiveModal}
                    registerError={registerError}
                  />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                  <LoginModalForm
                    activeModal={activeModal}
                    onClose={closeActiveModal} // <-- fix here
                    onLogin={handleLogin}
                    isSaving={isSaving}
                    setActiveModal={setActiveModal}
                    loginError={loginError}
                  />
                </>
              }
            />
            <Route
              path="users/me"
              element={
                <>
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                  <AddItemModal
                    isOpen={activeModal === "add"} // <-- use isOpen prop
                    onClose={closeActiveModal}
                    onAddItemModal={handleAddItemModalSubmit}
                    isSaving={isSaving}
                  />
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLogged}>
                  <Profile
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onCardClick={handleCardClick}
                    onEditProfile={() => {
                      setActiveModal("edit-profile");
                    }}
                    onCardLike={handleCardLike}
                    onSignOut={handleSignOut}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add"} // <-- use isOpen prop
            onClose={closeActiveModal}
            onAddItemModal={handleAddItemModalSubmit}
            isSaving={isSaving}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleCardDelete}
          />
          <LoginModalForm
            activeModal={activeModal}
            onClose={closeActiveModal} // <-- fix here
            onLogin={handleLogin}
            isSaving={isSaving}
            setActiveModal={setActiveModal}
            loginError={loginError}
          />
          <RegisterModalForm
            activeModal={activeModal}
            onClose={closeActiveModal} // <-- fix here
            onRegister={handleRegisterClick}
            isSaving={isSaving}
            setActiveModal={setActiveModal}
            registerError={registerError}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal} // <-- fix here
            onEditProfile={handleEditProfile}
            isSaving={isSaving}
          />
          <DeleteItemModal
            activeModal={activeModal}
            onClose={closeActiveModal} // <-- fix here
            onConfirmDelete={handleConfirmCardDelete}
            card={cardToDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;
