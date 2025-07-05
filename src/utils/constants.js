export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/dayclear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/daycloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/dayrain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/daysnow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../assets/day/daystorm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/nightfog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/nightclear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/nightcloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/nightrain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/nightsnow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../assets/night/nightstorm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/nightfog.png", import.meta.url).href,
  },
];

export const clothingItems = [
  {
    id: 0,
    name: "Cap",
    weather: "hot",
    link: new URL("../assets/clothing/cap.png", import.meta.url).href,
  },
  {
    id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    id: 3,
    name: "Sneakers",
    weather: "cold",
    link: new URL("../assets/clothing/sneakers.jpg", import.meta.url).href,
  },
  {
    id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: new URL("../assets/clothing/t-shirt.jpg", import.meta.url).href,
  },
  {
    id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,

    night: {
      url: new URL("../assets/night/default.png", import.meta.url).href,
    },
  },
};
export const coordinates = {
  latitude: 33.748997,
  longitude: -84.387985,
};

export const APIkey = "a55a98aaee04d0285bcba725026a08a1";

export const EXPRESS_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.zeus-demo.jumpingcrab.com"
    : "http://localhost:3001";
