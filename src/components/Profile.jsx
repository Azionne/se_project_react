import ClothesSection from "./ClothesSection";
import Sidebar from "./SideBar";

import "../blocks/Profile.css";

function Profile({ onCardClick, weatherData }) {
  console.log("Profile component rendered with weatherData:", weatherData);
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__closet">
        <ClothesSection onCardClick={onCardClick} weatherData={weatherData} />
      </section>
    </div>
  );
}

export default Profile;
