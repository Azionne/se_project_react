import React from "react";
import PropTypes from "prop-types";
import ClothesSection from "../ClothesSection/ClothesSection";
import "../Profile/Profile.css";
import Sidebar from "../SideBar/Sidebar";

function Profile({ onCardClick, weatherData, clothingItems, handleAddClick }) {
  console.log("Profile component rendered with weatherData:", weatherData);
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__closet">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          weatherData={weatherData}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
