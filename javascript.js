var currentIconEl = document.getElementById("current-icon");
var currentTempEl = document.getElementById("current-temp");
var currentConditionsEl = document.getElementById("current-conditions");
var currentCityEl = document.getElementById("current-city");

var searchTextEl = document.getElementById("search-text");
var searchButtonEl = document.getElementById("search-button");
var forecastEl = document.getElementById("forecast");

var searchHistoryEl = document.getElementById("search-history");


function buildForecast(data){
  while (forecastEl.firstChild) {
    forecastEl.removeChild(forecastEl.lastChild);
  }
  for(i=0; i<5; i++){
    var parentCard = document.createElement("div")
    parentCard.classList.add("card");
    var cardHeader = document.createElement("div")
    cardHeader.classList.add("card-header");
    var weatherDataList = document.createElement("ul")
    weatherDataList.classList.add("list-group");
    var icon = document.createElement("img");
    var iconHolder = document.createElement("li")
    iconHolder.classList.add("list-group-item");
    var currentTemp = document.createElement("li")
    currentTemp.classList.add("list-group-item");
    var currentConditions = document.createElement("li")
    currentConditions.classList.add("list-group-item");
    console.log(currentTemp);
    currentTemp.innerHTML = "temp: " + data.daily[i].temp.day;
    currentConditions.textContent = data.daily[i].weather[0].main;
    icon.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`
    cardHeader.textContent = "Day " + (i + 1);
    iconHolder.appendChild(icon);
    weatherDataList.appendChild(currentTemp);
    weatherDataList.appendChild(currentConditions);
    weatherDataList.appendChild(iconHolder);
    parentCard.appendChild(cardHeader);
    parentCard.appendChild(weatherDataList);
    forecastEl.appendChild(parentCard);
  }
}


function getWeather(city) {
  currentCityEl.textContent = city;
  var geocodeAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=ae034b29b1e2add7687fc20c94112cb6";
  var fetchWeather = fetch(geocodeAPI)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(data[0].lat);
    
    var weatherAPI = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ae034b29b1e2add7687fc20c94112cb6")
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
        buildForecast(data);
        currentIconEl.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
        currentTempEl.textContent = "current temp: " + data.current.temp;
        currentConditionsEl.textContent = data.current.weather[0].main;
    })
  });
} 

console.log(search);
getHistory("");

searchButtonEl.addEventListener("click", function(){

  var search = searchTextEl.value.trim();
  getWeather(search);
  console.log(search);
  getHistory(search);
});

function getHistory(search){
  var pastSearches = JSON.parse(localStorage.getItem("searches")) || [];
  if (search != ""){
  pastSearches.push(search);
  }
  console.log(pastSearches);
  localStorage.setItem("searches", JSON.stringify(pastSearches));
  
  searchHistoryEl.innerHTML = "";
  for(i=0; i<pastSearches.length; i++) {
    var historyButton = document.createElement("button");
    historyButton.classList.add("history-button");
    historyButton.addEventListener("click", function(event){
      console.log(event.target.innerHTML);
      getWeather(event.target.innerHTML);
    });
    historyButton.innerHTML = pastSearches[i];
    searchHistoryEl.appendChild(historyButton);
  }

}