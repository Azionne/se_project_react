import sunny from "../assets/sunny.png"; // Import sunny
import "../blocks/Weathercard.css"; // Import Weathercard CSS

function Weathercard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75&deg; F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default Weathercard; // Correctly export Weathercard
