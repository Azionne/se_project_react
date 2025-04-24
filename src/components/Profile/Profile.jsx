import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/Sidebar";

import "../Profile/Profile.css";

function Profile({ onCardClick, weatherData, clothingItems }) {
  console.log("Profile component rendered with weatherData:", weatherData);
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__closet">
        <ClothesSection
          onCardClick={onCardClick}
          weatherData={weatherData}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
