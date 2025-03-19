import { useState } from "react";
import "../blocks/App.css"; // Correctly import the CSS file
import Header from "./Header"; // Correctly import the Header component
import Main from "../components/main"; // Correctly import the Main component

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
