import ClothesSection from "./ClothesSection";
import Sidebar from "./Sidebar";

import "../blocks/profile.css";

function Profile({ onCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__closet">
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
}

export default Profile;
