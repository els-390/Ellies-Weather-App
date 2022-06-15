let now = new Date();
let h1 = document.querySelector("h1");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

h1.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}, ${year}`;

function searchLocation(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiKey = "747a804390da17b65aae22185c76c12b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let showCurrentLocation = document.querySelector("#currentSearchButton");
showCurrentLocation.addEventListener("click", getCurrentLocation);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let h1 = document.querySelector("#temp");
  h1.innerHTML = `${temperature}˚C`;
  let header = document.querySelector("#city");
  header.innerHTML = `${cityName}`;
}

function getCityLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCityInput");
  let apiKey = "747a804390da17b65aae22185c76c12b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getCityLocation);
