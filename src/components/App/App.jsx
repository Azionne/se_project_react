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
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  deleteItems,
  postItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import DeleteItemModal from "../DeleItemModal/DeleteItemModal";
import RegisterModalForm from "../RegisterModalForm/RegisterModalForm";

import LoginModalForm from "../LoginModalForm/LoginModalForm";
import EditProfileModal from "../EditProfileModal/EditProfile";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
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
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState({});
  const [registerError, setRegistraterError] = useState({});
  const [registrationError, setRegistrationError] = useState("");
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

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!token || !currentUser) {
      console.log("No token or currentUser for like action");
      return;
    }

    // Find the current card to get its current likes
    const currentCard = clothingItems.find((card) => card._id === _id);
    const currentLikes = currentCard?.likes || [];

    // Use either _id or id field from currentUser (Express backend uses 'id')
    const userId = currentUser._id || currentUser.id;

    console.log("handleCardLike called with:", {
      _id,
      isLiked,
      currentUser: userId,
      currentLikes,
      currentCard,
    });

    // Determine which API call to make
    const apiCall = isLiked ? removeCardLike : addCardLike;
    const action = isLiked ? "removing like" : "adding like";
    console.log(`${action} for item ${_id}`);

    apiCall(_id, userId, token, currentLikes)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((card) => (card._id === _id ? updatedCard : card))
        );
      })
      .catch((err) => {
        console.error("Like/unlike error:", err);
        console.error("Full error details:", err.message || err);
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    setIsSaving(true);
    console.log("Updating profile:", { name, avatar }); // Debug log
    api
      .updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        console.log("Profile updated successfully:", updatedUser); // Debug log
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      })
      .finally(() => setIsSaving(false));
  };

  const handleRegisterClick = ({ name, avatar, email, password }) => {
    setIsSaving(true);
    auth
      .register({ name, avatar, email, password })
      .then((response) => {
        console.log("Registration successful:", response);
        // Immediately log in the user after successful registration
        return handleLogin({ email, password });
      })
      .then(() => {
        closeActiveModal(); // Close the modal after login
      })
      .catch((err) => {
        console.error("Register error", err);

        let errorMessage = "An error has occured. Please try again";

        if (err && err.message) {
          errorMessage = err.message;
        }

        // Show the error in a more user-friendly way
        setRegistrationError(errorMessage);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleLogin = ({ email, name, password }) => {
    setIsSaving(true); // Add this line to set loading state
    return auth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLogged(true); // fixed capitalization
        setLoginError("");
        return auth.checkToken(res.token);
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
        setIsSaving(false); // fixed capitalization
      });
  };

  const closeActiveModal = () => {
    console.log("closeActiveModal called"); // <-- Add this line
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weatherType }) => {
    const token = localStorage.getItem("jwt");
    setIsSaving(true);
    console.log("Submitting item:", { name, imageUrl, weatherType }); // Debug log
    return postItems({ name, weather: weatherType, imageUrl }, token)
      .then((res) => {
        console.log("Item added successfully:", res); // Debug log
        setClothingItems((prevItems) => [res, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
        // Don't close modal on error so user can retry
      })
      .finally(() => {
        setIsSaving(false);
      });
  };
  const handleCardDelete = (card) => {
    setCardToDelete(card);
    setActiveModal("delete");
  };

  const handleConfirmCardDelete = () => {
    const token = localStorage.getItem("jwt");
    deleteItems(cardToDelete._id, token)
      .then((res) => {
        console.log(res);
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
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
    const token = localStorage.getItem("jwt");
    getItems(token)
      .then((data) => {
        setClothingItems(
          data
            .map((item) => ({
              ...item,
              likes: Array.isArray(item.likes)
                ? item.likes.filter(Boolean)
                : [],
            }))
            .reverse() // Reverse the array so newest items (last in JSON) appear first
        );
      })
      .catch((error) => {
        console.error("Error fetching items:", error.message);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("Token from localStorage:", token ? "exists" : "not found");
    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          console.log("Token validation successful, user data:", userData);
          setCurrentUser(userData);
          setIsLogged(true);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          // If token is invalid, remove it and log out
          localStorage.removeItem("jwt");
          setIsLogged(false);
          setCurrentUser(null);
        });
    } else {
      console.log("No token found, setting user to null");
      setIsLogged(false);
      setCurrentUser(null);
    }
  }, []); // Remove isLogged dependency to prevent infinite loop

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    setCurrentUser(null);
    setToken("");
    closeActiveModal();
    navigate("/", { replace: true });
  };

  function switchToLoginModal() {
    setActiveModal("login");
  }

  function switchToSignUpModal() {
    setActiveModal("sign-up");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleSwitchChange }}
      >
        <div className="app">
          <Header
            handleAddClick={handleAddClick}
            handleRegisterClick={() => setActiveModal("sign-up")}
            handleLoginClick={() => setActiveModal("login")}
            setActiveModal={setActiveModal}
            weatherData={weatherData}
            isLogged={isLogged}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLogged}>
                  <Profile
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleCardClick={handleCardClick}
                    handleEditProfile={() => setActiveModal("edit-profile")}
                    handleCardLike={handleCardLike}
                    handleSignOut={handleSignOut}
                    handleLogin={() => setActiveModal("login")}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add"} // <-- use isOpen prop
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit} // fix prop name
            isSaving={isSaving}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleCardDelete}
          />
          <LoginModalForm
            isOpen={activeModal === "login"}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            onClose={() => setActiveModal("")}
            onLogin={handleLogin}
            isSaving={isSaving}
            loginError={loginError}
            switchToSignUp={switchToSignUpModal}
          />
          <RegisterModalForm
            isOpen={activeModal === "sign-up"}
            switchToLogin={switchToLoginModal}
            activeModal={activeModal}
            onClose={closeActiveModal}
            onRegister={handleRegisterClick}
            isSaving={isSaving}
            setActiveModal={setActiveModal}
            registerError={registrationError}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal} // <-- fix here
            onEditProfile={handleEditProfile}
            isSaving={isSaving}
          />
          <DeleteItemModal
            isOpen={activeModal === "delete"}
            onClose={closeActiveModal}
            onConfirm={handleConfirmCardDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;
