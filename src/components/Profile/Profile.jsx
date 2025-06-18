import React from "react";
import PropTypes from "prop-types";
import ClothesSection from "../ClothesSection/ClothesSection";
import "../Profile/Profile.css";
import Sidebar from "../SideBar/SideBar";

function Profile({
  handleAddClick,
  handleCardClick,
  onSelectCard,
  onAddNewItem,
  clothingItems,
  handleCardLike,
  handleEditProfile,
  handleSignOut,
  handleLogin,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          onEditProfile={handleEditProfile}
          onSignOut={handleSignOut}
          onLogin={handleLogin}
        />
      </section>
      <section className="profile__closet">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
        />
      </section>
    </div>
  );
}

export default Profile;
